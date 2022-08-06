import { Moralis } from 'moralis';

import { Review } from '@/lib/models/Review';
import { SubmissionState } from '@/lib/models/status';
import { Submission } from '@/lib/models/submission';

import { CastReview } from '../utils/Helpers';
import { REVIEWS_TABLE } from './tables';

export const Moralis_useSaveReview = (
  grade: SubmissionState.Accepted | SubmissionState.Rejected,
  submission: Submission,
  reviewerId: string,
  reviewerComment?: string
): { save: () => Promise<string | undefined> } => {
  const save = async () => {
    const reviewRef = new Moralis.Object(REVIEWS_TABLE);
    //data

    reviewRef.set('grade', grade);
    reviewRef.set('submissionId', submission.id);
    reviewRef.set('reviewerId', reviewerId);
    reviewRef.set('reviewerComment', reviewerComment);

    const reviewClass = Moralis.Object.extend(REVIEWS_TABLE);
    const review = new reviewClass(reviewRef.attributes);

    const context = { userId: submission.owner };
    const response = await review.save(null, { context: context });

    return response.id;
  };

  return {
    save,
  };
};

export type ReviewsQueryParams = {
  reviewerId?: string;
  submissionId?: string;
  grade?: SubmissionState.Accepted | SubmissionState.Rejected;
  order?: 'asc' | 'desc';
  paginate?: boolean;
  page?: number;
  pageSize?: number;
};

export const Moralis_getReviews = (config: ReviewsQueryParams) => {
  const fetch = async () => {
    const { grade, reviewerId, submissionId, order, page, pageSize, paginate } =
      config;

    const query = new Moralis.Query(REVIEWS_TABLE);

    if (grade) {
      query.equalTo('greade', grade);
    }

    if (order === 'asc') {
      query.ascending('createdAt');
    } else {
      query.descending('createdAt');
    }

    if (reviewerId) {
      query.equalTo('reviewerId', reviewerId);
    }

    if (submissionId) {
      query.equalTo('submissionId', submissionId);
    }

    let skipped = 0;
    if (paginate && page && pageSize) {
      skipped = page * pageSize;
      query.skip(skipped);
    }

    if (pageSize) {
      query.limit(pageSize);
    }

    const promises = [query.find(), query.count()];

    const results = await Promise.all(promises);

    const data = results[0] as Moralis.Object<Moralis.Attributes>[];

    const count = results[1] as number;

    const reviews: Review[] | undefined = castMultipleReviews(data);

    const hasLess = skipped > 0;
    const hasMore = config.pageSize
      ? count - config.pageSize * (page || 0) > config.pageSize
      : false;

    return {
      reviews,
      hasMore,
      hasLess,
      page: page || 0,
      count,
    };
  };

  return {
    fetch,
  };
};

const castMultipleReviews = (data: Moralis.Object<Moralis.Attributes>[]) => {
  const bounties: Review[] = [];
  for (const d of data) {
    const p = CastReview(d);
    bounties.push(p);
  }

  return bounties;
};
