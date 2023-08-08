import express from 'express'
export const router = express.Router()
import { body, validationResult } from 'express-validator'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// non-email verification
// router.post("/signIn", (request, response) => {
//     const email = request.body.email;
//     const password = request.body.password;
//     const username = request.body.username;

//     // check if email exists
//     User.findOne({ email })
//         // if email exists
//         .then((user) => {
//             // compare password entered to hashed password
//             bcrypt.compare(password, user.password)
//                 // check passwords
//                 .then((passwordCheck) => {

//                     // check if passwords match
//                     if (!passwordCheck) {
//                         return response.status(400).send({
//                             message: "Passwords does not match",
//                             error
//                         });
//                     }

//                     // create token
//                     const token = jwt.sign(
//                         { userId: user._id, userEmail: user.email, },
//                         "RANDOM-TOKEN",
//                         { expiresIn: "24h" }
//                         // { expiresIn: "10s" }
//                     );

//                     // successful, response.data array in browser console
//                     response.status(200).send({
//                         message: "login successful",
//                         email: user.email,
//                         username: user.username,
//                         token // should not be displayed in browser console
//                     });
//                 })
//                 // if password not match
//                 .catch((error) => {
//                     response.status(400).send({
//                         message: "passwords not match",
//                         error
//                     });
//                 });
//         })

//         // if email not exist
//         .catch((error) => {
//             response.status(404).send({
//                 message: "email not exist",
//                 error
//             });
//         });
// });


// email verification
router.post("/signIn", (request, response) => {
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

                    // create token
                    const token = jwt.sign(
                        { userId: user._id, userEmail: user.email, },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                        // { expiresIn: "10s" }
                    );

                    // successful, response.data array in browser console
                    response.status(200).send({
                        message: "login successful",
                        email: user.email,
                        username: user.username,
                        token // should not be displayed in browser console
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
