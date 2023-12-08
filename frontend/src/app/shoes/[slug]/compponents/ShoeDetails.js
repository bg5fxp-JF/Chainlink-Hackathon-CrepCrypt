"use client";
import { useSearchParams } from "next/navigation";
import { ShoeDummyData } from "@/app/constants/constants";
import Image from "next/image";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import CustomLinkButton from "@/app/components/CustomLinkButton";

export default function ShoeDetails() {
	const searchParams = useSearchParams();
	const shoeId = searchParams.get("id");
	const shoeData = ShoeDummyData.find((item) => item.id == shoeId);
	const isOwnerofShoe = true;

	// Splitting the description into parts
	const parts = shoeData.description.split(" | ");

	// Extracting brand, size, and description
	const brand = parts[0].split("Brand: ")[1];
	const size = parts[1].split("Size: ")[1];
	const description = parts[2].split("Description: ")[1];

	function formatAddress(address) {
		return address.slice(0, 6) + "..." + address.slice(address.length - 4);
	}

	return (
		<div className="flex flex-col w-full max-w-[1440px] min-h-screen gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div className="flex flex-col-reverse w-full mx-auto gap-4 md:flex-row md:justify-between">
				<div className="flex flex-col  gap-4 md:w-1/2 ">
					<span className="block text-xsm font-medium text-primaryColor md:text-sm">
						Buy
					</span>
					<div>
						<div className="flex items-center  ">
							<h2 className="text-4xl font-semibold  md:text-6xl">
								{shoeData.title} |
							</h2>
							<div className="flex items-center gap-x-2 ml-2">
								<RiVerifiedBadgeFill fill="#72b01d" />
								<span className="text-xsm ">Verified With Our AI</span>
							</div>
						</div>
						<p className="hidden font-light text-reg text-accent2 sm:block">
							Owned by {isOwnerofShoe ? "You" : shoeData.current_owner}
						</p>
						<p className="block font-light text-reg text-accent2 sm:hidden">
							Owned by {formatAddress(shoeData.current_owner)}
						</p>
					</div>
					<h4 className="text-lg font-medium  md:text-2xl">{shoeData.price}</h4>
					<h4 className="text-reg font-light md:text-lg">
						<span className="font-medium ">Previous Owners:</span>{" "}
						{shoeData.previous_owners}
					</h4>
					<h4 className="text-reg font-light md:text-lg">
						<span className="font-medium ">Brand:</span> {brand}
					</h4>
					<h4 className="text-reg font-light md:text-lg">
						<span className="font-medium ">Size:</span> {size}
					</h4>
					<h4 className=" text-reg font-light md:text-lg">
						<span className="font-medium ">Description:</span> {description}
					</h4>
					{/** TODO: Needs to be changed to for actual Buy Now */}
					{!isOwnerofShoe ? (
						<CustomLinkButton
							text="Buy Now"
							styles="flex justify-center text-white mt-4 bg-primaryColor "
							link="/shoes"
						/>
					) : (
						<CustomLinkButton
							text="Unlist Shoe"
							styles="flex justify-center text-white mt-4 bg-primaryColor "
							link="/"
						/>
					)}
				</div>
				<div className="flex items-center">
					<Image
						src={shoeData.img}
						width={500}
						height={500}
						className="object-contain rounded-lg mx-auto md:mx-0 "
						alt={shoeData.title}
						priority={true}
					/>
				</div>
			</div>
		</div>
	);
}
