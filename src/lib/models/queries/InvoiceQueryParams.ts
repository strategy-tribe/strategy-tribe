import { InvoiceStatus } from '../invoice';
import { Order } from './Order';

export interface InvoiceQueryParams {
  order?: Order;
  statuses?: InvoiceStatus[];
  users?: string[];
}
