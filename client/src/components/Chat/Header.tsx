import { FC } from "react";

const OnlineUsersCount = ({
	count
}: {
	count: number;
}) => {
	return (
		<p className="text-gray-100 flex items-center gap-2 text-sm font-bold font-mono">
			<span className="block rounded-full h-3 w-3 bg-green-400" />
			{count ?? 0}{" "}
			{count === 1 ? "person " : "people "}
			online
		</p>
	);
};

const Header: FC = ({
	onlineUsersCount
}: {
	onlineUsersCount: number;
}) => {
	return (
		<header className="rounded-b-3xl bg-[#343847] flex flex-col justify-center pl-6 py-3">
			<h1 className="text-white text-2xl">
				Global Chat
			</h1>
			<OnlineUsersCount count={onlineUsersCount} />
		</header>
	);
};

export default Header;