import Image from "next/image";
import ShuffleHero from "./components/ShuffleHero";
import DiscoverSection from "./components/DiscoverSection";
import RevolutionarySection from "./components/RevolutionarySection";
import FAQSection from "./components/FAQSection";

export default function Home() {
	return (
		<>
			<ShuffleHero />
			<DiscoverSection />
			<RevolutionarySection />
			<FAQSection />
		</>
	);
}
