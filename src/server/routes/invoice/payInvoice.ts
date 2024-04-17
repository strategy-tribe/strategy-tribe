import { InvoiceStatus, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ethers } from 'ethers';
import { z } from 'zod';

import { MultipleSubBounties } from '@/components/pages/explore/filters/utils/types';

import { ERROR, LOG } from '@/server/importer/utils';
import { adminOnlyProcedure } from '@/server/procedures';

import { NotifyUsers_InvoicePaid } from '../notification/utils/invoice';
import { ThenArg } from '../utils/helperTypes';

const payInvoiceSchema = z.object({
  submissionId: z.string(),
  bountySlug: z.string(),
});

const multipleSubmissionAcceptingBounties = JSON.parse(
  process.env.MULTIPLE_SUBMISSION_ACCEPTING_BOUNTIES || '[]'
);

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
            wallet: {
              include: {
                walletControl: true,
              },
            },
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
      const authorId = invoice.submission?.authorId ?? '';
      const provider = ethers.getDefaultProvider('matic');
      let bountyAddress;
      let privateKey;
      let balance;
      const matchingBounty = multipleSubmissionAcceptingBounties.find(
        (bounty: MultipleSubBounties) => bounty.bountySlug === bountySlug
      );
      if (!invoice.bounty.wallet.walletControl) {
        bountyAddress = invoice.bounty?.wallet.address;
        const bountyWalletData = await prisma.key.findUnique({
          where: {
            address: bountyAddress,
          },
          select: {
            privateKey: true,
          },
        });
        privateKey = bountyWalletData?.privateKey;
        balance =
          parseFloat(
            ethers.utils.formatEther(
              await provider.getBalance(bountyAddress as string)
            )
          ) - 0.02;
        if (matchingBounty) {
          balance = matchingBounty.invoiceAmount - 0.02;
        }
      } else {
        bountyAddress = process.env.NEXT_PUBLIC_COMMON_WALLET;
        privateKey = process.env.NEXT_PUBLIC_COMMON_WALLET_KEY;
        balance = invoice.bounty.wallet.balance;
        if (matchingBounty) {
          balance = matchingBounty.invoiceAmount;
        }
      }

      if (privateKey) {
        const bountyWallet = new ethers.Wallet(privateKey, provider);
        const fees = await provider.getFeeData();
        if (balance > 0) {
          const txn = {
            to: userAddress,
            gasPrice: fees.gasPrice!,
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
              txnHash: txnResult.hash,
              paidDate: new Date(),
              updatedAt: new Date(),
            },
          });
          await NotifyUsers_InvoicePaid(prisma, bountySlug, {
            userId: authorId,
            submissionId,
          });
        } else {
          ERROR(`Bounty wallet has insufficient Balance: ${bountyAddress}`);
          throw new TRPCError({ code: 'BAD_REQUEST' });
        }
      } else {
        ERROR(`Bounty wallet cannot be found: ${bountyAddress}`);
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
    } else {
      ERROR(`Invoice cannot be found. Submission Id: ${submissionId}`);
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
