"use client";
import { useState } from 'react'

export default function ListForm() {

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        picture: ''
    })
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
        formatFormData(formData)
    }

    const formatFormData = (formData) => {
        var stringObject = `${formData.name} ${formData.price} ${formData.description}`
        console.log(stringObject)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true);
    }



    return (
        <div>
            <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
            >
                <label className="text-xl font-bold">Name of Shoe</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label className="text-xl font-bold">Price of Shoe</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="number"
                    name="price"
                    placeholder="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <label className="text-xl font-bold">Pictures</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="file"
                    alt="Select pictures"
                    name="image"
                    multiple
                    value={formData.picture}
                    onChange={handleChange}
                />
                <label className="text-xl font-bold">Description</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="text"
                    name="description"
                    placeholder="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {formSubmitted ?
                    <h1 className="text-2xl font-bold"> Shoe Listed </h1>
                    : <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-3 rounded"
                        type="submit"
                    >
                        Submit Shoes
				</button>}
            </form>
        </div>
    );
}
