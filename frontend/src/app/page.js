import ShuffleHero from "./components/ShuffleHero";
import DiscoverSection from "./components/DiscoverSection";
import RevolutionarySection from "./components/RevolutionarySection";
import FAQSection from "./components/FAQSection";

export const metadata = {
	title: "CrepCrypt",
	description:
		"A decentralized marketplace that utilizes AI and cutting-edge blockchain technology to ensure secure ownership of listed shoes.",
};

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
