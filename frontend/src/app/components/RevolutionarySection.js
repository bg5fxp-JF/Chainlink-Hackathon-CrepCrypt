import React from "react";
import { RevolutionaryData } from "../constants/constants";
import RevolutionaryCard from "./RevolutionaryCard";

export default function RevolutionarySection() {
	return (
		<section className="w-full max-w-[1440px] items-center gap-8  mx-auto px-6 pt-24 pb-12 sm:px-16  ">
			<span className="block mx-auto mb-4 text-xs font-medium text-center text-primaryColor md:text-sm">
				Revolutionary
			</span>
			<h3 className="mx-auto text-4xl font-semibold text-center md:text-6xl">
				Track Shoe Ownership with NFTs on our Marketplace
			</h3>
			<div className="flex flex-col gap-10 mx-auto pb-12 md:flex-row">
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
