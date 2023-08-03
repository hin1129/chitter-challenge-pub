import express from 'express'
export const router = express.Router()
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

router.post('/signup', async (request, response) => {
    const fullName = request.body.fullName;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    try {
        const isEmailExist = await User.findOne({ email });
        const isUsernameExist = await User.findOne({ username });

        // if (isEmailExist && isUsernameExist) {
        //     return response.status(400).json({ error: 'Email and Username already exist' });
        // }

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
            password: hashedPassword
        });

        await newUser.save();
        response.json('user account added');
    }
    catch (error) {
        response.status(400).json('error: ' + error);
    }
});


// router.post('/signup', (request, response) => {
//     const fullName = request.body.fullName;
//     const username = request.body.username;
//     const email = request.body.email;
//     const password = request.body.password;

//     // apply hash
//     bcrypt.hash(password, 10)
//         .then((hashedPassword) => {
//             const newUser = new User({
//                 fullName,
//                 username,
//                 email,
//                 password: hashedPassword
//             });

//             newUser.save()
//                 .then(() => response.json('user added'))
//                 .catch(error => response.status(400).json('error: ' + error));
//         });
// })