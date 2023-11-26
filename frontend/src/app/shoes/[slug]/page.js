import { ShoeDummyData } from "@/app/constants/constants";
import ShoeDetails from "./compponents/ShoeDetails";

export async function generateMetadata({ searchParams }) {
	// read route params
	const id = searchParams.id;

	const shoeData = ShoeDummyData.find((item) => item.id == id);

	return {
		title: `CrepCrypt | ${shoeData.title}`,
		description: shoeData.title,
	};
}

export default function page() {
	return <ShoeDetails />;
}
