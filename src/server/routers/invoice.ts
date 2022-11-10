import { router } from '../procedures';
import { getInvoice } from '../routes/invoice/getInvoice';
import { getInvoices } from '../routes/invoice/getInvoices';

export const invoiceRouter = router({
  getInvoice: getInvoice,
  getInvoices: getInvoices,
});
