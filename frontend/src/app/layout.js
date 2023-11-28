import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Providers } from "./wagmiproviders";

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
