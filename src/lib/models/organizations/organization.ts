export type Organization = {
  name: string;
  bounties: number;
  wallet: string;
  funds: number;
  bio?: string;
  //
  tags?: string[];
  region?: string;
  //
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
