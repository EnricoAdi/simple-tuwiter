import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import RegisterUseCase from "@/app/api/use-case/auth/RegisterUseCase";
import GetUserSessionUseCase from "@/app/api/use-case/auth/GetUserSessionUseCase";
import UserRepository from "@/app/api/repository/UserRepository";
import UpdateProfileUseCase from "@/app/api/use-case/auth/UpdateProfileUseCase";
import { S3 } from "@/app/utils/s3";

const t = initTRPC.create();

export const userRouter = t.router({
	registerUser: t.procedure
		.input(
			z
				.object({
					username: z.string().min(1, { message: "Username cannot be empty" }),
					password: z.string().min(1, { message: "Password cannot be empty" }),
					confirmPassword: z
						.string()
						.min(1, { message: "Confirmation cannot be empty" }),
				})
				.refine((data) => data.password == data.confirmPassword, {
					message: "Password and confirmation not match",
					path: ["confirmPassword"],
				})
		)
		.mutation(async (opts) => {
			const { username, password } = opts.input;
			const user = await RegisterUseCase.execute(username, password);
			user.password = "";
			return {
				data: user,
				message: "User registered successfully",
			};
		}),
	getUserLoggedIn: t.procedure.query(async () => {
		const userSession = await GetUserSessionUseCase.execute();
		const userDb = await UserRepository.getById(userSession.user_id);
		if (!userDb) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found",
			});
		}
		userDb.password = "";
		const url = await S3.getPresignedUrl(userDb.picture);
		userDb.picture = url;
		return userDb;
	}),
	updateProfile: t.procedure
		.input(
			z.object({
				username: z.string().min(1, { message: "Username cannot be empty" }),
				picture: z.string(),
			})
		)
		.mutation(async (opts) => {
			const userSession = await GetUserSessionUseCase.execute();
			const { username, picture } = opts.input;
			const user = await UpdateProfileUseCase.execute(
				userSession.user_id,
				username,
				picture
			);
			return {
				data: user,
				message: "User profile updated!",
			};
		}),
	getPresignedUrl: t.procedure
		.input(
			z.object({
				fileName: z.string(),
			})
		)
		.query(async (opts) => {
			const { fileName } = opts.input;
			const url = await S3.getPresignedUrl(fileName);
			return {
				data: url,
				message: "Presigned URL generated successfully",
			};
		}),
});

/**
 * .
 */
