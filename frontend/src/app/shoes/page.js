import Shoes from "./components/Shoes";
export const metadata = {
	title: "CrepCrypt | Buy Shoes",
	description:
		"A decentralized marketplace that utilizes AI and cutting-edge blockchain technology to ensure secure ownership of listed shoes.",
};

export default function page() {
	return (
		<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div>
				<span className="block mb-4 text-xsm font-medium text-primaryColor md:text-sm">
					Discover
				</span>
				<h3 className="text-4xl font-semibold  md:text-6xl">Shoes</h3>
				<p className="font-light text-reg text-accent2">
					Find the perfect pair of shoes with our comprehensive listing of shoe
					NFTs for sale. Use our filters to search by brand, size, color, and
					price.
				</p>
			</div>
			<div className="flex justify-end">
				<div className="flex gap-x-4">
					<select
						id="brands"
						className="block w-full border p-2.5 text-sm bg-gray-200 rounded-lg shadow-md"
					>
						<option disabled selected defaultValue="all">
							Brands
						</option>
						<option defaultValue="all">All</option>
						<option value="J">Jordans</option>
						<option value="A">Addidas</option>
						<option value="G">Gucci</option>
						<option value="B">Balenciaga</option>
					</select>
					<select
						id="sizes"
						className="block w-full border p-2.5 text-sm bg-gray-200 rounded-lg shadow-md"
					>
						<option disabled selected defaultValue="all">
							Sizes
						</option>
						<option defaultValue="all">All</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
					</select>
					<select
						id="prices"
						className="block w-full border p-2.5 text-sm bg-gray-200 rounded-lg shadow-md"
					>
						<option disabled selected defaultValue="all">
							Prices
						</option>
						<option defaultValue="all">All</option>
						<option value="5">Under 100</option>
						<option value="6">100 - 200</option>
						<option value="7">200 - 300</option>
						<option value="8">300 +</option>
					</select>
				</div>
			</div>
			<Shoes />
		</div>
	);
}
