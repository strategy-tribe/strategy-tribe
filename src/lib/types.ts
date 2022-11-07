import {
  Answer,
  Bounty,
  Country,
  Invoice,
  Organization,
  Requirement,
  Review,
  Submission,
  Tag,
  Target,
  Wallet,
} from '@prisma/client';

/** A bounty with most of its data added to it
 *
 * If you were to use the base type `Bounty` from `@prisma/client`, you would not get the fields that are in other tables of the database - ie `Target` or `Wallet`
 *
 *  TODO: Remove the private key from the Wallet type
 */
export type FullBounty = Bounty & {
  wallet?: Wallet | null;
  tags?: Tag[];
  requirements?: Requirement[];
  target?: FullTarget;
  _count?: {
    submissions: number;
  };
};

export type FullOrganization = Organization & {
  countries?: Country[];
  targets?: FullTarget[];
  wallet?: Wallet;
  _count?: {
    targets: number;
  };
  tags?: Tag[];
};

export type FullTarget = Target & {
  org: FullOrganization;
  bounties: FullBounty[];
};

export type FullInvoice = Invoice & {
  submission: Submission;
  bounty: FullBounty;
};

export type FullAnswer = Answer & {
  requirement: Requirement;
};

export type FullSubmission = Submission & {
  review?: Review;
  answers?: FullAnswer[];
  bounty?: FullBounty;
};
