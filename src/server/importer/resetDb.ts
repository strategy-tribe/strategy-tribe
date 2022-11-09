import prisma from '@/server/prisma/prismaClient';

import { WARN } from './utils';

export async function ResetDB() {
  await prisma.answer.deleteMany();
  WARN('deleted answer');

  await prisma.requirement.deleteMany();
  WARN('deleted requirements');

  await prisma.invoice.deleteMany();
  WARN('deleted invoices');

  await prisma.review.deleteMany();
  WARN('deleted reviews');

  await prisma.tag.deleteMany();
  WARN('deleted tags');

  await prisma.submission.deleteMany();
  WARN('deleted subs');

  await prisma.organization.deleteMany();
  WARN('deleted orgs');

  await prisma.bounty.deleteMany();
  WARN('deleted bounties');

  await prisma.target.deleteMany();
  WARN('deleted targets');

  await prisma.wallet.deleteMany();
  WARN('deleted wallets');

  await prisma.key.deleteMany();
  WARN('deleted keys');

  WARN(`DB is now empty. Left: Users`);
}
