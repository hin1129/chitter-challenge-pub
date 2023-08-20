import React, { useState } from 'react'
import axios from 'axios';

const Comment = ({ commentListProps, onEdit, onDelete, onReply, logInState }) => {
    // retrieve data from comment-list
    const myUsername = commentListProps.username;
    const myCommentDescription = commentListProps.commentDescription;
    const myDate = new Date(commentListProps.date)
    const myID = commentListProps._id

    // expand, edit, cancel
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(myCommentDescription)

    // // reply to comment
    const [isReplying, setIsReplying] = useState(false)
    const [replyComment, setReplyComment] = useState('')

    // user state
    const loggedInUsername = localStorage.getItem('Username')
    const isCurrentUser = myUsername === loggedInUsername

    const editCommentPutRequest = async () => {
        try {
            const trimmedEditedComment = editedComment.trim();
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                }
            };
            const response = await axios.put(`http://localhost:8000/comment/${myID}`, {
                // for backend validation
                username: myUsername,
                commentDescription: editedComment,
                date: myDate.toISOString()
            }, config)
            setIsEditing(false) // back to non-editable
            console.log(`comment id edited: ${myID}`)
            console.log(`comment edited: ${editedComment}`)
            // notify parent component about edited comment
            onEdit({
                ...commentListProps, // copy existing properties
                // commentDescription: editedComment // update description
                commentDescription: trimmedEditedComment,
            })
            setIsExpanded(false); // back to non-expanded
        }
        catch (error) {
            alert(`Comment - PutRequest error`)
            console.log(error);
        }
    }

    const deleteCommentDeleteRequest = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                }
            };
            // delete comment by its ID
            const response = await axios.delete(`http://localhost:8000/comment`,
                { data: { id: myID }, headers: config.headers }
            );
            // notify parent component about deletion
            onDelete(myID);
            console.log(`comment id deleted: ${myID}`)
        }
        catch (error) {
            alert(`Comment - DeleteRequest error`)
            console.log(error);
        }
    };

    // const replyCommentPostRequest = async () => {
    //     // event.preventDefault()
    //     try {
    //         const response = await axios.post(`http://localhost:8000/comment`,
    //             { commentId: comment._id, replyComment, }
    //         )
    //         setReplyButton(false)
    //     }
    //     catch (error) {
    //         alert(`Comment - PostRequest error`)
    //         console.log(error);
    //     }
    // }

    const replyCommentPostRequest = async () => {
        try {
            if (replyComment.trim() !== '') {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    }
                };
                const response = await axios.post(
                    `http://localhost:8000/comment/${myID}/reply`,
                    {
                        username: loggedInUsername,
                        replyDescription: replyComment,
                        date: new Date().toISOString(),
                    },
                    config
                );
                // add new reply to comment's replyComments array
                onReply(myID, response.data);
                setReplyComment('');
                setIsExpanded(false) // back to non-editable
            }
        } catch (error) {
            alert('Comment - PostRequest error, error adding reply');
            console.log(error);
        }
    }

    const handleReplyClick = () => {
        setIsReplying(true)
    }

    const handleCancelReplyComment = () => {
        setIsReplying(false)
        setReplyComment('');
    }

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded)
        setIsEditing(false)
    }

    const handleCancelExpandClick = () => {
        setIsExpanded(false)
    }

    const handleEditComment = () => {
        setIsExpanded(true);
        setIsEditing(true);
    }

    const handleCancelEditComment = () => {
        setIsExpanded(false);
        setIsEditing(false);
        setEditedComment(myCommentDescription);
    }

    return (
        <div >
            <br />

            <p>
                {myID}<br />
                {myUsername}<br />
                {myCommentDescription}<br />
                {myDate.toLocaleString()}<br />

                {/* see replied comments */}

                {isExpanded ? (
                    // expand - true
                    <>
                        {isEditing ? (
                            // edit = true
                            <>
                                <textarea
                                    value={editedComment}
                                    onChange={(event) => setEditedComment(event.target.value)}
                                />
                                <button onClick={editCommentPutRequest} disabled={!editedComment.trim()}>Save Changes</button>
                                <button onClick={handleCancelEditComment}>Cancel Changes</button>
                            </>
                        ) : (
                            // edit = false 
                            <>
                                {isReplying ? (
                                    // replying = true
                                    <>
                                        <textarea
                                            value={replyComment}
                                            onChange={(event) => setReplyComment(event.target.value)}
                                        />
                                        <button onClick={replyCommentPostRequest} disabled={!replyComment.trim()}>Save reply</button>
                                        <button onClick={handleCancelReplyComment}>Cancel reply</button>
                                    </>
                                ) : (
                                    // replying = false
                                    <>
                                        <button onClick={handleReplyClick}>Reply</button><br />
                                        {isCurrentUser && (
                                            <>
                                                <button onClick={handleEditComment}>Edit</button><br />
                                                <button onClick={deleteCommentDeleteRequest}>Delete</button><br />
                                                <button onClick={handleCancelExpandClick}>Cancel</button><br />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    // expand = false
                    <>
                        {logInState && (
                            <button onClick={handleExpandClick}>Expand</button>
                        )}
                    </>
                )}
                {/* end of conditional check */}
            </p>

        </div >
    )
}

export default Comment