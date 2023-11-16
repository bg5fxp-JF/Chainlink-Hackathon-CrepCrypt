"use client";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function FAQAccordion({ title, text }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="border rounded-lg overflow-hidden shadow-md w-full">
			<div
				className="cursor-pointer bg-gray-200 p-4 flex justify-between items-center"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="flex font-medium">{title}</span>
				<span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
			</div>

			<Collapse className="ReactCollapse--collapse" isOpened={isOpen}>
				<div className="p-4">
					<p className="mb-4">{text}</p>
				</div>
			</Collapse>
		</div>
	);
}
