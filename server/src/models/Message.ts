import { Schema, model } from "mongoose";

export interface IMessage {
	content: string;
	sentBy: String;
	sentAt: Date;
}

const messageSchema = new Schema<IMessage>({
	content: {
		type: String,
		required: true
	},
	sentBy: {
		type: String,
		required: true
	},
	sentAt: {
		type: Date,
		required: true
	}
});

const Message = model<IMessage>("message", messageSchema);

export default Message;
