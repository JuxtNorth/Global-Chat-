import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createRoutesFromElements,
	createBrowserRouter,
	RouterProvider,
	Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Chat from "./components/Chat";

const routes = createRoutesFromElements(
	<>
		<Route path="/" element={<Chat />} />
		<Route path="signin/" element={<Signin />} />
		<Route path="signup/" element={<Signup />} />
	</>,
);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
