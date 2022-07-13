import { Invoice, InvoiceStatus } from '@/lib/models/invoice';
import { Moralis } from 'moralis';
import { CastBounty, CastSubmission } from '../utils/Helpers';

import { INVOICE_TABLE, SUBMISSION_TABLE } from './tables';

export function Moralis_GetInvoices(userId: string) {
  const getInvoices = async () => {
    const invoiceQuery = new Moralis.Query(INVOICE_TABLE);
    invoiceQuery.include('bounty');
    invoiceQuery.include('submission');

    const innerQuery = new Moralis.Query(SUBMISSION_TABLE);
    innerQuery.equalTo('owner', userId);

    invoiceQuery.matchesQuery('submission', innerQuery);

    const rawResult = await invoiceQuery.find();

    const invoices: Invoice[] = [];

    rawResult.forEach((obj) => {
      const invoice = CastInvoice(obj);
      invoices.push(invoice);
    });

    return invoices;
  };

  return { getInvoices };
}

function CastInvoice(rawInvoice: Moralis.Object<Moralis.Attributes>) {
  const {
    bounty: rawBounty,
    submission: rawSubmission,
    status,
  } = rawInvoice.attributes;

  const invoice: Invoice = {
    id: rawInvoice.id,
    status: status as InvoiceStatus,
    bounty: CastBounty(rawBounty),
    submission: CastSubmission(rawSubmission),
  };

  return invoice;
}
