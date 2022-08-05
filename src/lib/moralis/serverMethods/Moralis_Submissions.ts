import { Moralis } from 'moralis';
import { v4 as uuid } from 'uuid';

import { Order } from '@/lib/models/queries/Order';
import { SubmissionQueryParams } from '@/lib/models/queries/SubmissionQueryParams';
import { SubmissionState } from '@/lib/models/status';
import { Submission, SubmissionContent } from '@/lib/models/submission';

import { UserInput } from '@/components/pages/submission/new submission/UserInput';

import { CastSubmission } from '../utils/Helpers';
import { SUBMISSION_TABLE } from './tables';

export const Molaris_useSaveSubmission = (
  owner: string,
  answers: UserInput[],
  bountyId: string
): { save: () => Promise<string | undefined> } => {
  const save = async () => {
    const submissionContents: SubmissionContent[] = [];
    //look for the answers that have files
    for await (const answer of answers) {
      if (typeof answer.input !== 'string') {
        const files = answer.input;
        //upload the files
        const filesToSave: Promise<Moralis.File>[] = [];
        for (const file of files) {
          const ext = file.name.split('.').at(-1);
          const fileName = `${uuid()}.${ext}`;
          const refFile = new Moralis.File(fileName, file);
          filesToSave.push(refFile.save());
        }
        const filesSaved = await Promise.all(filesToSave);
        const imagesUrls = filesSaved.map((file) => file._url);
        submissionContents.push({
          requirement: answer.requirement,
          answer: imagesUrls,
        });

        //add the url to the object
      } else {
        submissionContents.push({
          requirement: answer.requirement,
          answer: answer.input,
        });
      }
    }

    //then pass them to the object
    const submissionRef = new Moralis.Object(SUBMISSION_TABLE);

    submissionRef.set('bountyId', bountyId);
    submissionRef.set('owner', owner);
    submissionRef.set('content', submissionContents);
    submissionRef.set('state', SubmissionState['WaitingForReview']);

    const subClass = Moralis.Object.extend(SUBMISSION_TABLE);
    const submission = new subClass(submissionRef.attributes);

    const context = { isNew: true };
    const result = await submission.save(null, { context: context });

    return result.id;
  };

  return {
    save,
  };
};

export const Moralis_useGetSubmission = (submissionId: string) => {
  const find = async () => {
    const q = new Moralis.Query(SUBMISSION_TABLE);
    q.include('review');
    q.equalTo('objectId', submissionId);
    const response = await q.find();

    const ref = response.at(0);
    if (!ref) {
      throw new Error(`Unabled to find submission ${submissionId}`);
    }
    return CastSubmission(ref);
  };

  return { find };
};

export const Moralis_useGetSubmissionsFromBounty = (
  bountyId: string,
  userId?: string
) => {
  const find = async () => {
    const q = new Moralis.Query(SUBMISSION_TABLE);
    q.equalTo('bountyId', bountyId);
    if (userId) {
      q.equalTo('owner', userId);
    }
    q.descending('createdAt');
    const response = await q.find();

    const ref = response;
    if (!ref) {
      throw `Unabled to find submissions for bounty ${bountyId} and user ${userId}`;
    }

    return ref.map((r) => CastSubmission(r));
  };

  return { find };
};

export const Moralis_useGetUserSubmissions = (userId: string) => {
  const find = async () => {
    const q = new Moralis.Query(SUBMISSION_TABLE);
    q.equalTo('owner', userId);
    q.descending('createdAt');
    const response = await q.find();

    const ref = response;
    if (!ref) {
      console.warn(`Unabled to find submissions for user ${userId}`);
      return undefined;
    }

    return ref.map((r) => CastSubmission(r));
  };

  return { find };
};

export const Moralis_canSubmit = async (userId: string, bountyId: string) => {
  const info: {
    canSubmit: boolean;
    spacesLeft: number;
  } = await Moralis.Cloud.run('canSubmit', {
    userId,
    bountyId,
  });
  return info;
};

export const Moralis_submitterInfo = async (
  submitterId: string,
  bountyId: string
) => {
  const info: {
    totalSubmissions: number;
    subsToThisBounty: number;
    spacesLeft: number;
    canSubmitAgain: boolean;
  } = await Moralis.Cloud.run('getSubmitterStats', {
    submitterId,
    bountyId,
  });
  return info;
};

///!----------

export const Moralis_useGetSubmissions = (config: SubmissionQueryParams) => {
  const fetch = async () => {
    const {
      amount,
      order,
      paginate,
      states,
      searchTerm,
      bounties: bountyId,
      owners,
      reviewed,
      page,
    } = config;

    const query = new Moralis.Query(SUBMISSION_TABLE);

    if (searchTerm) {
      query.fullText('title', searchTerm, {
        caseSensitive: false,
        diacriticSensitive: true,
      });
    }

    if (order === Order.Asc) {
      query.ascending('createdAt');
    } else {
      query.descending('createdAt');
    }

    if (bountyId) {
      query.equalTo('bountyId', bountyId);
    }

    if (owners && owners.length > 0) {
      query.containedIn('owner', owners);
    }

    if (typeof reviewed === 'boolean') {
      if (reviewed) {
        query.notEqualTo('review', undefined);
      } else {
        query.equalTo('review', undefined);
      }
    }

    if (states && states.length) {
      let s = states;
      if (typeof states === 'string') {
        s = [states];
      }
      query.containedIn('state', s);
    }

    let skipped = 0;
    if (paginate && page && amount) {
      skipped = page * amount;
      query.skip(skipped);
    }

    if (amount) {
      query.limit(amount);
    }

    const promises = [query.find(), query.count()];
    const results = await Promise.all(promises);

    const data = results[0] as Moralis.Object<Moralis.Attributes>[];

    const count = results[1] as number;

    const hasLess = skipped > 0;
    const hasMore = config.amount
      ? count - config.amount * (page || 0) > config.amount
      : false;

    const submissions: Submission[] | undefined = castMultipleSubmissions(data);

    return {
      submissions,
      hasMore,
      hasLess,
      page: page ?? 0,
      count,
    };
  };

  return {
    fetch,
  };
};

const castMultipleSubmissions = (
  data: Moralis.Object<Moralis.Attributes>[]
) => {
  const submissions: Submission[] = [];
  for (const d of data) {
    const p = CastSubmission(d);
    submissions.push(p);
  }

  return submissions;
};
