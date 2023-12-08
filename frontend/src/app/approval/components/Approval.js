"use client";
import { IoSend } from "react-icons/io5";

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

				<div className=" relative rounded-lg mt-5">
					<div className="absolute flex justify-center items-center w-full h-full  rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10   shadow-lg ">
						Chat Feature Coming Soon
					</div>
					<div className="flex flex-col gap-2 mb-5">
						<div className="flex  p-4 max-w-[65%] text-white bg-gray-300 rounded">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
							libero asperiores! Error explicabo, officia possimus repudiandae
							eligendi illo modi dicta temporibus.
						</div>
						<p className="text-xsm">12:35</p>
					</div>
					<div className="flex flex-col gap-2 items-end mb-5">
						<div className="flex p-4 max-w-[65%] text-white bg-primaryColor rounded">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
							libero asperiores! Error explicabo, officia possimus repudiandae
							eligendi illo modi dicta temporibus.Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Placeat, libero asperiores! Error
							explicabo, officia possimus repudiandae eligendi illo modi dicta
							temporibus.
						</div>
						<p className="text-xsm">Seen 12:37</p>
					</div>
					<div className="flex flex-col gap-2 items-end mb-5">
						<div className="flex p-4 max-w-[65%] text-white bg-primaryColor rounded">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
							libero asperiores!
						</div>
						<p className="text-xsm">Seen 12:45</p>
					</div>
					<div className="flex flex-col gap-2 mb-5">
						<div className="flex  p-4 max-w-[65%] text-white bg-gray-300 rounded">
							Lorem ipsum dolor sit amet
						</div>
						<p className="text-xsm">Seen 12:45</p>
					</div>

					<div className="flex mt-10 p-4 items-center justify-between text-accent2 bg-gray-300/30 rounded">
						Lorem ipsum dolor sit amet
						<IoSend fill="#72b01d" />
					</div>
				</div>
			</div>
		</div>
	);
}
