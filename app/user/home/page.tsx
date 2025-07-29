"use client";
import {
	Flex,
	Heading,
	Button,
	Box,
	Avatar,
	Text,
	Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "@/app/utils/trpc";

const UserHome = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const utils = trpc.useUtils();
	const observer = useRef<IntersectionObserver | null>(null);
	const [tweets, setTweets] = useState<
		{
			title: string;
			content: string;
			tweet_id: number;
			user_id: number;
			username: string;
			picture: string;
			likes: number;
			isLike: boolean;
		}[]
	>([]);
	const fetchTweets = trpc.tweet.fetchTweetsWithPagination.useQuery(
		{
			pageNumber,
		},
		{
			getNextPageParam: (lastPage) => {
				return lastPage.length > 0 ? pageNumber + 1 : undefined;
			},
		}
	);
	const lastTweetElement = useCallback(
		(node: HTMLDivElement) => {
			if (fetchTweets.isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPageNumber((prev) => prev + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[fetchTweets.isLoading]
	);
	const { data: session } = useSession();
	const toggleLike = trpc.like.toggleLike.useMutation({
		onSuccess: () => {
			utils.tweet.fetchTweetsWithPagination.setInfiniteData(
				{ pageNumber },
				(old) => {
					console.log({ old });
					if (!old) return old;
					return {
						...old,
						pages: old.pages.map((page) => {
							return page.map((tweet) => {
								if (tweet.tweet_id === toggleLike.variables?.tweet_id) {
									return {
										...tweet,
										isLike: !tweet.isLike,
										likes: tweet.isLike ? tweet.likes - 1 : tweet.likes + 1,
									};
								}
								return tweet;
							});
						}),
					};
				}
			);
		},
	});
	const deleteTweet = trpc.tweet.deleteTweet.useMutation({
		onSuccess: () => {
			fetchTweets.refetch();
		},
	});
	const deleteTweetAction = (tweet_id: number) => {
		deleteTweet.mutate({ tweet_id });
	};
	const toggleLikeAction = (tweet_id: number) => {
		toggleLike.mutate({ tweet_id });
	};
	useEffect(() => {
		if (fetchTweets.data) {
			// console.log("Fetched infinite tweets:", fetchTweets.data);
			setTweets((prev) => [...prev, ...fetchTweets.data]);
		}
	}, [fetchTweets.data]);
	return (
		<Box p={2}>
			<Heading size="md">Welcome, {session?.user?.name}!</Heading>
			<Link href="/user/tweet">
				<Button
					colorScheme="blue"
					rounded={"3xl"}
					mt={3}
				>
					Tweet!
				</Button>{" "}
			</Link>
			{tweets.map((tweet, index) => {
				return (
					<Box
						mt={3}
						ref={index + 1 == tweets.length ? lastTweetElement : undefined}
						key={tweet.tweet_id + "_" + index}
						className="border-gray-400 border-2 p-2 rounded-md"
					>
						<Flex
							gap={3}
							mb={2}
						>
							<Avatar
								size="sm"
								src={tweet.picture}
							/>
							<Heading size="md">
								{tweet.username} {tweet.tweet_id}
							</Heading>
						</Flex>
						<Text>{tweet.title}</Text>
						<Text>{tweet.content}</Text>
						<Flex
							mt={3}
							gap={2}
						>
							{tweet.isLike ? (
								<Icon
									as={FaHeart}
									color="red"
									my={"auto"}
									onClick={() => toggleLikeAction(tweet.tweet_id)}
								/>
							) : (
								<Icon
									as={FaRegHeart}
									my={"auto"}
									onClick={() => toggleLikeAction(tweet.tweet_id)}
								/>
							)}
							<Text>{tweet.likes} Likes</Text>

							{/* @ts-ignore: Unreachable code error */}
							{session &&
								session.user &&
								// @ts-ignore: Unreachable code error
								session.user.user_id &&
								// @ts-ignore: Unreachable code error
								tweet.user_id == session?.user.user_id && (
									<Icon
										as={FaTrash}
										color="red.500"
										my={"auto"}
										ml={4}
										onClick={() => deleteTweetAction(tweet.tweet_id)}
									/>
								)}
						</Flex>
					</Box>
				);
			})}
			{fetchTweets.isLoading && (
				<div>
					<Button isLoading={true} />
				</div>
			)}
			{fetchTweets.error && <div>Error: {fetchTweets.error.message}</div>}
		</Box>
	);
};

export default UserHome;
