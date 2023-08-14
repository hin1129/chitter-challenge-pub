import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const PostComment = () => {
    const [commentDescription, setCommentDescription] = useState(``)
    const navigate = useNavigate();

    const submitCommentPostRequest = async (comment) => {
        try {
            const response = await axios.post(`http://localhost:8000/postcomment`, comment);
            return (response.data);
        }
        catch (error) { alert(`PostComment - PostRequest error`) }
    }

    // submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        // pass object to post request
        const trimmedDescription = commentDescription.trim();
        const username = localStorage.getItem("username")
        const createCommentObject = {
            username: username,
            commentDescription: trimmedDescription,
            date: new Date().toISOString()
        }
        await submitCommentPostRequest(createCommentObject);
        navigate('/')
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

            <input type="submit" value="submit" disabled={!commentDescription.trim()} />
        </form>
    )
}

export default PostComment