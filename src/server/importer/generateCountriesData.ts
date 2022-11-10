import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { ERROR } from './utils';

export async function GenerateCountriesData(prisma: PrismaClient) {
  try {
    const allCountries = await prisma.country.findMany({
      include: {
        orgs: {
          select: {
            targets: {
              select: {
                bounties: {
                  select: {
                    wallet: {
                      select: {
                        address: true,
                        balance: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const allData: {
      id: string;
      country: string;
      code: string;
      data: {
        amountOfBounties: number;
        balance: number;
        targets: number;
        organizationCount: number;
      };
    }[] = [];

    for await (const country of allCountries) {
      const { amountOfBounties, balance, targets } = country.orgs.reduce(
        (acc, org) => {
          const targets = org.targets;

          const { amountOfBounties, balance } = targets.reduce(
            (tAcc, target) => {
              const amountOfBounties: number = target.bounties.length;
              const balance: number = target.bounties.reduce(
                (bAcc, bCurr) => (bAcc += bCurr.wallet.balance),
                0
              );
              return {
                balance: tAcc.balance + balance,
                amountOfBounties: tAcc.amountOfBounties + amountOfBounties,
              };
            },
            { amountOfBounties: 0, balance: 0 }
          );

          return {
            targets: acc.targets + targets.length,
            amountOfBounties: acc.amountOfBounties + amountOfBounties,
            balance: acc.balance + balance,
          };
        },
        { targets: 0, amountOfBounties: 0, balance: 0 }
      );

      allData.push({
        id: country.id,
        code: country.code,
        country: country.name,
        data: {
          amountOfBounties,
          balance,
          targets,
          organizationCount: country.orgs.length,
        },
      });
    }

    await prisma.countriesData.create({
      data: {
        countries: {
          createMany: {
            data: allData.map((i) => ({
              countryId: i.id,
              bountyCount: i.data.balance,
              organizationCount: i.data.organizationCount,
              totalFunds: i.data.balance,
            })),
          },
        },
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      ERROR(
        `Error generating map data.\nReason: ${JSON.stringify(e, null, 2)}`,
        false
      );
    }
    throw e;
  }
}
