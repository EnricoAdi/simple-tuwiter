"use client";
import {
	Flex,
	Heading,
	Button,
	Box,
	Avatar,
	Text,
	Icon,
	useToast,
	Input,
	FormLabel,
} from "@chakra-ui/react";
import axios, { AxiosProgressEvent } from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpc } from "@/app/utils/trpc";
import SuccessToast from "@/utils/SuccessToast";
import { useRouter } from "next/navigation";

const UserSetting = () => {
	const {
		data: user,
		error: errorUser,
		isLoading: isLoadingUser,
	} = trpc.user.getUserLoggedIn.useQuery();
	const toast = useToast();
	const { data: session } = useSession();
	const [updateLoading, setUpdateLoading] = useState(false);
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [picture, setPicture] = useState<string>("");
	const [file, setFile] = useState<File | null>(null);
	// const editUser = trpc.user.updateProfile.useMutation({
	// 	onSuccess: (data) => {
	// 		SuccessToast(toast, data.message);
	// 		router.push("/user/home");
	// 	},
	// });
	const editUserAction = async () => {
		// editUser.mutate({ username, picture });
		setUpdateLoading(true);
		const payload = new FormData();
		payload.append("username", username);
		if (file) {
			payload.append("file", file);
		}
		const res = await axios.put("/api/profile", payload, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		});
		SuccessToast(toast, res.data.message);
		setUpdateLoading(false);
	};
	useEffect(() => {
		if (user) {
			setUsername(user.username);
			setPicture(user.picture);
		}
	}, [user]);
	return (
		<Box p={2}>
			<Heading size="md">Setting</Heading>
			{isLoadingUser && <div>Loading...</div>}
			{errorUser && <div>{errorUser.message}</div>}
			{!isLoadingUser && user && (
				<Box>
					<Flex justifyContent={"center"}>
						<Avatar
							name={user.username}
							src={file ? URL.createObjectURL(file) : picture}
							size="xl"
						/>
					</Flex>
					<FormLabel>Username</FormLabel>
					<Input
						placeholder="Username"
						defaultValue={user.username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<FormLabel mt={3}>Picture</FormLabel>
					<Input
						type={"file"}
						onChange={(e) =>
							setFile(e.target?.files?.[0] ? e.target.files[0] : null)
						}
						accept="image/*"
					/>
					<Button
						colorScheme="blue"
						mt={5}
						w="full"
						isLoading={updateLoading}
						onClick={editUserAction}
					>
						Save
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default UserSetting;
