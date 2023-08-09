import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, chain, network } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      domain: process.env.APP_DOMAIN as string,
      statement: 'Please sign this message to confirm your identity.',
      uri: process.env.NEXTAUTH_URL as string,
      timeout: 60,
    });

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
    console.error(error);
  }
}
