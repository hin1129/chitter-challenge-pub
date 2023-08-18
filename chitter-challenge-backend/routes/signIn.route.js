import express from 'express'
export const router = express.Router()
import { body, validationResult } from 'express-validator'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

router.post("/signIn", [
    body('email').isEmail().withMessage('invalid email').normalizeEmail(),
    body('password').notEmpty().withMessage('password is required'),
], (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return (response.status(400).json({ errors: errors.array() }))
    }

    const email = request.body.email;
    const password = request.body.password;
    const username = request.body.username;

    // check if email exists
    User.findOne({ email })
        // if email exists
        .then(async (user) => {

            // check if email is verified
            if (!user.isEmailVerified) {
                return response.status(400).send(
                    { message: "email not verified", }
                );
            }

            // compare password entered to hashed password
            bcrypt.compare(password, user.password)
                // check passwords
                .then((passwordCheck) => {

                    // check if passwords match
                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: "Passwords does not match",
                            error
                        });
                    }

                    // create token with user id and email
                    const token = jwt.sign(
                        { userId: user._id, userEmail: user.email, },
                        process.env.JWT_SECRET_KEY,
                        // { expiresIn: "1h" }
                        { expiresIn: "5s" }
                    );

                    // response.header('Authorization', `Bearer ${token}`)

                    // response.cookie('Token', token, {
                    //     httpOnly: true,
                    // })

                    // successful, response.data array in browser console
                    response.status(200).send({
                        message: "login successful",
                        // email: user.email,
                        username: user.username, // used in localStorage (edit/delete)
                        token
                    });
                })
                // if password not match
                .catch((error) => {
                    response.status(400).send({
                        message: "passwords not match",
                        error
                    });
                });
        })

        // if email not exist
        .catch((error) => {
            response.status(404).send({
                message: "email not exist",
                error
            });
        });
});

// bearer = standard HTTP authentication scheme
// Authorization: Bearer [header].[payload].[signature]
// x-access-token = not standard HTTP authentication scheme
// x-access-token: [header].[payload].[signature]
// Cookies = automatically included in every request, bound to specific domain/path, HttpOnly/Secure flags enhance security
// [name] = [header].[payload].[signature]; Path=/; HttpOnly;