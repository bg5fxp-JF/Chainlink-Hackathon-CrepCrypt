"use client";

import ShoeCard from "@/app/components/ShoeCard";
import { ShoeDummyData } from "@/app/constants/constants";
import { CrepCryptAbi, CrepCryptAddress } from "@/app/constants/contract";
import { useContractRead } from "wagmi";

export default function Shoes() {
	const { data: totalSupply } = useContractRead({
		address: CrepCryptAddress,
		abi: CrepCryptAbi,
		functionName: "totalSupply",
		watch: true,
	});

	console.log(totalSupply);

	for (let index = 0; index < totalSupply; index++) {
		const { data } = useContractRead({
			address: CrepCryptAddress,
			abi: CrepCryptAbi,
			functionName: "metadata",
			args: [index],
			watch: true,
		});
		console.log("================================================");
		console.log(index);
		console.log(data);
		console.log("================================================");
	}

	return (
		<div className="grid justify-between gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{ShoeDummyData.map(({ id, img, title, price }) => {
				return (
					<ShoeCard key={id} id={id} img={img} title={title} price={price} />
				);
			})}
		</div>
	);
}
