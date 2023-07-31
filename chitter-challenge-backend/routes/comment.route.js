import express from 'express'
export const router = express.Router()
import Comment from '../models/comment.model.js'

// get all comments
router.get(`/`, (request, response) => {
    Comment.find()
        .then((comment) => {
            const reversedComment = comment.reverse()
            response.status(200).json(reversedComment);
            // response.status(200).json(comment);
        })
        .catch((error) => { response.status(400).json('error: ' + error) })
})

// post new comment
router.post('/postcomment', (request, response) => {
    const username = request.body.username;
    const commentDescription = request.body.commentDescription;
    const date = request.body.date;

    const newComment = new Comment({
        username,
        commentDescription,
        date,
    });

    newComment.save()
        .then(() => response.json('comment added'))
        .catch(error => response.status(400).json('error: ' + error));
});

// delete comments, based on id
router.delete('/comment', async (request, response) => {
    try {
        const commendID = request.body.id;
        await Comment.findByIdAndDelete(commendID)
        response.json("comment deleted")
    }
    catch (error) {
        response.status(400).json("error deleting comment" + error)
    }
})

// edit comments
router.put('/comment/:id', async (request, response) => {
    const commentID = request.params.id
    const { username, commentDescription, date } = request.body

    try {
        // 
        const updatedComment = await Comment.findByIdAndUpdate(
            commentID,
            { username, commentDescription, date },
            { new: true }
        )

        if (!updatedComment) {
            return response.status(404).json({ error: "comment not found" })
        }

        response.status(200).json(updatedComment)
    }
    catch (error) {
        response.status(400).json({ error: error.message })
    }
})