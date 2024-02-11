import { useState } from "react";

function Label({ htmlFor, label }) {
	return (
		<label
			htmlFor={htmlFor}
			className="block mb-2 text-sm font-medium text-gray-900 text-white"
		>
			{label}
		</label>
	);
}

export default function Input({
	type,
	placeholder,
	id,
	name,
	onChange,
	label,
}) {
	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
		if (onChange) onChange({ value: event.target.value });
	};

	return (
		<div className="w-full">
			{label && <Label label={label} htmlFor={id} />}
			<input
				placeholder={placeholder}
				id={id}
				name={name}
				onChange={handleChange}
				className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}
