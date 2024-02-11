import { Server, Socket } from "socket.io";
import Message, { IMessage } from "../models/Message";
import authenticateSocketUser from "./auth";
import { parse } from "cookie";

export const initSocketListeners = (io: Server) => {
	io.on("connection", async (socket: Socket) => {
		const { cookie } = socket.request.headers;
		const { jwtToken } = parse(cookie || "");
		const user =
			await authenticateSocketUser(jwtToken);

		console.log("User Connected");

		io.emit("users-online", io.engine.clientsCount);

		if (!user) {
			socket.disconnect();
			console.error(
				"User disconnected due to invalid credentials"
			);
			return;
		}

		// Send last 16 Messages
		const messages = await Message.find({})
			.sort("-sentAt")
			.limit(16)
			.exec();

		socket.emit("message-list", messages.reverse());
		socket.emit("user-details", {
			username: user.username
		});

		socket.on("message", async (data: string) => {
			try {
				const dataObject = {
					content: data,
					sentBy: user.username,
					sentAt: Date.now()
				};
				const message = new Message(dataObject);
				await message.save();
				io.emit("message", dataObject);
			} catch (error) {
				console.error(error);
			}
		});

		socket.on("disconnect", () => {
			console.log("User disconnected");
			io.emit("users-online", io.engine.clientsCount);
		});
	});
};
