import ShoeCard from "../components/ShoeCard";
import { ShoeDummyData } from "../constants/constants";

export default function page() {
	return (
		<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div>
				<span className="block mb-4 text-xs font-medium text-primaryColor md:text-sm">
					Discover
				</span>
				<h3 className="text-4xl font-semibold  md:text-6xl">Shoes</h3>
				<p className="font-light text-reg text-accent2">
					Find the perfect pair of shoes with our comprehensive listing of shoe
					NFTs for sale. Use our filters to search by brand, size, color, and
					price.
				</p>
			</div>
			<div className="grid justify-between gap-5 grid-cols-1  md:grid-cols-3 xl:grid-cols-4">
				{ShoeDummyData.map(({ id, img, title, price }) => {
					return <ShoeCard key={id} img={img} title={title} price={price} />;
				})}
			</div>
		</div>
	);
}
