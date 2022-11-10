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

  await prisma.target.deleteMany();
  WARN('deleted targets');

  await prisma.organization.deleteMany();
  WARN('deleted orgs');

  await prisma.bounty.deleteMany();
  WARN('deleted bounties');

  await prisma.wallet.deleteMany();
  WARN('deleted wallets');

  await prisma.key.deleteMany();
  WARN('deleted keys');

  await prisma.country.deleteMany();
  WARN('deleted countries');

  await prisma.user.deleteMany();
  WARN('deleted users');

  WARN(`DB is now empty. Left: Users`);
}
