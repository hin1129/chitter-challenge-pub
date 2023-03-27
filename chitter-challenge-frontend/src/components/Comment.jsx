import React from 'react'

const Comment = ({ commentProps }) => {
    // retrieve data from comment-list
    const myTraineeName = commentProps.traineeName;
    const myCommentDescription = commentProps.commentDescription;
    const myCommentDateCreated = commentProps.commentDateCreated;
    const date = new Date(commentProps.date)

    return (
        <div >
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