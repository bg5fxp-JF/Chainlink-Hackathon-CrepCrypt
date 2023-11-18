import Image from "next/image";

export default function ShoeCard({ img, title, price }) {
	return (
		<div className="group w-[200px] space-y-3  mx-auto pt-10 cursor-pointer sm:w-[300px] md:w-full">
			<div className="overflow-hidden rounded-lg">
				<Image
					src={img}
					width={300}
					height={300}
					className=" object-contain overflow-hidden rounded-lg transition-all group-hover:scale-125"
					alt="Shoe Card"
					priority={true}
				/>
			</div>
			<div className="flex flex-col">
				<h4 className="text-2xl">{title}</h4>
				<p className="text-xsm text-accent2">Just Uploaded</p>
			</div>

			<p className="font-bold text-lg ">{price}</p>
		</div>
	);
}
