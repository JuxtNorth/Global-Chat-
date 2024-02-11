import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const asyncErrorHandler = (
	callback: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		callback(req, res, next).catch((error) => {
			next(createHttpError(400, error.message));
		});
	};
};

export default asyncErrorHandler;
