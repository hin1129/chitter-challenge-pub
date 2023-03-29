import express from 'express'
export const router = express.Router()
import Comment from '../models/comment.model.js'

router.get(`/`, (request, response) => {
    Comment.find()
        .then((comment) => {
            response.status(200).json(comment);
        })
        .catch((error) => {
            response.status(400).json('error: ' + error)
        })
})

router.post('/postcomment', (request, response) => {
    const traineeName = request.body.traineeName;
    const commentDescription = request.body.commentDescription;
    const date = request.body.date;

    const newComment = new Comment({
        traineeName,
        commentDescription,
        date,
    });

    newComment.save()
        .then(() => response.json('comment added'))
        .catch(error => response.status(400).json('error: ' + error));
});