import { useState, useEffect } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";

import { io } from "socket.io-client";

interface IMessage {
	content: string;
	sentBy: string;
}

const url = "ws://localhost:3000";
const socket = io(url, {
	withCredentials: true,
});

export default function Chat() {
	const [username, setUsername] = useState("");
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [onlineUsersCount, setOnlineUsersCount] = useState(0);

	useEffect(() => {
		socket.on("user-details", (details) => {
			setUsername(details.username);
		});

		socket.on("message-list", (data) => {
			setMessages(data);
		});

		socket.on("message", (message) => {
			setMessages([...messages, message]);
		});

		socket.on("users-online", (count) => {
			setOnlineUsersCount(count);
		});
	}, [socket, messages]);

	const handleSend = (value) => {
		socket.emit("message", value);
	};

	return (
		<main className="h-dvh bg-[#1d1d2e] grid grid-rows-[auto_1fr_auto]">
			<Header onlineUsersCount={onlineUsersCount} />
			<MessageList messages={messages} username={username} />
			<MessageBox onSend={handleSend} />
		</main>
	);
}
