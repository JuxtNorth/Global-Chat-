import { useEffect, useRef, FC } from "react";

interface MessageProps {
	sentBy: string;
	selfUsername: string;
	content: string;
}

const Message: FC = ({
	sentBy,
	selfUsername,
	content
}: MessageProps) => {
	return (
		<div
			className={`${
				sentBy === selfUsername
					? "self-end"
					: "self-start"
			}`}
		>
			<p
				className={`text-white ${
					sentBy === selfUsername
						? "text-right"
						: "text-left"
				}`}
			>
				{sentBy}
			</p>
			<div
				className={`h-fit max-w-64 p-4 bg-rose-600 rounded-2xl`}
			>
				<p>{content}</p>
			</div>
		</div>
	);
};

interface MessageListProps {
	messages: Array<MessageProps>;
	username: string;
}

const MessageList: FC = ({
	messages,
	username
}: MessageListProps) => {
	const dummyMessageRef = useRef(null);

	useEffect(() => {
		dummyMessageRef.current?.scrollIntoView({
			behavior: "smooth"
		});
	}, [messages]);

	return (
		<div className="overflow-y-scroll">
			<div className="flex flex-col justify-end gap-4 px-4 pb-2">
				{messages.map((message, index) => (
					<Message
						key={index}
						selfUsername={username}
						{...message}
					/>
				))}
				<div ref={dummyMessageRef}></div>
			</div>
		</div>
	);
};

export default MessageList;
