import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
	try {
		const uri = <string>process.env.MONGO_URI;
		await mongoose.connect(uri);
		console.log("Successfully connected to mongodb");
	} catch (error) {
		console.error("Failed connecting to mongodb", error);
	}
};
