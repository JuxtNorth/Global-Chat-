import dotenv from "dotenv";
import express, {
	Express,
	Request,
	Response
} from "express";
import { connectDB } from "./utils/db";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth from "./routes/auth";
import authenticate from "./middleware/authenticate";
import { initSocket } from "./services/socket";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173"
	})
);
app.use(express.json());

app.use("/auth", auth);

connectDB()
	.then(() => {
		const server = initSocket(app);
		server.listen(port);
		console.log("Listening to port: 3000")
	})
	.catch(console.log);