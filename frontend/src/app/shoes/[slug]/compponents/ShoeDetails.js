"use client";
import { useSearchParams } from "next/navigation";
import { ShoeDummyData } from "@/app/constants/constants";
import Image from "next/image";

export default function ShoeDetails() {
	const searchParams = useSearchParams();
	const shoeId = searchParams.get("id");
	const shoeData = ShoeDummyData.find((item) => item.id == shoeId);
	return (
		<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div className="flex flex-col-reverse w-full mx-auto gap-4 md:flex-row md:justify-between">
				<div className="flex flex-col gap-4">
					<span className="block text-xs font-medium text-primaryColor md:text-sm">
						Buy
					</span>
					<h2 className="text-4xl font-semibold  md:text-6xl">
						{shoeData.title}
					</h2>
					<h4 className="text-lg  md:text-2xl">{shoeData.price}</h4>
				</div>

				<Image
					src={shoeData.img}
					width={500}
					height={500}
					className="object-contain  rounded-lg mx-auto md:mx-0 "
					alt={shoeData.title}
					priority={true}
				/>
			</div>
		</div>
	);
}
