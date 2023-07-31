import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import Comment from './Comment'

const CommentList = ({ loggedInState }) => {
    // store server data
    const [commentList, setCommentList] = useState([])

    // get data from server
    const getCommentListGetRequest = async () => {
        try {
            // const response = await axios.get(`http://localhost:4000/comments`)
            const response = await axios.get(`http://localhost:8000/`)
            setCommentList(response.data)
            console.log(response.data)
        }
        catch (error) {
            alert(`comment list - use state error`)
            console.dir(error)
        }
    }

    // rerun server if login state changes
    useEffect(() => {
        getCommentListGetRequest()
    }, [loggedInState])

    // delete comment
    const handleDeleteComment = (deleteCommentID) => {
        // previous state value of comment list
        setCommentList((previousComments) => {
            // iterate existing array, skip deleteCommentID, create array
            return previousComments.filter(
                (comment) => comment._id !== deleteCommentID
            );
        })
    }

    // edit comment
    const handleEditComment = (editedComment) => {
        setCommentList((previousComments) => {
            // Map over the existing array and update the edited comment
            return previousComments.map(
                (comment) => comment._id === editedComment._id ? editedComment : comment
            );
        });
    };

    // pass data to comment component
    const allComments = commentList.map(
        currentComment => {
            return (
                <Comment
                    commentListProps={currentComment}
                    key={currentComment._id}
                    onDelete={handleDeleteComment}
                    onEdit={handleEditComment}
                />
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