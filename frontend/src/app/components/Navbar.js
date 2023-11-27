"use client";
import { AnimatePresence, motion } from "framer-motion";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

import { useState } from "react";

export default function Navbar() {
	const variants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
		},
	};

	const [isOpen, toggleOpen] = useState(false);

	return (
		<header className="w-full absolute z-10">
			<nav className="flex justify-between items-center max-w-[1440px] mx-auto px-6 py-4 bg-transparent sm:px-16">
				<div className="flex gap-x-10 items-center justify-between ">
					<Link href="/" className="text-2xl font-bold">
						CrepCrypt
					</Link>

					<div className="hidden gap-x-5 text-accent2 md:flex">
						<Link href="/shoes" className="text-reg">
							Buy Shoes
						</Link>
						<Link href="/listshoes" className="text-reg ">
							List Shoes
						</Link>
					</div>
				</div>
				<FiMenu
					onClick={() => toggleOpen(!isOpen)}
					size={20}
					className={`flex  md:hidden cursor-pointer ${isOpen ? "hidden" : ""}`}
				/>
				<FiX
					size={20}
					onClick={() => toggleOpen(!isOpen)}
					className={`flex md:hidden cursor-pointer ${isOpen ? "" : "hidden"}`}
				/>
				<CustomButton
					text="Connect Wallet"
					styles="hidden text-white bg-primaryColor  md:flex"
				/>
			</nav>
			<AnimatePresence mode="wait">
				<motion.div
					initial="hidden"
					animate={isOpen ? "show" : "hidden"}
					exit="hidden"
					variants={variants}
				>
					<div
						id="menu"
						className="absolute flex flex-col items-center self-end left-6 right-6 z-40 space-y-6 py-8 bg-white drop-shadow  sm:w-auto sm:self-center"
					>
						<Link href="/shoes" className="text-reg">
							Buy Shoes
						</Link>
						<Link href="/listshoes" className="text-reg ">
							List Shoes
						</Link>
						<CustomButton
							text="Connect Wallet"
							styles="flex text-white bg-primaryColor md:hidden "
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		</header>
	);
}
