"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import { squareData } from "../constants/constants";

const ShuffleHero = () => {
	return (
		<section className="w-full sm:px-16 px-6 pt-36 pb-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[1440px] mx-auto">
			<div>
				<span className="block mb-4 text-xs md:text-sm text-primaryColor font-medium">
					The Future of Shoe Ownership
				</span>
				<h3 className="text-4xl md:text-6xl font-semibold">
					Use the Power of Blockchain Technology in Securing Your Shoes
				</h3>
				<p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
					Our decentralized marketplace utilizes cutting-edge blockchain
					technology to ensure secure ownership of listed shoes. With the use of
					NFTs, each pair of shoes is uniquely tracked and authenticated,
					providing a transparent and trustworthy platform for buyers and
					sellers.
				</p>
				<div className="flex gap-x-4">
					<CustomButton text="Buy Shoes" styles="text-white bg-primaryColor" />
					<CustomButton text="List Shoes" styles="text-white bg-primaryColor" />
				</div>
			</div>
			<ShuffleGrid />
		</section>
	);
};

const shuffle = (array) => {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

const generateSquares = () => {
	return shuffle(squareData).map((sq) => (
		<motion.div
			key={sq.id}
			layout
			transition={{ duration: 1.5, type: "spring" }}
			className="w-full h-full rounded-md"
			style={{
				backgroundImage: `url(${sq.src})`,
				backgroundSize: "cover",
			}}
		></motion.div>
	));
};

const ShuffleGrid = () => {
	const timeoutRef = useRef(null);
	const [squares, setSquares] = useState(generateSquares());

	useEffect(() => {
		shuffleSquares();

		return () => clearTimeout(timeoutRef.current);
	}, []);

	const shuffleSquares = () => {
		setSquares(generateSquares());

		timeoutRef.current = setTimeout(shuffleSquares, 3000);
	};

	return (
		<div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
			{squares.map((sq) => sq)}
		</div>
	);
};

export default ShuffleHero;
