import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function (value) {
        //         return isEmail(value);
        //     },
        //     message: 'email not valid'
        // }
    },
    password: {
        type: String,
        required: true,
    },
    // email verification
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String
});

const UserDB = mongoose.model(`user1`, userSchema);
export default UserDB;