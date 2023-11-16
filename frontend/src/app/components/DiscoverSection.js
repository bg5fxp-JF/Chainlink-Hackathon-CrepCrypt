import React from "react";
import { ShoeDummyData } from "../constants/constants";
import ShoeCard from "./ShoeCard";
import CustomButton from "./CustomButton";

export default function DiscoverSection() {
	return (
		<section className="w-full sm:px-16 px-6 pt-24 pb-12 items-center gap-8 max-w-[1440px] mx-auto">
			<span className="block mb-4 text-xs md:text-sm text-primaryColor font-medium mx-auto text-center">
				Discover
			</span>
			<h3 className="text-4xl md:text-6xl font-semibold mx-auto text-center">
				Shoes
			</h3>
			<div className="flex flex-col md:flex-row gap-5 pb-12">
				{ShoeDummyData.map(({ id, img, title, price }) => {
					return <ShoeCard key={id} img={img} title={title} price={price} />;
				})}
			</div>
			<div class="flex mx-auto ">
				<CustomButton
					text="View All"
					styles="text-white bg-primaryColor mx-auto"
				/>
			</div>
		</section>
	);
}
