export default function Footer() {
	return (
		<footer className="flex flex-col text-black-100  mt-5 ">
			<hr className="bg-accent2 h-[1px] border-0 sm:mx-16 mx-6  " />
			<div className="flex justify-between items-center flex-wrap  sm:px-16 px-6 py-10 space-y-5 md:space-y-0">
				<p className="text-[#596780]">
					{" "}
					&copy; CrepCrypt {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
