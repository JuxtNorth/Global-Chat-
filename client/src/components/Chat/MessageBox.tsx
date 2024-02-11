import { useState, useRef, FC } from "react";
import SendIcon from "../../icons/Send";

const MessageBox: FC = ({ onSend }: (string) => void) => {
	const [value, setValue] = useState("");
	const inputRef = useRef(null);

	const handleClick = () => {
		onSend(value);
		setValue("");
		inputRef.current.focus();
	};

	return (
		<section className="flex h-20 gap-2 p-2">
			<input
				type="text"
				name="message"
				className="w-full rounded-full border-none bg-[#343847] pl-8 text-white caret-white focus:outline-none focus:ring focus:ring-blue-600"
				placeholder="Enter a message..."
				autocomplete="off"
				onChange={(event) => {
					setValue(event.currentTarget.value);
				}}
				value={value}
				ref={inputRef}
			/>
			<button
				className="flex items-center justify-center text-white text-2xl aspect-[1/1] rounded-full bg-blue-600"
				onClick={handleClick}
			>
				<SendIcon />
			</button>
		</section>
	);
}

export default MessageBox;