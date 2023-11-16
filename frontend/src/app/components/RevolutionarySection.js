import React from "react";
import { RevolutionaryData } from "../constants/constants";
import RevolutionaryCard from "./RevolutionaryCard";

export default function RevolutionarySection() {
	return (
		<section className="w-full sm:px-16 px-6 pt-24 pb-12 items-center gap-8 max-w-[1440px] mx-auto">
			<span className="block mb-4 text-xs md:text-sm text-primaryColor font-medium mx-auto text-center">
				Revolutionary
			</span>
			<h3 className="text-4xl md:text-6xl font-semibold mx-auto text-center">
				Track Shoe Ownership with NFTs on our Marketplace
			</h3>
			<div className="flex flex-col md:flex-row gap-10 pb-12 mx-auto ">
				{RevolutionaryData.map(({ img, title, text }) => {
					return (
						<RevolutionaryCard
							key={title}
							img={img}
							title={title}
							text={text}
						/>
					);
				})}
			</div>
		</section>
	);
}
