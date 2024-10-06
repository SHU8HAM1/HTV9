// s3Client.js
// DONT UPLOAD ACCESS KEY TO GITHUB
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "your-region", // e.g., "us-east-1"
  credentials: {
    accessKeyId: "", 
    secretAccessKey: "",
  },
});

export { s3Client };