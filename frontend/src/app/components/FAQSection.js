import React from "react";
import { FAQData } from "../constants/constants";
import FAQAccordion from "./FAQAccordion";

export default function FAQSection() {
	return (
		<section className="w-full sm:px-16 px-6 pt-24 pb-12 flex flex-col md:flex-row gap-y-5  gap-x-28 max-w-[1440px] mx-auto">
			<div>
				<span className="block mb-4 text-xs md:text-sm text-primaryColor font-medium ">
					What would you like to know?
				</span>
				<h3 className="text-4xl md:text-6xl font-semibold">
					Frequently Asked Questions
				</h3>
				<p className="font-light text-reg text-accent2">
					Find answers to the most common questions about our decentralized
					marketplace and shoe NFTs.
				</p>
			</div>
			<div className="flex flex-col gap-y-5">
				{FAQData.map(({ title, text }) => {
					return <FAQAccordion key={title} title={title} text={text} />;
				})}
			</div>
		</section>
	);
}
