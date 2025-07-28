import { Prisma } from "@prisma/client";
import { IRepository } from "./_IRepository";
import prisma from "@/services/Prisma";

export default new (class UserRepository implements IRepository {
	create(newUser: Prisma.userCreateInput) {
		return prisma.user.create({
			data: newUser,
		});
	}
	update(user_id: number, data: Prisma.userUpdateInput) {
		return prisma.user.update({
			where: {
				user_id,
			},
			data,
			select: {
				user_id: true,
				username: true,
				picture: true,
				created_at: true,
			},
		});
	}
	delete(...params: any[]) {
		throw new Error("Method not implemented.");
	}
	get(username: string) {
		return prisma.user.findFirst({
			where: {
				username,
			},
		});
	}
	getById(id: string | number) {
		return prisma.user.findFirst({
			where: {
				user_id: parseInt(id as string),
			},
		});
	}
	fetch() {
		return prisma.user.findMany({
			select: {
				user_id: true,
				username: true,
				picture: true,
				created_at: true,
			},
			orderBy: {
				user_id: "desc",
			},
		});
	}
})();
