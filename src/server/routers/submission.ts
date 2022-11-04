import { Order } from '@/lib/models/Order';
import { SubmissionFilters } from '@/lib/models/SubmissionQueryParams';
import prisma from '@/lib/prisma/prismaClient';
import { Submission } from '@prisma/client';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const submissionRouter = router({
  post: publicProcedure
  .input(
    z.object({
      slug: z.string(),
      address: z.string(),
      answers: z.any().array(),
    })
  )
  .mutation(async ({ input }) => {
    const { slug, address, answers } = input;
    const { id } = await prisma.submission.create({
      data: {
        state: 'WaitingForReview',
        answers: {
          createMany: {
            data: answers.map((a) => ({
              answer: a.input,
              requirementId: a.requirement.id
            })),
          },
        },
        author: {
          connect: {
            address: address,
          },
        },
        bounty: {
          connect: {
            slug,
          },
        },
      },
    });

    return {
      submissionId: id
    };
  }),
  getSubmissions: publicProcedure
    .input(
      z.object({
        order: z.enum([Order.Asc, Order.Desc]),
        paginate: z.boolean().optional(),
        amount: z.number().optional(),
        state: z
          .enum([
            SubmissionFilters.All,
            SubmissionFilters.Accepted,
            SubmissionFilters.WaitingForReview,
            SubmissionFilters.WaitingForPayment,
            SubmissionFilters.Rejected,
          ])
          .optional(),
        reviewed: z.boolean().optional(),
        owners: z.string().array().optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        let where = {};
        if (input.state !== SubmissionFilters.All) {
          where = {
            ...where,
            state: input.state
          }
        }
        if (input.owners && input.owners[0]) {
          where = {
            ...where,
            authorId: {
              in: input.owners
            }
          }
        }
        const submissions: Submission[] = await prisma.submission.findMany({
          where,
          skip: (input?.amount ?? 0) * (input?.page ?? 0),
          take: input.amount ?? 10,
          orderBy: {
            createdAt: input.order
          },
          include: {
            bounty: {
              include: {
                tags: true
              }
            },
            answers: true
          }
        });

        return { submissions: submissions ?? [] };
      } catch (error) {
        console.error(error);
        return { submissions: [] };
      }
    }),
    getTotalCount: publicProcedure
    .input(
      z.object({
        order: z.enum([Order.Asc, Order.Desc]),
        paginate: z.boolean().optional(),
        amount: z.number().optional(),
        state: z
          .enum([
            SubmissionFilters.All,
            SubmissionFilters.Accepted,
            SubmissionFilters.WaitingForReview,
            SubmissionFilters.WaitingForPayment,
            SubmissionFilters.Rejected,
          ])
          .optional(),
        reviewed: z.boolean().optional(),
        owners: z.string().array().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        let where = {};
        if (input.state !== SubmissionFilters.All) {
          where = {
            ...where,
            state: input.state
          }
        }
        if (input.owners && input.owners[0]) {
          where = {
            ...where,
            authorId: {
              in: input.owners
            }
          }
        }
        const submissionsCount: number = await prisma.submission.count({
          where
        });

        return { submissionsCount};
      } catch (error) {
        console.error(error);
        return { submissionsCount: 0 };
      }
    }),
  getSubmission: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id } }) => {
      const submission: Submission | null = await prisma.submission.findUnique({
        where: { id },
        include: {
          bounty: {
            include: {
              tags: true
            }
          },
          answers: {
            include: {
              requirement: true
            }
          },
          review: true
        }
      });
      return { submission };
    }),
  getSubmitterInfo: publicProcedure
    .input(
      z.object({
        submitterId: z.string(),
        bountyId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const totalSubmissions: number = await prisma.submission.count({
          where: {
            authorId: input.submitterId
          }
        });
        const bountySubmissions: number = await prisma.submission.count({
          where: {
            authorId: input.submitterId,
            bountyId: input.bountyId
          }
        });
  
        return {
          totalSubmissions,
          bountySubmissions
        };
      } catch (error) {
        console.error(error);
      }
    }),
  // updateSubmission: publicProcedure
  //   .input(
  //     z.object({
  //       submissionId: z.string(),
  //       updates: z.any()
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     try {
  //       const update = await prisma.submission.update({
  //         where: {
  //           id: input.submissionId
  //         },
  //         data: input.updates
  //       });
  
  //       return update;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })
});
