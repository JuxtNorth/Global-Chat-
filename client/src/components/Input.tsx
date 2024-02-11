import { useState, FC } from "react";

interface LabelProps {
	htmlFor?: string;
	label?: string;
}

const Label: FC = ({
	htmlFor,
	label
}: LabelProps) => {
	return (
		<label
			htmlFor={htmlFor}
			className="block mb-2 text-sm font-medium text-gray-900 text-white"
		>
			{label}
		</label>
	);
};

interface InputProps {
	type?: string;
	placeholder?: string;
	id?: string;
	name?: string;
	onChange?: (string) => void;
	label?: string;
}

const Input: FC = ({
	type,
	placeholder,
	id,
	name,
	onChange,
	label
}: InputProps) => {
	const [value, setValue] = useState("");

	const handleChange = event => {
		setValue(event.target.value);
		if (onChange)
			onChange({ value: event.target.value });
	};

	return (
		<div className="w-full">
			{label && <Label label={label} htmlFor={id} />}
			<input
				placeholder={placeholder}
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={handleChange}
				className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
};

export default Input;
