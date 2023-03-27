import express from 'express'
export const router = express.Router()
import User from '../models/user.model.js'



router.post('/signIn', (request, response) => {
    User.find()
        .then((user) => {
            response.status(200).json(user);
        })
        .catch((error) => {
            response.status(400).json('error: ' + error)
        })
})


// router.post('/signIn', async (request, response) => {
//     // const username = request.body.username;
//     // const password = request.body.password;
//     const { username, password } = request.body
//     try {
//         const user = await User.findOne({ username: username }).exec()
//         if (user) {
//             const token = user.generateToken({ username })
//             return (response.status(200).json({ token }))
//         }
//         else { send("input error") }
//     }
//     catch (error) {
//         response.json('error: ' + error)
//     }
// })