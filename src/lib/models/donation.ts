import { Organization } from '@/lib/models/organizations/organization';
import { Bounty } from '.';

export type Donation = {
  from: {
    userId: string;
    wallet: string;
  };
  to: Recipient;
  amountInEth: number;
};

export interface Recipient {
  wallet: string;
}
