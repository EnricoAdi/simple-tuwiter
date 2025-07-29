import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export const S3 = {
	uploadFile: async (file: File) => {
		const s3 = new S3Client({
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY as string,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
			},
			region: process.env.S3_REGION as string,
		});
		const uuid = crypto.randomUUID();
		const buffer = Buffer.from(await file.arrayBuffer());
		const key = `${uuid}.${file.name.split(".").pop()}`;
		const command = new PutObjectCommand({
			Key: key,
			Bucket: process.env.S3_BUCKET_NAME,
			Body: buffer,
		});

		await s3.send(command);

		return key;
	},
	getPresignedUrl: async (key: string) => {
		const s3 = new S3Client({
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY as string,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
			},
			region: process.env.S3_REGION as string,
		});
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key,
		});
		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
		return signedUrl;
	},
};
