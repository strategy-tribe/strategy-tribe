export type Organization = {
  name: string;
  bounties: number;
  wallet: string;
  funds: number;
  //
  tags?: string[];
  countries?: string[];
  //
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  //
  bio?: string;
  why?: string;
  links?: string[];
  alsoKnownAs?: string[];
};
