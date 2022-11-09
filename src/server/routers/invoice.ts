import { router } from '../procedures';
import { getInvoice } from '../routes/invoice/getInvoice';

export const invoiceRouter = router({
  getInvoice: getInvoice,
});
