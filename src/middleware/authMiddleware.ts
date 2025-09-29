import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Customer from "../db/models/customers";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
    id: number;
}

export const protect = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            req.user = await Customer.findByPk(decoded.id);

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
