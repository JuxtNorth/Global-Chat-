import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

interface FormData {
	displayName: string;
	username: string;
	email: string;
	password: string;
}

async function handleSignup(details: FormData) {
	const url = "http://localhost:3000/auth/signup";
	console.log(details);
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
		console.error("Error creating user", error);
	}
}

export default function Signup() {
	const [displayName, setDisplayName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="h-dvh w-screen grid place-items-center">
			<form
				className="bg-gray-800 p-4 flex flex-col items-center gap-2 max-w-[360px] w-full rounded-xl"
				autoComplete="on"
			>
				<Input
					type="text"
					onChange={(e) => setDisplayName(e.value)}
					placeholder="John Doe"
					id="full_name"
					label="Full Name"
					name="fullname"
				/>
				<Input
					type="text"
					onChange={(e) => setUsername(e.value)}
					placeholder="johndoe1"
					id="user_name"
					label="Username"
					name="username"
				/>
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
					onClick={() =>
						handleSignup({
							displayName,
							username,
							email,
							password,
						})
					}
				>
					Submit
				</button>
				<p className="text-white text-sm">
					Already have an account?&nbsp;
					<Link to="/signin" unstable_viewTransition>
						Sign in.
					</Link>
				</p>
			</form>
		</div>
	);
}
