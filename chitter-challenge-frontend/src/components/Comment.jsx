import React, { useState } from 'react'
import axios from 'axios';

const Comment = ({ commentListProps, onEdit, onDelete }) => {
    // retrieve data from comment-list
    const myUsername = commentListProps.username;
    const myCommentDescription = commentListProps.commentDescription;
    const myDate = new Date(commentListProps.date)
    const myID = commentListProps._id

    // expand, edit, cancel
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(myCommentDescription)

    // user state
    const loggedInUsername = localStorage.getItem('username')
    const isCurrentUser = myUsername === loggedInUsername

    const editCommentPutRequest = async () => {
        try {
            await axios.put(`http://localhost:8000/comment/${myID}`, { commentDescription: editedComment })
            setIsEditing(false) // back to non-editable
            console.log(`comment id edited: ${myID}`)
            console.log(`comment edited: ${editedComment}`)
            // notify parent component about edited comment
            onEdit({
                ...commentListProps, // copy existing properties
                commentDescription: editedComment // update description
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
            // delete comment by its ID
            await axios.delete(`http://localhost:8000/comment`, { data: { id: myID } });
            // notify parent component about deletion
            onDelete(myID);
            console.log(`comment id deleted: ${myID}`)
        }
        catch (error) {
            alert(`Comment - DeleteRequest error`)
            console.log(error);
        }
    };

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded)
        setIsEditing(false)
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
                                <button onClick={editCommentPutRequest}>Save Changes</button>
                                <button onClick={handleCancelEditComment}>Cancel Changes</button>
                            </>
                        ) : (
                            // edit = false 
                            <>
                                {isCurrentUser && (
                                    <>
                                        <button onClick={handleEditComment}>Edit</button><br />
                                        <button onClick={deleteCommentDeleteRequest}>Delete</button>
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    // expand = false
                    <>
                        {isCurrentUser && (
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