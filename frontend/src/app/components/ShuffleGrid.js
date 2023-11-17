"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { squareData } from "../constants/constants";

function shuffle(array) {
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
}

function generateSquares() {
	return shuffle(squareData).map((sq) => (
		<motion.div
			key={sq.id}
			layout
			transition={{ duration: 1.5, type: "spring" }}
			className="w-full h-full rounded-md shadow-2xl relative "
			style={{
				backgroundImage: `url(${sq.src})`,
				backgroundSize: "cover",
			}}
		>
			<div className=" absolute bottom-6  left-1/2 transform -translate-x-1/2 min-w-[50%] ">
				<div className=" text-reg mx-auto flex items-center justify-center px-4 py-2  rounded-full border border-primaryColor bg-white bg-opacity-70 text-primaryColor font-bold">
					Buy
				</div>
			</div>
		</motion.div>
	));
}

export default function ShuffleGrid() {
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
		<div className=" w-full grid grid-cols-2 grid-rows-6 md:grid-cols-4 md:grid-rows-4 min-h-[800px] gap-5">
			{squares.map((sq) => sq)}
		</div>
	);
}
