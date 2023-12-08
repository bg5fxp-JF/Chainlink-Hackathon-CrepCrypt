"use client";

export default function Approval() {
	return (
		<div className="flex flex-col w-full max-w-[1440px] min-h-screen gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<div>
				<span className="block mb-4 text-xsm font-medium text-primaryColor md:text-sm">
					Approve
				</span>

				<h2 className="text-4xl font-semibold  md:text-6xl">Approval</h2>
			</div>
			<div className="justify-center content-center">
				<button
					className="text-reg flex px-8 py-3 rounded-full transition-all active:scale-95  justify-center text-white mt-4 bg-primaryColor"
					type="button"
				>
					Approve Sale
				</button>
				<button
					className="text-reg flex px-8 py-3 rounded-full transition-all active:scale-95  justify-center text-white mt-4 bg-primaryColor"
					type="button"
				>
					Dissaprove Sale
				</button>
				<br></br>
				<button
					type="button"
					className="px-8 py-3 text-white bg-gray-300 rounded-full focus:outline-none"
					disabled
				>
					Chat Feature Coming Soon
				</button>
			</div>
		</div>
	);
}
