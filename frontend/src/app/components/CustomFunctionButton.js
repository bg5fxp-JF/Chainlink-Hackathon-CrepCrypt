export default function CustomFunctionButton({
	children,
	styles,
	handleClick,
}) {
	return (
		<button
			onClick={handleClick}
			className={`text-reg flex  px-4 py-2 rounded-full transition-all active:scale-95 ${styles} `}
		>
			{children}
		</button>
	);
}
