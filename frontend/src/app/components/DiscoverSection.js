import React from "react";
import { ShoeDummyData } from "../constants/constants";
import ShoeCard from "./ShoeCard";
import CustomButton from "./CustomButton";

export default function DiscoverSection() {
	return (
		<section className="w-full max-w-[1440px] mx-auto px-6 pt-24 pb-12 sm:px-16  ">
			<span className="block mx-auto mb-4 text-center text-sm font-medium text-primaryColor ">
				Discover
			</span>
			<h3 className="mx-auto text-center text-4xl font-semibold md:text-6xl">
				Shoes
			</h3>
			<div className="flex flex-col gap-5 pb-12 md:flex-row">
				{ShoeDummyData.map(({ id, img, title, price }) => {
					return <ShoeCard key={id} img={img} title={title} price={price} />;
				})}
			</div>
			<div className="flex mx-auto">
				<CustomButton
					text="View All"
					styles="mx-auto text-white bg-primaryColor"
				/>
			</div>
		</section>
	);
}
