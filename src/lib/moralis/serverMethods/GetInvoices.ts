import { Moralis } from 'moralis';

import { Invoice, InvoiceStatus } from '@/lib/models/invoice';
import { InvoiceQueryParams } from '@/lib/models/queries/InvoiceQueryParams';

import { CastBounty, CastSubmission } from '../utils/Helpers';
import { INVOICE_TABLE, SUBMISSION_TABLE } from './tables';

export function Moralis_GetInvoices(filters?: InvoiceQueryParams) {
  const getInvoices = async () => {
    const order = filters?.order;
    const statuses = filters?.statuses;
    const users = filters?.users;

    const invoiceQuery = new Moralis.Query(INVOICE_TABLE);
    invoiceQuery.include('bounty');
    invoiceQuery.include('submission');

    if (users) {
      const innerQuery = new Moralis.Query(SUBMISSION_TABLE);
      innerQuery.containedIn('owner', users);
      invoiceQuery.matchesQuery('submission', innerQuery);
    }

    if (statuses) {
      invoiceQuery.containedIn('status', statuses);
    }

    if (order && order === 'asc') {
      invoiceQuery.ascending('createdAt');
    } else {
      invoiceQuery.descending('createdAt');
    }

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
