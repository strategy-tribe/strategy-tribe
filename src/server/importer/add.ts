import { RequirementType } from '@prisma/client';
import { Wallet } from 'ethers';

import prisma from '@/lib/prisma/prismaClient';
import { toTitleCase } from '@/lib/utils/StringHelpers';

import { LOG, OrgData, TargetData } from './utils';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//*Create
export async function addToDb(organizations: OrgData[], targets: TargetData[]) {
  for await (const o of organizations) {
    const capitalizedName = toTitleCase(o.name);
    const bountyData = GenerateDefaultBountiesData(capitalizedName);

    await CreateOrganization(o);

    //Have to do it this way to add the tags
    for await (const data of bountyData) {
      const { title, requirementsData: req } = data;
      await CreateBounty({
        targetName: o.name,
        title,
        tags: o.tags,
        requirements: req,
        closesAt: addDays(new Date(), 7 * 4 * 6),
      });
    }

    const i = organizations.indexOf(o);
    if (i % 10 === 0) LOG(`${i + 1}/${organizations.length} orgs created.`);
  }

  LOG(`All orgs created (${organizations.length})`);

  for await (const t of targets) {
    const i = targets.indexOf(t);
    const capitalizedName = toTitleCase(t.name);
    const bountyData = GenerateDefaultBountiesData(capitalizedName);

    await CreateTarget(t);

    //Have to do it this way to add the tags
    for await (const data of bountyData) {
      const { title, requirementsData } = data;
      await CreateBounty({
        targetName: t.name,
        title,
        tags: t.tags,
        requirements: requirementsData,
        closesAt: addDays(new Date(), 7 * 4 * 6),
      });
    }
    if (i % 10 === 0) LOG(`${i + 1}/${targets.length} targets created.`);
  }

  LOG(`All targets created (${targets.length})`);
}

interface RequirementData {
  title: string;
  optional: boolean;
  type: RequirementType;
}

/** Creates default bounties based on a target name */
function GenerateDefaultBountiesData(targetName: string) {
  const data: { title: string; requirementsData: RequirementData[] }[] = [
    {
      title: `Find emails associated with ${targetName}`,
      requirementsData: [
        {
          title: 'Find at least one email',
          optional: false,
          type: 'EMAIL',
        },
        {
          title: 'How did you find this info',
          optional: true,
          type: 'REPORT',
        },
      ],
    },
    {
      title: `Find wallet addresses associated with ${targetName}`,
      requirementsData: [
        {
          title: 'Find at least one wallet',
          optional: false,
          type: 'WALLET',
        },
        {
          title: 'How did you find this info',
          optional: true,
          type: 'REPORT',
        },
      ],
    },
    {
      title: `Find domains associated with ${targetName}`,
      requirementsData: [
        {
          title: 'Find at least one domain',
          optional: false,
          type: 'DOMAIN',
        },
        {
          title: 'How did you find this info',
          optional: true,
          type: 'REPORT',
        },
      ],
    },
  ];
  return data;
}

async function CreateBounty({
  title,
  tags,
  targetName,
  requirements,
  closesAt,
}: {
  title: string;
  requirements: RequirementData[];
  targetName: string;
  closesAt: Date;
  tags?: string[];
}) {
  const address = await getNewAddress();
  await prisma.bounty.create({
    data: {
      title,
      description: '',
      closesAt,
      status: 'WaitingForFunds',
      requirements: {
        createMany: {
          data: requirements.map((r) => ({
            optional: r.optional,
            title: r.title,
            type: r.type,
          })),
        },
      },
      target: {
        connect: {
          name: targetName,
        },
      },
      tags: {
        connectOrCreate: tags?.map((tag) => ({
          create: {
            name: tag,
          },
          where: {
            name: tag,
          },
        })),
      },
      wallet: {
        create: {
          address: address,
          balance: 0,
        },
      },
    },
  });
}

async function CreateOrganization(o: OrgData) {
  const address = await getNewAddress();
  await prisma.organization.create({
    data: {
      name: o.name,
      bio: o.bio,
      why: o.why,
      alsoKnownAs: o.alsoKnownAs,
      links: o.links,
      targets: {
        create: {
          name: o.name,
          alsoKnownAs: o.alsoKnownAs,
          type: 'ORG',
        },
      },
      tags: {
        connectOrCreate: o.tags?.map((t) => ({
          create: { name: t },
          where: { name: t },
        })),
      },
      countries: {
        connectOrCreate: o.countries.map((c) => ({
          create: { code: c, name: 'Unknown' },
          where: { code: c },
        })),
      },
      wallet: {
        create: {
          address: address,
          balance: 0,
        },
      },
    },
  });
}

async function CreateTarget(t: TargetData) {
  const address = await getNewAddress();
  await prisma.target.create({
    data: {
      name: t.name,
      type: 'INDIVIDUAL',
      alsoKnownAs: t.alsoKnownAs,
      org: {
        connectOrCreate: {
          create: {
            name: t.organizationName,
            tags: {
              connectOrCreate: t.tags?.map((t) => ({
                create: { name: t },
                where: { name: t },
              })),
            },
            wallet: {
              create: {
                address: address,
                balance: 0,
              },
            },
          },
          where: {
            name: t.organizationName,
          },
        },
      },
    },
  });
}

async function getNewAddress() {
  const { address, privateKey, publicKey, mnemonic } = Wallet.createRandom();
  await prisma.key.create({
    data: {
      address,
      balance: 0,
      privateKey,
      publicKey,
      mnemonicPhrase: mnemonic.phrase,
    },
  });
  return address;
}
