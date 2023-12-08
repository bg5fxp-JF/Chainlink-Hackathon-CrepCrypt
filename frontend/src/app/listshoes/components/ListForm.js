"use client";
import { CrepCryptAbi, CrepCryptAddress } from "@/app/constants/contract";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { parseEther } from "viem";
import { LISTING_FEE } from "@/app/constants/constants";

export default function ListForm() {
	const [formData, setFormData] = useState({
		name: "",
		tokenId: "",
		tokenUri: "",
		brand: "",
		size: "",
		price: "",
		description: "",
	});
	const [image, setImage] = useState(null); // New state for image
	const [formSubmitted, setFormSubmitted] = useState(false);

	const { isConnected } = useAccount();

	const { write: listNftFunc } = useContractWrite({
		address: CrepCryptAddress,
		abi: CrepCryptAbi,
		functionName: "listNFT",
		value: parseEther(LISTING_FEE),
		onSuccess() {
			toast(`Successfully Listed ${formData.name}`);
			setFormData({
				name: "",
				tokenId: "",
				tokenUri: "",
				brand: "",
				size: "",
				price: "",
				description: "",
			});
			setImage(null);
		},
		onError(error) {
			toast(`${error.message}`);
		},
	});
	const { write: relistNftFunc } = useContractWrite({
		address: CrepCryptAddress,
		abi: CrepCryptAbi,
		functionName: "relistNft",
		value: parseEther(LISTING_FEE),
		onSuccess() {
			toast(`Successfully Relisted ${formData.name}`);
			setFormData({
				name: "",
				tokenId: "",
				tokenUri: "",
				brand: "",
				size: "",
				price: "",
				description: "",
			});
			setImage(null);
		},
		onError(error) {
			toast(`${error.message}`);
		},
	});

	async function pinataUpload(img) {
		const fd = new FormData();

		fd.append("file", img);

		const metadata = JSON.stringify({
			name: "File name",
		});
		fd.append("pinataMetadata", metadata);

		const options = JSON.stringify({
			cidVersion: 0,
		});
		fd.append("pinataOptions", options);

		try {
			const res = await axios.post(
				"https://api.pinata.cloud/pinning/pinFileToIPFS",
				fd,
				{
					maxBodyLength: "Infinity",
					headers: {
						"Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
					},
				}
			);

			setFormData({
				...formData,
				tokenUri: res.data.IpfsHash,
			});
		} catch (error) {
			console.log(error);
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		// console.log(formData);
		// formatFormData(formData);
	};

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const formatFormData = (formData) => {
		var stringObject = `Name: ${formData.name} | Brand: ${formData.brand} | Size: ${formData.size} | Description: ${formData.description}`;
		return stringObject;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isConnected) {
			toast.warn("Not Connected. Please Connect Wallet.");
			return;
		}
		const desc = formatFormData(formData);
		// check if user wants to relist token id
		if (formData.tokenId >= 1) {
			// const { data } = useContractRead({
			//     address: CrepCryptAddress,
			//     abi: CrepCryptAbi,
			//     functionName: "metadata",
			//     args: [formData.tokenId],
			// });
			await pinataUpload(image);
			// call list nft function
			const tokenUri =
				process.env.NEXT_PUBLIC_GATEWAY_URL + "/ipfs/" + formData.tokenUri;
			const relistNftArgs = [formData.tokenId, desc];

			relistNftFunc({ args: relistNftArgs });
		} else {
			await pinataUpload(image);
			// call list nft function
			const tokenUri =
				process.env.NEXT_PUBLIC_GATEWAY_URL + "/ipfs/" + formData.tokenUri;
			const listNftArgs = [formData.price, tokenUri, desc];

			listNftFunc({ args: listNftArgs });
		}
	};

	return (
		<div className="flex flex-col w-full max-w-[1440px] min-h-screen gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div className="flex flex-col-reverse w-full mx-auto gap-4 md:flex-row md:justify-between">
				<div className="flex flex-col  gap-4 md:w-1/2 ">
					<span className="block text-xsm font-medium text-primaryColor md:text-sm">
						Sell
					</span>
					<div>
						<h2 className="text-4xl font-semibold  md:text-6xl">List Shoe</h2>
						<p className="font-light text-reg text-red-900">
							{`* Listing costs a fee of ${LISTING_FEE} ether`}
						</p>
					</div>

					<form
						className="flex flex-col gap-y-4 items-center justify-center"
						onSubmit={handleSubmit}
					>
						<div className="flex gap-x-2 w-full">
							<div className="p-2 rounded shadow-md w-full">
								<input
									className="focus-visible:outline-none w-full"
									required
									type="text"
									name="name"
									placeholder="Name of Shoe"
									value={formData.name}
									onChange={handleChange}
								/>
							</div>
							<div className="p-2 rounded shadow-md w-full">
								<input
									className="focus-visible:outline-none w-full"
									type="number"
									name="tokenId"
									placeholder="Token Id (Relisting?)"
									min={1}
									value={formData.tokenId}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="text"
								name="brand"
								placeholder="Brand of Shoe"
								value={formData.brand}
								onChange={handleChange}
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="file"
								name="image"
								onChange={handleImageChange}
								accept="image/*"
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="number"
								name="size"
								placeholder="Size"
								min={1}
								value={formData.size}
								onChange={handleChange}
							/>
						</div>
						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="number"
								name="price"
								placeholder="Price"
								min={0}
								value={formData.price}
								onChange={handleChange}
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<textarea
								className="focus-visible:outline-none w-full"
								required
								type="text"
								name="description"
								placeholder="Description"
								rows={4}
								value={formData.description}
								onChange={handleChange}
							/>
						</div>

						<div className="w-full">
							<button
								className="text-reg flex w-full  px-4 py-2 rounded-full transition-all active:scale-95  justify-center text-white mt-4 bg-primaryColor"
								type="submit"
							>
								Submit Shoes
							</button>
							<ToastContainer />
						</div>
					</form>
				</div>

				{image ? (
					<div className="flex items-center ">
						<Image
							src={URL.createObjectURL(image)}
							width={500}
							height={500}
							className=" object-cover rounded-lg mx-auto md:mx-0 "
							alt={formData.name}
							priority={true}
						/>
					</div>
				) : (
					<div className="flex items-center justify-center w-full  md:w-1/2 rounded-lg bg-slate-100">
						No Image Selected
					</div>
				)}
			</div>
		</div>
	);
}
