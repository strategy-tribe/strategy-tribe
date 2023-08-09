import { InvoiceStatus } from '@prisma/client';

import { Order } from './Order';

export interface InvoiceQueryParams {
  order?: Order;
  statuses?: InvoiceStatus[];
  users?: string[];
}
