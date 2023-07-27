import React from 'react'

const Comment = ({ commentListProps }) => {
    // retrieve data from comment-list
    const myTraineeName = commentListProps.traineeName;
    const myCommentDescription = commentListProps.commentDescription;
    const myCommentDateCreated = commentListProps.commentDateCreated; //displaying nothing
    const date = new Date(commentListProps.date)

    return (
        <div >
            <br />
            <p>
                {myTraineeName}<br />
                {myCommentDescription}<br />
                {myCommentDateCreated}
                {date.toLocaleString()}<br />
                {date.toUTCString()}
            </p>
        </div>
    )
}

export default Comment