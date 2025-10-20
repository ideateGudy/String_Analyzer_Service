import type { Request, Response, NextFunction } from "express";
import { customApiError } from "../utils/apiError.ts";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    const environment = process.env.NODE_ENV || "production";

    if (err instanceof customApiError) {
        res.status(statusCode).json({
            status: "error",
            message,
            stack: environment === "development" ? err.stack : undefined,
        });
        return;
    }

    res.status(statusCode || 500).json({
        code: err.code,
        status: "error",
        message : message || "Internal Server Error",
        stack: environment === "development" ? err.stack : undefined,
    });
};
