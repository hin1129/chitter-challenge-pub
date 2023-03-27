import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios'
import SampleComment from '../sameple_data/sampleData.json'

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
                <Comment commentProps={currentComment} key={currentComment._id} />
            )
        }
    )

    return (
        <div>
            {/* {Comment} */}
            {/* {sampleComment} */}
            {allComments}
        </div>
    )
}

export default CommentList