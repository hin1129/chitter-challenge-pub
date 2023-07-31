import React, { useState } from 'react'
import axios from 'axios';

const Comment = ({ commentListProps, onDelete, onEdit }) => {
    // retrieve data from comment-list
    const myUsername = commentListProps.username;
    const myCommentDescription = commentListProps.commentDescription;
    const myDate = new Date(commentListProps.date)
    const myID = commentListProps._id

    const deleteCommentDeleteRequest = async () => {
        try {
            // delete comment by its ID
            await axios.delete(`http://localhost:8000/comment`, { data: { id: myID } });
            // notify parent component about deletion
            onDelete(myID);
            console.log(`comment id deleted: ${myID}`)
        }
        catch (error) {
            alert(`comment delete - use state error`)
            console.log(error);
        }
    };

    // for editing comments
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(myCommentDescription)

    const handleEditComment = async () => { setIsEditing(true) }
    const editCommentEditRequest = async () => {
        try {
            await axios.put(`http://localhost:8000/comment/${myID}`, { commentDescription: editedComment })
            setIsEditing(false)
            console.log(`comment id edited: ${myID}`)
            console.log(`comment edited: ${editedComment}`)
            // notify parent component about edited comment
            onEdit({
                ...commentListProps, // copy existing properties
                commentDescription: editedComment // update description
            })
        }
        catch (error) {
            alert(`comment put - use state error`)
            console.log(error);
        }
    }

    return (
        <div >
            <br />

            {isEditing ? (
                <>
                    <textarea
                        value={editedComment}
                        onChange={(event) => setEditedComment(event.target.value)}
                    />
                    <button onClick={editCommentEditRequest}>Save edited text</button>
                </>
            ) : (
                <p>
                    {myID}<br />
                    {myUsername}<br />
                    {myCommentDescription}<br />
                    {myDate.toLocaleString()}<br />
                    <button onClick={deleteCommentDeleteRequest}>Delete</button><br />
                    <button onClick={handleEditComment}>Edit</button>
                </p>
            )}
        </div >
    )
}

export default Comment