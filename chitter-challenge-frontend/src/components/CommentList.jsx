import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from './Comment'

const CommentList = ({ loggedInState }) => {
    // store server data
    const [commentList, setCommentList] = useState([])

    // get data from server
    const getCommentList = async () => {
        try {
            // const response = await axios.get(`http://localhost:4000/comments`)
            const response = await axios.get(`http://localhost:8000/`)
            setCommentList(response.data)
            console.log(response.data)
        }
        catch (error) {
            alert(`use state error`)
            console.dir(error)
        }
    }

    // rerun server if second argument changes
    useEffect(() => {
        getCommentList()
    }, [loggedInState])

    // pass data to comment component, in reversed order
    const allComments = commentList.reverse().map(
        currentComment => {
            return (
                <Comment commentListProps={currentComment} key={currentComment._id} />
            )
        }
    )

    return (
        <div>
            {allComments}
        </div>
    )
}

export default CommentList