import { Requirement } from './requirement';
import { BountyState } from './status';
import { TargetType } from './targetType';

export type Bounty = {
  //relations
  name: string;
  alsoKnownAs?: string[];
  description?: string;
  type: TargetType;
  organizationName: string;
  tags?: string[];
  countries?: string[];

  //has a default
  state: BountyState;

  //must have to be created
  title: string;
  requirements: Requirement[];

  //to be set later
  submissions: number;
  funds: number;
  wallet: string;

  //staff
  staffCreatorId?: string;

  //time limit
  closesAt?: Date;

  //set by the server
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
