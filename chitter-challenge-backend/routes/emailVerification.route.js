import express from 'express'
export const router = express.Router()
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

router.get('/emailverification/:token', async (request, response) => {
    const { token } = request.params;

    try {
        const decoded = jwt.verify(token, 'EMAIL-VERIFICATION-SECRET');
        const userID = decoded.userID
        // find user
        const user = await User.findById(userID)
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        // mark user as verified
        user.isEmailVerified = true
        user.emailVerificationToken = undefined
        await user.save()

        response.json({ message: 'Email verification successful' })
    }
    // this is being displayed after clicking on email verification link, on emailverification.jsx
    catch (error) {
        response.status(400).json({ error: 'invalid or token expired' })
    }
})