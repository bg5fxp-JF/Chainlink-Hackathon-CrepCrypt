import ListForm from "./components/ListForm";

export const metadata = {
	title: "CrepCrypt | List Shoes",
	description:
		"A decentralized marketplace that utilizes AI and cutting-edge blockchain technology to ensure secure ownership of listed shoes.",
};

export default function page() {
	return (
		<div>
			<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
				<h2 className="capitalize">List Shoe</h2>
			</div>
			<ListForm/>
		</div>
		
	);
}
