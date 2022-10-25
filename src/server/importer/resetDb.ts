import prisma from '@/lib/prisma/prismaClient';

import { LOG } from './utils';

export async function ResetDB() {
  await prisma.$connect();
  await prisma.organization.deleteMany();
  await prisma.bounty.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.target.deleteMany();
  await prisma.wallet.deleteMany();
  LOG(`Reset DB`);
}
