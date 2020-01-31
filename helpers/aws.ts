import { Body } from '../interfaces/body';

import S3 = require('aws-sdk/clients/s3');

const uploadHistory = async ({
  accessKeyId,
  secretAccessKey,
  body,
  sha: Key,
}: {
  accessKeyId: string;
  secretAccessKey: string;
  body: Body;
  sha: string;
}): Promise<string> => {
  const s3 = new S3({
    accessKeyId,
    secretAccessKey,
  });

  const upload = s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Body: JSON.stringify(body),
    Key,
  }).promise();

  const { Location: location } = await upload;

  return location;
};

export { uploadHistory };
