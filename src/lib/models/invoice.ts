import { Bounty } from './bounty';
import { Submission } from './submission';

export type Invoice = {
  id: string;
  submission: Submission;
  bounty: Bounty;
  status: InvoiceStatus;
};

export enum InvoiceStatus {
  Paid = 'Paid',
  Unpaid = 'Unpaid',
  Error = 'Error',
}
