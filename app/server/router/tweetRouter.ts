import { z } from "zod";
import { initTRPC } from "@trpc/server";
import NextAuth, { getServerSession, Session } from "next-auth";
import GetUserSessionUseCase from "@/app/api/use-case/auth/GetUserSessionUseCase";
import CreateTweetUseCase from "@/app/api/use-case/tweet/CreateTweetUseCase";
import TweetRepository from "@/app/api/repository/TweetRepository";
import DeleteTweetUseCase from "@/app/api/use-case/tweet/DeleteTweetUseCase";
import { S3 } from "@/app/utils/s3";
import { randomTweets } from "@/app/utils/randoms";

const t = initTRPC.create();

export const tweetRouter = t.router({
	fetchTweets: t.procedure.query(async () => {
		const user = await GetUserSessionUseCase.execute();
		const tweetsDb = await TweetRepository.fetch();
		let tweets: {
			tweet_id: number;
			username: string;
			user_id: number;
			picture: string;
			title: string;
			content: string;
			likes: number;
			isLike: boolean;
		}[] = [];
		for (const t of tweetsDb) {
			let liker = t.like.flatMap((l) => l.user_id);
			const isLike = liker.includes(user.user_id);
			const picture = await S3.getPresignedUrl(t.user.picture);
			tweets.push({
				tweet_id: t.tweet_id,
				username: t.user.username,
				user_id: t.user.user_id,
				picture: picture,
				title: t.tweet_title,
				content: t.tweet_content,
				likes: liker.length,
				isLike: isLike,
			});
		}
		return tweets;
	}),
	fetchTweetsWithPagination: t.procedure
		.input(
			z.object({
				pageNumber: z
					.number()
					.min(1, { message: "Page must be greater than 0" }),
			})
		)
		.query(async (opts) => {
			const user = await GetUserSessionUseCase.execute();
			const { pageNumber } = opts.input;
			const tweetsDb = await TweetRepository.fetchWithPagination(
				pageNumber,
				50
			);
			let tweets: {
				tweet_id: number;
				username: string;
				user_id: number;
				picture: string;
				title: string;
				content: string;
				likes: number;
				isLike: boolean;
			}[] = [];
			for (const t of tweetsDb) {
				let liker = t.like.flatMap((l) => l.user_id);
				const isLike = liker.includes(user.user_id);
				const picture = await S3.getPresignedUrl(t.user.picture);
				tweets.push({
					tweet_id: t.tweet_id,
					username: t.user.username,
					user_id: t.user.user_id,
					picture: picture,
					title: t.tweet_title,
					content: t.tweet_content,
					likes: liker.length,
					isLike: isLike,
				});
			}
			return tweets;
		}),
	createTweet: t.procedure
		.input(
			z.object({
				title: z.string().min(1, { message: "Title tweet cannot be empty" }),
				content: z.string().min(1, { message: "Content cannot be empty" }),
			})
		)
		.mutation(async (opts) => {
			const user = await GetUserSessionUseCase.execute();
			const { title, content } = opts.input;
			const newTweet = await CreateTweetUseCase.execute(
				title,
				content,
				user.user_id
			);
			return {
				data: newTweet,
				message: "Tweet created successfully",
			};
		}),
	deleteTweet: t.procedure
		.input(
			z.object({
				tweet_id: z.number(),
			})
		)
		.mutation(async (opts) => {
			const user = await GetUserSessionUseCase.execute();
			const { tweet_id } = opts.input;
			await DeleteTweetUseCase.execute(user.user_id, tweet_id);
			return {
				data: null,
				message: `Delete tweet success`,
			};
		}),
	adminSeedTweet: t.procedure.mutation(async (opts) => {
		for (let i = 0; i < 500; i++) {
			let userId = Math.floor(Math.random() * 12) + 1;
			let tweet = randomTweets[Math.floor(Math.random() * randomTweets.length)];
			CreateTweetUseCase.execute(tweet.title, tweet.content, userId);
		}
		return {
			data: null,
			message: `Seed tweet success`,
		};
	}),
});
