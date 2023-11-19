import Image from "next/image";
import Link from "next/link";

export default function ShoeCard({ id, img, title, price }) {
	return (
		<Link
			href={`/shoes/${title}?id=${id}`}
			className="group max-w-[400px] space-y-3 mx-auto pt-10 cursor-pointer  sm:w-full "
		>
			<div className="overflow-hidden rounded-lg">
				<Image
					src={img}
					width={400}
					height={400}
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
		</Link>
	);
}
