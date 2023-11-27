
export default function ListForm() {
    
    const submtForm = (e) => {
        // e.preventDefault()
        console.log('submit form ran')
    }
     
    return (
        <div>
            <form className="flex flex-col items-center justify-center" onSubmit={console.log('submit form ran')}>
                <label className="text-xl font-bold">Name of Shoe</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="text"
                    name="name"
                />
                <label className="text-xl font-bold">Price of Shoe</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="number"
                    name="price"
                />
                <label className="text-xl font-bold">Pictures</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="image"
                    alt="Select pictures"
                    name="image"
                />
                <label className="text-xl font-bold">Description</label>
                <input
                    className="border-2 border-gray-400 rounded-lg p-2 m-2"
                    type="text"
                    name="description"
                />
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 m-3 rounded"
                    type="submit"
                >
                    Submit Shoes
                </button>
            </form>
        </div>
    )
}