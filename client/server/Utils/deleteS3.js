const AWS = require('aws-sdk');
const url = require('url');

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.awsAccessKey,
  secretAccessKey: process.env.awsSecretkey,
  region: process.env.awsRegion, // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

// Function to delete a file by S3 URL
async function deleteFileByURL(s3Url) {
  // Parse S3 URL
  const parsedUrl = new URL(s3Url);
  const bucketName = parsedUrl.hostname.split('.')[0];
  const key = decodeURIComponent(parsedUrl.pathname.substring(1));

  // Set parameters for S3 deletion
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    // Delete the file
    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${s3Url}`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
}
module.exports = deleteFileByURL

