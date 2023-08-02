import express from 'express'
export const router = express.Router()
import Comment from '../models/comment.model.js'

// get all comments
router.get(`/`, (request, response) => {
    Comment.find()
        .then((comment) => {
            const reversedComment = comment.reverse()
            response.status(200).json(reversedComment);
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
        const updatedComment = await Comment.findByIdAndUpdate(
            commentID,
            { username, commentDescription, date },
            { new: true } // true return updated document; false return original document
        )

        if (!updatedComment) {
            return response.status(404).json({ error: "comment not found in db" })
        }

        response.status(200).json(updatedComment)
    }
    catch (error) {
        response.status(400).json({ error: error.message })
    }
})

// 200 = ok
// 201 = created
// 204 = no content
// 400 = bad request
// 401 = Unauthorized
// 403 = Forbidden
// 404 = not found
// 500 = internal server error
//
// Informational responses(100–199): server has received the request and is continuing to process it.
// Successful responses(200–299): request was successfully received, understood, and processed by the server.
// Redirection messages(300–399): further action needs to be taken to complete the request, such as following a redirection.
// Client error responses(400–499): issue with the client's request, such as a bad URL or insufficient permissions.
// Server error responses(500–599): error on the server's side while processing the request.