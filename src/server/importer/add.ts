import { PrismaClient, RequirementType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Wallet } from 'ethers';

import { toTitleCase } from '@/lib/utils/StringHelpers';

import { LOG, OrgData, TargetData, WARN } from './utils';
import { Notify_NewBountyAddedToOrg } from '../routes/notification/utils/bounty';

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
          incrementConfig: o.incrementConfig,
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
        const slug = await CreateBounty(prisma, {
          targetName: t.name,
          title: bountyData.bountyTitle,
          requirements: bountyData.requirements,
          tags: t.tags,
          closesAt: addDays(new Date(), 7 * 4 * 6),
          incrementConfig: t.incrementConfig,
        });
        Notify_NewBountyAddedToOrg(
          prisma,
          t.organizationName,
          bountyData.bountyTitle,
          slug
        );
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

    LOG(JSON.stringify({ orgIssues, targetIssues }, null, 2));

    // TODO: log error
    // const name = resolve('public', 'admin', 'logs', `${v4()}-log.json`);
    // fs.writeFileSync(
    //   name,
    //   JSON.stringify({ orgIssues, targetIssues }, null, 2)
    // );
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
      case RequirementType.Email:
        bountyTitle = `Find emails associated with ${targetName}`;
        title = 'Find at least one (1) email';
        extraDataTitle = 'Enter additional emails here';
        break;
      case RequirementType.Wallet:
        bountyTitle = `Find wallet addresses associated with ${targetName}`;
        title = 'Find at least one (1) wallet address';
        extraDataTitle = 'Enter additional wallet addresses here';
        break;
      case RequirementType.Domain:
        bountyTitle = `Find domains associated with ${targetName}`;
        title = 'Find at least one (1) domain';
        extraDataTitle = 'Enter additional domains here';
        break;
      case RequirementType.Name:
        bountyTitle = `Find names associated with ${targetName}`;
        title = 'Find at least one (1) name';
        extraDataTitle = 'Enter additional names here';
        break;
      case RequirementType.PhoneNumber:
        bountyTitle = `Find phone numbers associated with ${targetName}`;
        title = 'Find at least one (1) phone number';
        extraDataTitle = 'Enter additional phone numbers here';
        break;
      case RequirementType.Location:
        bountyTitle = `Find locations associated with ${targetName}`;
        title = 'Find at least one (1) location';
        extraDataTitle = 'Enter additional locations here';
        break;
      default:
        throw new Error(`Undefined bounty type for ${targetName}: ${type}`);
    }
    const requirement: RequirementData = {
      optional: false,
      title,
      type: type,
    };
    const extraDataReq: RequirementData = {
      optional: true,
      title: extraDataTitle,
      type: RequirementType.Report,
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
    incrementConfig,
  }: {
    title: string;
    requirements: RequirementData[];
    targetName: string;
    closesAt: Date;
    tags?: string[];
    incrementConfig: string | undefined;
  }
) {
  const walletControl = getWalletControl(incrementConfig, requirements);
  const address = await getNewAddress(prisma);
  LOG(`--- ${title}`);
  const { slug } = await prisma.bounty.create({
    data: {
      title,
      description: '',
      closesAt,
      status: 'Open',
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
          balance: walletControl?.initial ?? 0,
          walletControl: {
            create: walletControl,
          },
        },
      },
    },
  });
  return slug;
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
            create: { code: c, name: `Unknown_${c}` },
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

function getWalletControl(
  incrementConfig: string | undefined,
  requirements: RequirementData[]
) {
  const config = incrementConfig
    ?.split('\n')
    ?.find((c) =>
      c
        .toLowerCase()
        .includes(
          requirements
            .find(
              (r) =>
                r.type !== RequirementType.Report &&
                r.type !== RequirementType.Image
            )
            ?.type?.toLowerCase() ?? 'unkown'
        )
    );
  if (!config) {
    return undefined;
  }
  const configs = config.split(',');
  return {
    fund: configs[4] ? parseFloat(configs[4]) : 0,
    initial: configs[1] ? parseFloat(configs[1]) : 0,
    incrementBy: configs[2] ? parseFloat(configs[2]) : 0,
    numberOfIncrements: 0,
    incrementInDays: configs[3] ? parseFloat(configs[3]) : 0,
    nextIncrementOn: addDays(new Date(), 7),
    proposedFund: configs[4] ? parseFloat(configs[4]) : 0,
  };
}
