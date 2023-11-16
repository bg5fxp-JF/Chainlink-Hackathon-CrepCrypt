import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
	title: "CrepCrypt",
	description:
		"A decentralized marketplace that utilizes AI and cutting-edge blockchain technology to ensure secure ownership of listed shoes.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />

				{children}
				<Footer />
			</body>
		</html>
	);
}
