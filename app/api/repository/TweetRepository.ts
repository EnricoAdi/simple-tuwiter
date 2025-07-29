import { Prisma } from "@prisma/client";
import { IRepository } from "./_IRepository";
import prisma from "@/services/Prisma";

export default new (class TweetRepository implements IRepository {
	create(newTweet: Prisma.tweetCreateInput) {
		return prisma.tweet.create({
			data: newTweet,
		});
	}
	update(tweet_id: number, data: Prisma.tweetUpdateInput) {
		return prisma.tweet.update({
			where: {
				tweet_id,
			},
			data,
		});
	}
	delete(tweet_id: number) {
		return prisma.tweet.delete({
			where: {
				tweet_id,
			},
		});
	}
	get(tweet_id: number) {
		return prisma.tweet.findFirst({
			where: {
				tweet_id,
			},
		});
	}
	fetch() {
		return prisma.tweet.findMany({
			include: {
				like: {
					select: {
						user_id: true,
					},
				},
				user: {
					select: {
						username: true,
						user_id: true,
						picture: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});
	}

	fetchWithPagination(pageNumber: number, pageSize: number = 50) {
		return prisma.tweet.findMany({
			skip: (pageNumber - 1) * pageSize,
			take: pageSize,
			include: {
				like: {
					select: {
						user_id: true,
					},
				},
				user: {
					select: {
						username: true,
						user_id: true,
						picture: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});
	}
})();
