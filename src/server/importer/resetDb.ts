import prisma from '@/server/prisma/prismaClient';

import { LOG } from './utils';

export async function ResetDB() {
  await prisma.$connect();
  await prisma.organization.deleteMany();
  await prisma.review.deleteMany();
  await prisma.bounty.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.requirement.deleteMany();
  await prisma.target.deleteMany();
  await prisma.wallet.deleteMany();
  LOG(`Reset DB`);
}
