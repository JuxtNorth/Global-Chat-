import http from 'http';
import { Express } from 'express';
import { Server } from 'socket.io';
import { initSocketListeners } from './chat';

export const initSocket = (app: Express) => {
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:5173',
			credentials: true
		},
	});
	initSocketListeners(io);
	io.listen(server);
	return server;
};