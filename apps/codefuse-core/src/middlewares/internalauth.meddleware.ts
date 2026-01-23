import { env } from "@repo/env/server";
import { UnauthorizedError } from "@repo/errors";
import { NextFunction, Request, Response } from "express";

export const internalAuth = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers['x-internal-key'];

    if (!key || key !== env.INTERNAL_KEY) {
        throw new UnauthorizedError('Unauthorized Internal Request!');
    }

    next();
}