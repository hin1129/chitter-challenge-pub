import express from 'express'
export const router = express.Router()
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


// // v1
// router.post('/signIn', (request, response) => {
//     // User.find()
//     //     .then((user) => {
//     //         response.status(200).json(user);
//     //     })
//     //     .catch((error) => {
//     //         response.status(400).json('error: ' + error)
//     //     })
//     const email = request.body.email;
//     const password = request.body.password;
//     User.findOne({email})
//         .then((user) => {
//             response.status(200).json(user);
//         })
//         .catch((error) => {
//             response.status(400).json('error: ' + error)
//         })
// })

// v2
router.post("/signIn", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    // check if email exists
    User.findOne({ email })
        // if exists
        .then((user) => {
            // compare password entered and hashed password
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
                    );

                    // successful
                    response.status(200).send({
                        message: "login successful",
                        email: user.email,
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