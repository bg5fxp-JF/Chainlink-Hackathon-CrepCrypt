import CustomButton from "./CustomButton";
import ShuffleGrid from "./ShuffleGrid";

export default function ShuffleHero() {
	return (
		<section className="relative flex flex-col items-center w-full max-w-[1440px]  max-h-screen overflow-hidden gap-8  mx-auto px-6 pt-24 bg-secondaryColor sm:px-16">
			{/* <div className="absolute w-[200px] h-[200px] left-0 -top-[50px] gradient-01"></div>
			<div className="absolute w-[200px] h-[200px] right-24 top-[400px] gradient-01"></div> */}
			<div className="flex flex-col pb-6 ">
				<h3 className="text-4xl font-semibold text-center md:text-6xl">
					The Future of Shoe Ownership
				</h3>
				<p className="my-4 text-center text-accent2 md:text-lg md:my-6">
					We utilize AI and cutting-edge blockchain technology to ensure secure
					ownership of listed shoes.
				</p>
				<div className="flex gap-x-4 mx-auto">
					<CustomButton
						text="Buy Shoes"
						link="/shoes"
						styles="text-white bg-primaryColor"
					/>
					<CustomButton 
						text="List Shoes" 
						link="/listshoes"
						styles="text-white bg-primaryColor" 
					/>
				</div>
			</div>
			<ShuffleGrid />
		</section>
	);
}
