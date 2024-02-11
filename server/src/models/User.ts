import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
	displayName: string;
	username: string;
	photoURL?: string;
	email: string;
	password?: string;
	chats?: Array<Schema.Types.ObjectId>;
}

const userSchema = new Schema<IUser>({
	displayName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	photoURL: String,
	email: {
		type: String,
		validate: {
			validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
			message: ({ value }) => `${value} is not a valid email`,
		},
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	chats: [Schema.Types.ObjectId],
});

const User = model<IUser>("user", userSchema);

export default User;
