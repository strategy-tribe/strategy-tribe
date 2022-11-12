import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const ONE_SIGNAL_URL = process.env.ONE_SIGNAL_URL as string;
const KEY_APP_KEY = process.env.ONE_SIGNAL_APP_KEY as string;
const APP_ID = process.env.ONE_SIGNAL_APP_ID as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body.user;
  try {
    const options = {
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${KEY_APP_KEY}`,
      },
      data: {
        // app_id: APP_ID,
        include_external_user_ids: [user],
        contents: {
          en: 'Test message',
        },
        // urlCallback: 'http://localhost:3000/faq',
        name: 'TEST NOTIFICATION',
      },
    };

    const result = await axios.request(options);

    return res.status(200).json({
      msg: `success, test message sent to ${user}`,
      result: JSON.stringify(result, null, 2),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
