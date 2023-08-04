import { PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { SOLUTION_SELECTION } from './getSolutions';

const GetSolutionSchema = z.object({
  id: z.string(),
});

/** To be called from the server. Fetches a solution by its slug */
export async function ServerGetSolution(
  prisma: PrismaClient,
  params: GetSolutionParams,
  isStaff = false
) {
  const { id } = params;
  const solution = await prisma.solution.findUnique({
    where: { id },
    select: {
      ...SOLUTION_SELECTION,
      createdAt: false,
      mermaid: true,
      content: true,
      target: {
        select: {
          name: true,
          bounties: {
            select: {
              slug: true,
              title: true,
              wallet: {
                select: {
                  balance: true,
                },
              },
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
          org: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!isStaff && !solution?.publish) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Solution not found',
    });
  }
  return solution;
}

export type GetSolutionParams = z.infer<typeof GetSolutionSchema>;

export type FullSolution = NonNullable<
  ThenArg<ReturnType<typeof ServerGetSolution>>
>;

export const getSolution = publicProcedure
  .input(GetSolutionSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    let solution = await ServerGetSolution(
      prisma,
      input,
      !!(session && session?.user && session?.user.rol !== 'REGULAR')
    );
    if ((!session || !session?.user) && solution) {
      solution = {
        ...solution,
        content: `## Introduction

Loading...       
        
## Solution
        
![Mermaid Flowchart](https://mermaid.ink/svg/pako:eNqdV3-P2jgQ_SqWT4hWYglx-Jk_TuqW3dNJvaoS1VUqOSGTGGJhbGSbstyK736TECAJIcverhTb4zdvxi8ex7ziUEUM-7jRQI3GayChRYhLbn10GiHUtDFbs6aPmnNqWLNVmvibak7ngplm3glmN5qvqd5_VkLpxPu3x0fSI8McwQX0nb3YC3CxWFSiHpWOmL7gBp878FeECi7ZBfE8fCRkVEQYFioZFTLrdPpumcgybXkBlaR1Rhyy3rE9NBqBXAi1C2Oq7QMTq0AmqImF4YcPafPxI3p4-B2NZ4utEF_pms3WHOBMTJ0ASxj76IuiEZfLdrsdYOefI8U1PqX5NjOM6jCeLZVaCuZO_0jbHEXmXwZmSYBOq9mOr_iGRZxOna0WPvoESw4Fu4QuorLA7IWuQeWc99PRco54hciCUsGpcadOebXOfZ7kf3t6tz1P3FWqkntVJXlV52pnOWRgBJVRrbIFZEndIsstha8ZxjMmE43hWS9UlWsqRbdOrIS8lCmYpgHOMkRPXycBvgoGmFN2Np7tqBDMJkna2Ec_0tGnKNLMGDcX6oIsR4STR5uQSjcf-GQMAvnMBdSvj_6UoYLJJfr-Ik1VWmeiS3ZHw2yRUmSv78x9JC7kWMDfSpRAoqekvlC9ZGKPlISHYdKitZJsj6xCFERwUW4BE77mgupEVZS8lLo1kCuFSZXCxHkPhVdF4SUUyf_9B5QHAlwVU241RXC-nELFZcTMKnsVVZuygCu9grP7rRIq-I1nkVpTDhvLOXbqa6jkG7LEEZ7VaSbTVdp036NNN6-N2c41iyJu3xLnDCypcyGoOOKuQAWJyEWi8dHg3OnplT29tz3P42_K1K22gLu12JTjdG5sEiBcCSxUormdx5kPTsnsqJo6Wa9-k1RRbGIoeSBI2_e7h-pZbWHn6bs-plUMDHQXbu1JnyKK-zViMTUxi6aTdAx3RTTOTOXdeoIWNSNvaFbtnKpEatW6ETX5nvXqNLoRkBqzg9umgZinbtEft_CaaZAogvvza8IW4PQ-HGAfunC_XAU4kAfAbTcRtewJ9Fca-wsqDGthurVqspch9q3eshNozOlS0_UZtaHyp1KFMfZf8Qv2H3pep90jo26_2-12Bp47auE9mEln0HbdEXFHHul2vZF3aOF_Uwq33e8DziPu0HX7g37Ha2GWJvXX8VdA-mOghQWskukkjN1vEvuSGwt2KJEFXyZ2KD4wx9ZujO84yXR7yW28nbfha-sYHiWX4PjXqO_0SX9IiccgMO15XhTO3dFwQbruIhp0XELx4XD4DwyrH6E)
        `,
      };
    }
    return { solution };
  });
