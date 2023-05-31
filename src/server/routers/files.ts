import { S3 } from 'aws-sdk';
import { PresignedPost } from 'aws-sdk/clients/s3';
import { z } from 'zod';

import { LOG } from '../importer/utils';
import { publicProcedure, router } from '../procedures';

export const s3 = new S3({
  accessKeyId: process.env.OUR_AWS_ACCESS_KEY,
  secretAccessKey: process.env.OUR_AWS_SECRET_KEY,
  region: process.env.OUR_AWS_REGION,
});

export const fileRouter = router({
  createPresignedURL: publicProcedure
    .input(
      z.object({
        keys: z.string().array(),
      })
    )
    .mutation(({ input }) => {
      return new Promise((resolve, reject) => {
        const combined: { [key: string]: PresignedPost } = {};
        input.keys.map((key) =>
          s3.createPresignedPost(
            {
              Fields: {
                key,
              },
              Conditions: [['content-length-range', 0, 10485760]],
              Expires: 30,
              Bucket: process.env.OUR_AWS_BUCKET_NAME,
            },
            (err, data) => {
              if (err) return reject(err);
              combined[key] = data;
              if (Object.keys(combined).length >= input.keys.length)
                resolve(combined);
            }
          )
        );
      });
    }),
  getSignedUrlPromise: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const obj = await s3
          .headObject({
            Key: input.key,
            Bucket: process.env.OUR_AWS_BUCKET_NAME ?? '',
          })
          .promise();
        if (!obj) return '';

        const url = await s3.getSignedUrlPromise('getObject', {
          Key: input.key,
          Bucket: process.env.OUR_AWS_BUCKET_NAME,
          Expires: 240,
        });
        return url;
      } catch (e: any) {
        LOG(`${input.key}: ${e.toString()}`);
        return '';
      }
    }),
});
