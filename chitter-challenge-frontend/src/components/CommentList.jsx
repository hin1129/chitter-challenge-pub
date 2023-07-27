import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from './Comment'

const CommentList = () => {
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

    useEffect(() => {
        getCommentList()
    }, [])

    // const allComments = commentList.map(
    //     currentComment => {
    //         const myID = currentComment.id;
    //         const myCommentDescription = currentComment.commentDescription;
    //         const myCommentDateCreated = currentComment.commentDateCreated;
    //         const myTraineeName = currentComment.traineeName;
    //         return (
    //             <div key={myID}>
    //                 {myCommentDescription}
    //                 {myCommentDateCreated}
    //                 {myTraineeName}
    //             </div>
    //         )
    //     }
    // )

    // pass data to comment component, in reversed order
    const allComments = commentList.reverse().map(
        currentComment => {
            return (
                // <Comment commentProps={currentComment} key={currentComment.id} />
                <Comment commentListProps={currentComment} key={currentComment._id} />
            )
        }
    )

    return (
        <div>
            {/* {Comment} */}
            {allComments}
        </div>
    )
}

export default CommentList