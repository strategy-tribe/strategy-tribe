import { SUBMISSION_TABLE } from './tables';
import { Moralis } from 'moralis';
import { v4 as uuid } from 'uuid';
import { CastSubmission } from '../utils/Helpers';
import { SubmissionState } from '@/lib/models/status';
import { Submission, SubmissionContent } from '@/lib/models/submission';
import { SubmissionQueryParams } from '@/lib/models/queries/SubmissionQueryParams';
import { UserInput } from '@/components/pages/submission/new submission/UserInput';

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
      console.error(`Unabled to find submissions for user ${userId}`);
      return undefined;
    }

    return ref.map((r) => CastSubmission(r));
  };

  return { find };
};

export const Moralis_canSubmit = async (userId: string, bountyId: string) => {
  const canSubmit: boolean = await Moralis.Cloud.run('canSubmit', {
    userId,
    bountyId,
  });
  return canSubmit;
};

///!----------

export const Moralis_useGetSubmissions = (config: SubmissionQueryParams) => {
  const fetch = async (page: number) => {
    const {
      amount,
      order,
      paginate,
      states,
      searchTerm,
      bountyId,
      owner,
      reviewed,
    } = config;

    const q = new Moralis.Query(SUBMISSION_TABLE);

    if (searchTerm) {
      q.fullText('title', searchTerm, {
        caseSensitive: false,
        diacriticSensitive: true,
      });
    }

    if (order === 'asc') {
      q.ascending('submissions');
    } else {
      q.descending('submissions');
    }

    if (bountyId) {
      q.equalTo('bountyId', bountyId);
    }

    if (owner) {
      q.equalTo('owner', owner);
    }

    if (typeof reviewed === 'boolean') {
      if (reviewed) {
        q.notEqualTo('review', undefined);
      } else {
        q.equalTo('review', undefined);
      }
    }

    if (states) {
      states.forEach((s) => {
        q.equalTo('state', s);
      });
    }

    if (amount) {
      q.limit(amount);
    }

    if (paginate && page && amount) {
      const toSkip = (page - 1) * amount;
      q.skip(toSkip);
    }

    const data = await q.find();

    const submissions: Submission[] | undefined = castMultipleSubmissions(data);

    const hasMore = config.amount ? submissions.length >= config.amount : false;

    return {
      submissions,
      hasMore,
      page,
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
