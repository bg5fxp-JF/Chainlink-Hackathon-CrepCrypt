import Image from "next/image";
import React from "react";

export default function ShoeCard({ img, title, price }) {
	return (
		<div className="group pt-10 space-y-3 w-[200px] sm:w-[300px]  mx-auto md:w-full cursor-pointer ">
			<div className="overflow-hidden">
				<Image
					src={img}
					width={300}
					height={300}
					className=" object-contain rounded-lg   transition-all group-hover:scale-125 "
					alt="Shoe Card"
					priority={true}
				/>
			</div>
			<h4 className="text-2xl">{title}</h4>
			<p className="font-bold text-lg text-accent2">{price}</p>
		</div>
	);
}
