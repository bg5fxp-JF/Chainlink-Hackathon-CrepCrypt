export default function Footer() {
	return (
		<footer className="flex flex-col mt-5 text-black-100 ">
			<hr className="h-[1px] border-0 mx-6 bg-accent2 sm:mx-16  " />
			<div className="flex flex-wrap justify-between items-center space-y-5 px-6 py-10  sm:px-16 md:space-y-0">
				<p className="text-accent2 font-light">
					{" "}
					&copy; CrepCrypt {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
