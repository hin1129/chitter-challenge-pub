import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Access denied. Token missing.' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) { return res.status(403).json({ message: 'Invalid token' }); }

        req.user = decoded;
        next(); // move to next middleware
    });
};