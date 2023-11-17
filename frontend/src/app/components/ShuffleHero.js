import CustomButton from "./CustomButton";

import React from "react";
import ShuffleGrid from "./ShuffleGrid";

export default function ShuffleHero() {
	return (
		<section className="w-full sm:px-16 px-6 pt-24 bg-secondaryColor  flex flex-col max-h-screen overflow-hidden items-center gap-8 max-w-[1440px] mx-auto relative">
			{/* <div className="absolute w-[200px] h-[200px] left-0 -top-[50px] gradient-01"></div>
			<div className="absolute w-[200px] h-[200px] right-24 top-[400px] gradient-01"></div> */}
			<div className="flex flex-col pb-6 ">
				<h3 className="text-4xl md:text-6xl font-semibold text-center">
					The Future of Shoe Ownership
				</h3>
				<p className="text-center text-accent2 md:text-lg my-4 md:my-6">
					We utilize AI and cutting-edge blockchain technology to ensure secure
					ownership of listed shoes.
				</p>
				<div className="flex gap-x-4 mx-auto">
					<CustomButton text="Buy Shoes" styles="text-white bg-primaryColor" />
					<CustomButton text="List Shoes" styles="text-white bg-primaryColor" />
				</div>
			</div>
			<ShuffleGrid />
		</section>
	);
}
