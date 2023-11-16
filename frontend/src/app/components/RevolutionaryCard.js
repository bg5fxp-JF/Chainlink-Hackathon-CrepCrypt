import Image from "next/image";

export default function RevolutionaryCard({ img, title, text }) {
	return (
		<div className="flex flex-col text-center pt-10 space-y-3 w-[200px] sm:w-[300px] mx-auto   md:w-full  ">
			<Image
				src={img}
				width={300}
				height={300}
				className="object-contain rounded-lg  mx-auto  "
				alt="Revolutionary Card"
				priority={true}
			/>

			<h4 className="text-2xl">{title}</h4>
			<p className="font-light text-reg text-accent2">{text}</p>
		</div>
	);
}
