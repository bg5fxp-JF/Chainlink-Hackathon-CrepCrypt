import CustomButton from "./CustomButton";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className="w-full  absolute z-10">
			<nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
				<div class="flex gap-x-10 items-center justify-between">
					<Link href="/" className="text-2xl font-bold">
						CrepCrypt
					</Link>
					<div class="flex gap-x-5 text-accent2">
						<Link href="/" className="text-reg">
							Buy Shoes
						</Link>
						<Link href="/" className="text-reg ">
							List Shoes
						</Link>
					</div>
				</div>

				<CustomButton
					text="Connect Wallet"
					styles="text-white bg-primaryColor"
				/>
			</nav>
		</header>
	);
}
