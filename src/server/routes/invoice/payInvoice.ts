import { InvoiceStatus, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ethers } from 'ethers';
import { z } from 'zod';

import { ERROR, LOG } from '@/server/importer/utils';
import { adminOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

const payInvoiceSchema = z.object({
  submissionId: z.string(),
  bountySlug: z.string(),
});

export type PayInvoiceSchemaParams = z.infer<typeof payInvoiceSchema>;

async function _payInvoice(
  prisma: PrismaClient,
  input: PayInvoiceSchemaParams
) {
  try {
    const { submissionId, bountySlug } = input;
    const invoice = await prisma.invoice.findUnique({
      where: {
        submissionId,
      },
      include: {
        submission: {
          include: {
            author: true,
          },
        },
        bounty: {
          include: {
            wallet: true,
          },
        },
      },
    });
    if (
      invoice &&
      invoice.status === InvoiceStatus.Unpaid &&
      bountySlug === invoice.bounty?.slug
    ) {
      const userAddress = invoice.submission.author?.address;
      const bountyAddress = invoice.bounty?.wallet.address;
      const bountyWalletData = await prisma.key.findUnique({
        where: {
          address: bountyAddress,
        },
        select: {
          privateKey: true,
        },
      });
      if (bountyWalletData) {
        const provider = ethers.getDefaultProvider('matic');
        const bountyWallet = new ethers.Wallet(
          bountyWalletData.privateKey,
          provider
        );
        const balance =
          parseFloat(
            ethers.utils.formatEther(
              await provider.getBalance(bountyAddress as string)
            )
          ) - 0.02;
        if (balance > 0) {
          const txn = {
            to: userAddress,
            value: ethers.utils.parseEther(balance.toString()),
          };
          const txnResult = await bountyWallet.sendTransaction(txn);
          LOG(txnResult.hash);

          await prisma.invoice.update({
            where: {
              id: invoice.id,
            },
            data: {
              status: InvoiceStatus.Paid,
            },
          });

          await prisma.key.update({
            where: {
              address: bountyAddress,
            },
            data: {
              txnHash: txnResult.hash,
            },
          });
        } else {
          ERROR(`Bounty wallet has insufficient Balance: ${bountyAddress}`);
          throw new TRPCError({ code: 'BAD_REQUEST' });
        }
      } else {
        ERROR(`Bounty wallet cannot be found`);
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
    } else {
      ERROR(`Invoice cannot be found`);
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }
  } catch (error) {
    ERROR(`Error paying invoice: ${error}`);
  }
}

export const payInvoice = adminOnlyProcedure
  .input(payInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    const invoice = await _payInvoice(ctx.prisma, input);
    return { invoice };
  });

/** Array of organizations with Metadata in them */
export type FullInvoice = NonNullable<ThenArg<ReturnType<typeof _payInvoice>>>;
