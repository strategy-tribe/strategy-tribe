import { router } from '../procedures';
import { getInvoice } from '../routes/invoice/getInvoice';
import { getInvoices } from '../routes/invoice/getInvoices';
import { payInvoice } from '../routes/invoice/payInvoice';

export const invoiceRouter = router({
  getInvoice: getInvoice,
  getInvoices: getInvoices,
  payInvoice: payInvoice,
});
