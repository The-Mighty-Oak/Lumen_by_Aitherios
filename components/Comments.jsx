import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser'
import { getComments } from '../services';
import { comment } from 'postcss'
import commentStyle from '../styles/comment.module.css'


const Comments = ( {slug} ) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
    }, [])

    return (
        <div className={commentStyle.commentsWrapper}>
            {comment.length > 0 && (
                <div>
                    <h3 className={commentStyle.commentsHeader}> {comments.length} { ' ' } Comments</h3>
                    {comments.map((comment) => (
                        <div className={commentStyle.commentContainer} key={comment.createdAt}>
                            <p className={commentStyle.commenter}>
                                <span className={commentStyle.commenterName}>{comment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(comment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <p className={commentStyle.comments}>{parse(comment.comment)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments