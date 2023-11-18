import { FAQData } from "../constants/constants";
import FAQAccordion from "./FAQAccordion";

export default function FAQSection() {
	return (
		<section className="flex flex-col w-full max-w-[1440px] gap-y-5 mx-auto px-6 pt-24 pb-12 md:flex-row md:gap-x-28 sm:px-16">
			<div>
				<span className="block mb-4 text-sm font-medium text-primaryColor">
					What would you like to know?
				</span>
				<h3 className="text-4xl font-semibold  md:text-6xl">
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
