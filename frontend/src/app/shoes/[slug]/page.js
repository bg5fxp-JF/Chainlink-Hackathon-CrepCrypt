export default function page({ params }) {
	const shoe = params.slug.replace(/%20/g, " ");
	return (
		<div className="flex flex-col w-full max-w-[1440px] gap-8 mx-auto px-6 pt-24 pb-12 sm:px-16">
			<h2 className="capitalize">{shoe}</h2>
		</div>
	);
}
