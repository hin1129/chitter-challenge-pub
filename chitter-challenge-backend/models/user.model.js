import mongoose from 'mongoose'

// create schema, map to db document
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
    }
});

const UserDB = mongoose.model(`user`, userSchema);
// const UserDB = mongoose.model(`userdb`, userSchema);
export default UserDB;