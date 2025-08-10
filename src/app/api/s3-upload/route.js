import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Setup S3 client
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCES_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCES_KEY,
  },
});

// Upload to S3
async function uploadFileToS3(fileBuffer, originalName) {
  const finalFileName = `${originalName}-${Date.now()}`;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: finalFileName,
    Body: fileBuffer,
    ContentType: "image/jpg", 
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return finalFileName;
}

// API POST handler
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    const uploadedFileName = await uploadFileToS3(buffer, fileName);

    return NextResponse.json({ success: true, fileName: uploadedFileName, size: buffer.length  });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
