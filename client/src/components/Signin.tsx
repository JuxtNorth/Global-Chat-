import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

interface FormData {
	email: string;
	password: string;
}

async function handleSignin(details: FormData) {
	const url = "http://localhost:3000/auth/signin";
	try {
		const response = await fetch(url, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "true",
			},
		});
		const result = await response.json();
		if (result.status === "Success") {
			window.location.replace("/");
		}
	} catch (error) {
		alert("Sign In failed");
		console.error(error);
	}
}

export default function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="h-dvh w-screen grid place-items-center">
			<form
				className="bg-gray-800 p-4 flex flex-col gap-2 max-w-[360px] w-full rounded-xl items-center"
				autoComplete="on"
			>
				<Input
					type="email"
					onChange={(e) => setEmail(e.value)}
					placeholder="email@example.com"
					id="email"
					label="Email"
					name="email"
				/>
				<Input
					type="password"
					onChange={(e) => setPassword(e.value)}
					placeholder="Enter a strong password"
					id="password"
					label="Password"
					name="password"
				/>
				<button
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={() => handleSignin({ email, password })}
				>
					Submit
				</button>
				<p className="text-white text-sm">
					Dont have an account?&nbsp;
					<Link to="/signup" unstable_viewTransition>
						Sign up.
					</Link>
				</p>
			</form>
		</div>
	);
}
