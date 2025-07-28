import { NextRequest, NextResponse } from "next/server";
import GetUserSessionUseCase from "../use-case/auth/GetUserSessionUseCase";
import UpdateProfileUseCase from "../use-case/auth/UpdateProfileUseCase";
import { S3 } from "@/app/utils/s3";

export async function PUT(req: NextRequest) {
	try {
		const userSession = await GetUserSessionUseCase.execute();
		const formData = await req.formData();
		let body = Object.fromEntries(formData.entries());
		const file = formData.get("file");
		if (!file || !(file instanceof File)) {
			throw new Error("File not found");
		}
		const uploadResult = await S3.uploadFile(file);
		const { username } = body as any as { username: string };

		const user = await UpdateProfileUseCase.execute(
			userSession.user_id,
			username,
			uploadResult
		);
		return NextResponse.json(
			{
				message: "Update Success",
				data: user,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error,
			},
			{ status: 500 }
		);
	}
}
