import { Providers } from "./WagmiProviders";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Navbar />

					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
