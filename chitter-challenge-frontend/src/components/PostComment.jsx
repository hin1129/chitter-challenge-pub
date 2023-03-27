import React, { useState } from 'react'
import axios from 'axios'


const PostComment = () => {
    // post data to server
    const submitCommentPostRequest = async (comment) => {
        try {
            // const response = await axios.post(`http://localhost:4000/comments`, comment);
            const response = await axios.post(`http://localhost:8000/postcomment`, comment);
            return (response.data);
        }
        catch (error) {
            alert(`post comment - use state error`)
            console.dir(error)
            console.error(error);
            throw error;
        }
    }

    // set value
    const [commentDescription, setCommentDescription] = useState(``)
    // const [user, setUser] = useState(``)

    // form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        // pass object to post request
        const createCommentObject = { traineeName: "traineeName1", commentDescription, date: new Date() }
        await submitCommentPostRequest(createCommentObject);
        console.log(createCommentObject)
    }

    return (
        <form onSubmit={handleSubmit}>
            <br />

            <label htmlFor="commentDescription">description:</label>
            <input
                type="text"
                placeholder="comment description"
                name="commentDescription"
                value={commentDescription}
                onChange={event => setCommentDescription(event.target.value)}
            />

            <input type="submit" value="submit" />
            {/* <input type="submit" value="submit"  disabled={!todoDescription} /> */}
        </form>
    )
}

export default PostComment