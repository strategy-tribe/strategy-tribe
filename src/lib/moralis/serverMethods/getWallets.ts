import Moralis from 'moralis';

type WalletType = 'org' | 'bounty';

export type Wallet = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: WalletType;
  assigned: string;
  address: string;
  privateKey: string;
  mnemonic: string;
};

export interface WalletQueryParams {
  paginate?: boolean;
  amount?: number;
  page?: number;
}

export function Moralis_GetWallets(config: WalletQueryParams) {
  try {
    const { amount, paginate, page } = config;
    const getWallets = async () => {
      const q = new Moralis.Query('Wallet');

      if (amount) {
        q.limit(amount);
      }

      if (paginate && page && amount) {
        const toSkip = (page - 1) * amount;
        q.skip(toSkip);
      }

      const rawResult = await q.find();

      const wallets: Wallet[] = [];

      rawResult.forEach((obj) => {
        const wallet = CastWallet(obj);
        wallets.push(wallet);
      });

      return wallets;
    };

    return { getInvoices: getWallets };
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function CastWallet(rawWallet: Moralis.Object<Moralis.Attributes>) {
  const {
    address,
    assigned,
    mnemonic: mnemnic,
    privateKey,
    type,
    createdAt,
    updatedAt,
  } = rawWallet.attributes as Wallet;

  const wallet: Wallet = {
    id: rawWallet.id,
    address,
    assigned,
    mnemonic: mnemnic,
    privateKey,
    type,
    createdAt,
    updatedAt,
  };

  return wallet;
}
