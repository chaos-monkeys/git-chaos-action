const S3 = require('aws-sdk/clients/s3');

// TODO: figure out where this should go
const BUCKET = 'gitchaos';


const uploadHistory = async ({
  accessKeyId,
  secretAccessKey,
  body,
  sha: Key,
}) => {
  const s3 = new S3({
    accessKeyId,
    secretAccessKey,
  });

  const upload = s3.upload({
    Bucket: BUCKET,
    Body: JSON.stringify(body),
    Key,
  }).promise();

  const { Location: location } = await upload;

  return location;
};

module.exports = {
  uploadHistory,
};
