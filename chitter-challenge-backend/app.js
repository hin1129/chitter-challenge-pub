import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

// routes
import { router as comment } from './routes/comment.route.js'
import { router as signUp } from './routes/signUp.route.js'
import { router as signIn } from './routes/signIn.route.js'

// server/env setup
dotenv.config()
const app = express();
const port = process.env.PORT
const host = process.env.HOST;

// connect to DB
const main = async () => {
    try {
        console.log(`DB at: ${process.env.DB_URI}`)
        await mongoose.connect(process.env.DB_URI)
    }
    catch (error) { console.log(error) }
}
main().catch(error => { console.log(error) })

// express middleware to enable CORS, deal with CORS issues
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use(`/`, comment);
app.use(`/`, signUp);
app.use(`/`, signIn);

// run server
const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server connection - successful`);
    console.log(`Server running on http://${SERVERHOST}:${SERVERPORT}`);
});