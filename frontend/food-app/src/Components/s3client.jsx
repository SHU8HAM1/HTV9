// s3Client.js
// DONT UPLOAD ACCESS KEY TO GITHUB
import { S3Client } from "@aws-sdk/client-s3";
import getCredentials from "./constants";
let info = getCredentials();
const s3Client = new S3Client({
  region: "ca-central-1", // e.g., "us-east-1"
  credentials: {
    accessKeyId: info["key"],
    secretAccessKey:info["secret"],
  },
});

export { s3Client };