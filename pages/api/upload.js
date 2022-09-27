import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "fra1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
})