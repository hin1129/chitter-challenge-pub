import express from 'express'
export const router = express.Router()
import { body, validationResult } from 'express-validator'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
// email verification
import jwt from 'jsonwebtoken'
import sendVerificationEmail from '../utils/sendVerificationEmail.js'

dotenv.config()

// non-verified email
// router.post('/signup', async (request, response) => {
//     const fullName = request.body.fullName;
//     const username = request.body.username;
//     const email = request.body.email;
//     const password = request.body.password;

//     try {
//         const isEmailExist = await User.findOne({ email });
//         const isUsernameExist = await User.findOne({ username });

//         if (isEmailExist) {
//             return response.status(400).json({ error: 'Email already exists' });
//         }

//         if (isUsernameExist) {
//             return response.status(400).json({ error: 'Username already exists' });
//         }

//         // apply hash
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             fullName,
//             username,
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();
//         response.json('user account added');
//     }
//     catch (error) {
//         response.status(400).json('error: ' + error);
//     }
// });


// email verification
router.post('/signup', async (request, response) => {
    const fullName = request.body.fullName;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    try {
        const isEmailExist = await User.findOne({ email });
        const isUsernameExist = await User.findOne({ username });

        if (isEmailExist) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        if (isUsernameExist) {
            return response.status(400).json({ error: 'Username already exists' });
        }

        // apply hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            isEmailVerified: false
        });

        // token for verification
        const verificationToken = jwt.sign(
            { userID: newUser._id },
            process.env.EMAIL_VERIFICATION_SECRET_KEY,
            { expiresIn: '1h' }, // expires in 24h
            // { expiresIn: '10' }, // expires in 10 secs
        );

        // assign to property
        newUser.emailVerificationToken = verificationToken;
        await newUser.save();

        sendVerificationEmail(email, verificationToken)
        response.json('user account added');
    }
    catch (error) {
        response.status(400).json('error: ' + error);
    }
});