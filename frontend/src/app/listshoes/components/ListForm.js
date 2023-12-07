"use client";
import Image from "next/image";
import { useState } from "react";

export default function ListForm() {
	const [formData, setFormData] = useState({
		name: "",
		brand: "",
		size: "",
		price: "",
		description: "",
	});
	const [image, setImage] = useState(null); // New state for image
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		// console.log(formData);
		// formatFormData(formData);
	};

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const formatFormData = (formData) => {
		var stringObject = `Name: ${formData.name} | Brand: ${formData.brand} | Size: ${formData.size} | Description: ${formData.description}`;
		console.log(stringObject);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		formatFormData(formData);
		console.log(image);
	};

	return (
		<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div className="flex flex-col-reverse w-full mx-auto gap-4 md:flex-row md:justify-between">
				<div className="flex flex-col  gap-4 md:w-1/2 ">
					<span className="block text-xsm font-medium text-primaryColor md:text-sm">
						Sell
					</span>
					<div>
						<h2 className="text-4xl font-semibold  md:text-6xl">List Shoe</h2>
					</div>

					<form
						className="flex flex-col gap-y-4 items-center justify-center"
						onSubmit={handleSubmit}
					>
						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="text"
								name="name"
								placeholder="Enter Name of Shoe"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="text"
								name="brand"
								placeholder="Enter Brand of Shoe"
								value={formData.brand}
								onChange={handleChange}
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="file"
								name="image"
								onChange={handleImageChange}
								accept="image/*"
							/>
						</div>
						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="number"
								name="size"
								placeholder="Enter Size"
								min={1}
								value={formData.size}
								onChange={handleChange}
							/>
						</div>
						<div className="p-2 rounded shadow-md w-full">
							<input
								className="focus-visible:outline-none w-full"
								required
								type="number"
								name="price"
								placeholder="Enter Price"
								min={0}
								value={formData.price}
								onChange={handleChange}
							/>
						</div>

						<div className="p-2 rounded shadow-md w-full">
							<textarea
								className="focus-visible:outline-none w-full"
								required
								type="text"
								name="description"
								placeholder="Enter Description"
								rows={4}
								value={formData.description}
								onChange={handleChange}
							/>
						</div>
						{formSubmitted ? (
							<h1 className="text-2xl font-bold capitalize">
								{" "}
								{formData.name} Listed{" "}
							</h1>
						) : (
							<button
								className="text-reg flex w-full  px-4 py-2 rounded-full transition-all active:scale-95  justify-center text-white mt-4 bg-primaryColor"
								type="submit"
							>
								Submit Shoes
							</button>
						)}
					</form>
				</div>

				{image ? (
					<div className="flex items-center">
						<Image
							src={URL.createObjectURL(image)}
							width={500}
							height={500}
							className="object-contain rounded-lg mx-auto md:mx-0 "
							alt={formData.name}
							priority={true}
						/>
					</div>
				) : (
					<div className="flex items-center justify-center w-full  md:w-1/2 rounded-lg bg-slate-100">
						No Image Selected
					</div>
				)}
			</div>
		</div>
	);
}
