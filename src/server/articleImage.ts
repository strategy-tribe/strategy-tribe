import { PrismaClient } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { BucketName } from 'aws-sdk/clients/s3';

import { ERROR } from './importer/utils';

export async function getArticleImage(prisma: PrismaClient, id: string) {
  try {
    const s3 = new S3({
      accessKeyId: process.env.OUR_AWS_ACCESS_KEY,
      secretAccessKey: process.env.OUR_AWS_SECRET_KEY,
      region: process.env.OUR_AWS_REGION,
    });
    const image = await s3
      .getObject({
        Key: `articles/${id}.jpeg`,
        Bucket: process.env.OUR_AWS_BUCKET_NAME as BucketName,
      })
      .promise();
    return image;
  } catch (error) {
    ERROR(`Error updating balances: ${error}`);
  }
}
