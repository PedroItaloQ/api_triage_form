import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-erros";
import { User } from "../entities/User";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Token não fornecido");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded as Partial<User>;
            next();
        } else {
            throw new UnauthorizedError("Token inválido");
        }
    } catch (error) {
        throw new UnauthorizedError("Token inválido");
    }
};
