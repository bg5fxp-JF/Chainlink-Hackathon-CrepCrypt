import Link from "next/link";

export default function CustomButton({ text, styles, link }) {
	return (
		<Link
			href={link || "/"}
			className={`text-xsm sm:text-sm md:text-reg flex  px-4 py-2 rounded-full transition-all active:scale-95 ${styles} `}
		>
			{text}
		</Link>
	);
}
