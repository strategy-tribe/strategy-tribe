import { PrismaClient, RequirementType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Wallet } from 'ethers';
import fs from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';

import { toTitleCase } from '@/lib/utils/StringHelpers';

import { LOG, OrgData, TargetData, WARN } from './utils';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//*Create
export async function addToDb(
  prisma: PrismaClient,
  organizations: OrgData[],
  targets: TargetData[]
): Promise<{
  orgIssues: { data: OrgData; error: unknown }[];
  targetIssues: { data: TargetData; error: unknown }[];
}> {
  const orgIssues: { data: OrgData; error: unknown }[] = [];
  const targetIssues: { data: TargetData; error: unknown }[] = [];

  //#region ORGS
  for await (const o of organizations) {
    try {
      const capitalizedName = toTitleCase(o.name);
      const bountiesData: BountyData[] = GenerateBountiesData(
        capitalizedName,
        o.types
      );

      try {
        await CreateOrganization(prisma, o);
      } catch (error) {
        orgIssues.push({ data: o, error });
        WARN(
          `There has been an error related to creating ${
            o.name
          }. \n ${JSON.stringify(error)}`
        );
        continue;
      }

      for await (const bountyData of bountiesData) {
        await CreateBounty(prisma, {
          targetName: o.name,
          requirements: bountyData.requirements,
          title: bountyData.bountyTitle,
          tags: o.tags,
          closesAt: addDays(new Date(), 7 * 4 * 6),
        });
      }

      const i = organizations.indexOf(o);
      LOG('\n');
      if (i % 3 === 0) LOG(`${i + 1}/${organizations.length} orgs created.`);
    } catch (error) {
      orgIssues.push({ data: o, error });
      WARN(
        `There has been an error related to ${o.name}. \n ${JSON.stringify(
          error
        )}`
      );
    }
  }

  LOG(`All orgs created (${organizations.length})`);
  //#endregion ORGS

  //#region targets
  for await (const t of targets) {
    try {
      const i = targets.indexOf(t);
      const capitalizedName = toTitleCase(t.name);
      const bountiesData = GenerateBountiesData(capitalizedName, t.types);

      await CreateTarget(prisma, t);

      //Have to do it this way to add the tags
      for await (const bountyData of bountiesData) {
        await CreateBounty(prisma, {
          targetName: t.name,
          title: bountyData.bountyTitle,
          requirements: bountyData.requirements,
          tags: t.tags,
          closesAt: addDays(new Date(), 7 * 4 * 6),
        });
      }
      if (i % 3 === 0) LOG(`${i + 1}/${targets.length} targets created.`);
    } catch (error) {
      targetIssues.push({ data: t, error });
      WARN(
        `There has been an error related to ${t.name}. \n ${JSON.stringify(
          error
        )}`
      );
    }
  }
  LOG(`All targets created (${targets.length})`);
  //#endregion targets

  //#region outcome
  if ([...orgIssues, ...targetIssues].length === 0) {
    LOG('Done adding data to the DB, 0 errors');
  } else {
    WARN(
      `There has been ${
        [...orgIssues, ...targetIssues].length
      } issues while populating the db. See the log to learn more`
    );

    const name = resolve('public', 'admin', 'logs', `${v4()}-log.json`);
    fs.writeFileSync(
      name,
      JSON.stringify({ orgIssues, targetIssues }, null, 2)
    );
  }
  return { orgIssues, targetIssues };
  //#endregion
}

interface RequirementData {
  title: string;
  optional: boolean;
  type: RequirementType;
}

interface BountyData {
  bountyTitle: string;
  requirements: RequirementData[];
}

function GenerateBountiesData(
  targetName: string,
  requirementsTypes: RequirementType[]
): BountyData[] {
  const defaultRequirements: RequirementData[] = [
    {
      title: 'How did you find this info',
      optional: false,
      type: 'Report',
    },
    {
      title: 'Attachment',
      optional: true,
      type: 'Image',
    },
  ];

  const bd: BountyData[] = requirementsTypes.reduce((acc, type) => {
    let title = '';
    let bountyTitle = '';
    let extraDataTitle = '';
    switch (type) {
      case 'Email':
        bountyTitle = `Find emails associated with ${targetName}`;
        title = 'Find at least one (1) email';
        extraDataTitle = 'Enter additional emails here';
        break;
      case 'Wallet':
        bountyTitle = `Find wallet addresses associated with ${targetName}`;
        title = 'Find at least one (1) wallet address';
        extraDataTitle = 'Enter additional wallet addresses here';
        break;
      case 'Domain':
        bountyTitle = `Find domains associated with ${targetName}`;
        title = 'Find at least one (1) domain';
        extraDataTitle = 'Enter additional domains here';
        break;
      default:
        throw new Error(`Undefined bounty type for ${targetName}`);
    }
    const requirement: RequirementData = {
      optional: false,
      title,
      type: type,
    };
    const extraDataReq: RequirementData = {
      optional: true,
      title: extraDataTitle,
      type: 'Report',
    };

    const dataForNewBounty: BountyData = {
      bountyTitle,
      requirements: [requirement, extraDataReq, ...defaultRequirements],
    };

    acc.push(dataForNewBounty);

    return acc;
  }, [] as BountyData[]);

  return bd;
}

async function CreateBounty(
  prisma: PrismaClient,
  {
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
  }
) {
  const address = await getNewAddress(prisma);
  LOG(`--- ${title}`);
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

async function CreateOrganization(prisma: PrismaClient, o: OrgData) {
  try {
    const orgName = o.name;

    LOG(`Creating org: "${orgName}"`);

    const address = await getNewAddress(prisma);
    await prisma.organization.create({
      data: {
        name: orgName,
        bio: o.bio,
        why: o.why,
        alsoKnownAs: o.alsoKnownAs,
        links: o.links,
        targets: {
          connectOrCreate: {
            where: {
              name: orgName,
            },
            create: {
              name: orgName,
              alsoKnownAs: o.alsoKnownAs ?? [],
              bio: o.bio,
              type: 'Org',
            },
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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      WARN(
        `Unable to create ${o.name}.\nReason: ${JSON.stringify(e, null, 2)}`
      );
    }
    throw e;
  }
}

async function CreateTarget(prisma: PrismaClient, t: TargetData) {
  const address = await getNewAddress(prisma);
  LOG(`Creating target: ${t.name}`);

  await prisma.target.create({
    data: {
      name: t.name,
      bio: t.bio,
      type: 'Individual',
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

async function getNewAddress(prisma: PrismaClient) {
  const { address, privateKey, publicKey, mnemonic } = Wallet.createRandom();
  await prisma.key.create({
    data: {
      address,
      balance: 0,
      privateKey,
      publicKey,
      mnemonicPhrase: mnemonic.phrase,
      txnHash: '',
    },
  });
  return address;
}
