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
        catch (error) {
            alert(`PostComment - PostRequest`)
            console.dir(error)
            console.error(error);
            throw error;
        }
    }

    // submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        // pass object to post request
        const username = localStorage.getItem("username")
        const createCommentObject = { username: username, commentDescription, date: new Date() }
        await submitCommentPostRequest(createCommentObject);
        console.log(createCommentObject)
        navigate('/')
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
        </form>
    )
}

export default PostComment