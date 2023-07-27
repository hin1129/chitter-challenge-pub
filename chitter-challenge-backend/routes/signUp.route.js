import express from 'express'
export const router = express.Router()
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

router.post('/signup', (request, response) => {
    const fullName = request.body.fullName;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    // apply hash
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            const newUser = new User({
                fullName,
                username,
                email,
                password: hashedPassword
            });

            newUser.save()
                .then(() => response.json('user added'))
                .catch(error => response.status(400).json('error: ' + error));
        });
})