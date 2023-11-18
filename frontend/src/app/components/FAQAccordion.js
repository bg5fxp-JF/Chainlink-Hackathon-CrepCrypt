"use client";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function FAQAccordion({ title, text }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="w-full overflow-hidden border rounded-lg shadow-md">
			<div
				className="flex justify-between items-center p-4 bg-gray-200 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="font-medium">{title}</span>
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
