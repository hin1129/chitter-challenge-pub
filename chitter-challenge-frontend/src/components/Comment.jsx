import React from 'react'

const Comment = ({ commentListProps }) => {
    // retrieve data from comment-list
    const myUsername = commentListProps.username;
    const myCommentDescription = commentListProps.commentDescription;
    const myCommentDateCreated = commentListProps.commentDateCreated; //displaying nothing
    const date = new Date(commentListProps.date)

    return (
        <div >
            <br />
            <p>
                {myUsername}<br />
                {myCommentDescription}<br />
                {myCommentDateCreated}
                {date.toLocaleString()}<br />
            </p>
        </div>
    )
}

export default Comment