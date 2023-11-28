import { ShoeDummyData } from "../constants/constants";
import ShoeCard from "./ShoeCard";
import CustomLinkButton from "./CustomLinkButton";

export default function DiscoverSection() {
	return (
		<section className="w-full max-w-[1440px] mx-auto px-6 pt-24 pb-12 sm:px-16  ">
			<span className="block mx-auto mb-4 text-center text-sm font-medium text-primaryColor ">
				Discover
			</span>
			<h3 className="mx-auto text-center text-4xl font-semibold md:text-6xl">
				Shoes
			</h3>

			<div className="grid justify-between gap-5 grid-cols-1 pb-12 sm:grid-cols-2 md:grid-cols-4 ">
				{ShoeDummyData.slice(0, 4).map(({ id, img, title, price }) => {
					return (
						<ShoeCard key={id} id={id} img={img} title={title} price={price} />
					);
				})}
			</div>
			<div className="flex mx-auto">
				<CustomLinkButton
					text="View All"
					link="/shoes"
					styles="mx-auto text-white bg-primaryColor"
				/>
			</div>
		</section>
	);
}
