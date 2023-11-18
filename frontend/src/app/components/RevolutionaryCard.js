import Image from "next/image";

export default function RevolutionaryCard({ img, title, text }) {
	return (
		<div className="flex flex-col w-[200px] space-y-3 mx-auto pt-10 text-center  sm:w-[300px] md:w-full  ">
			<Image
				src={img}
				width={300}
				height={300}
				className="object-contain  mx-auto rounded-lg"
				alt="Revolutionary Card"
				priority={true}
			/>

			<h4 className="text-2xl">{title}</h4>
			<p className="font-light text-reg text-accent2">{text}</p>
		</div>
	);
}
