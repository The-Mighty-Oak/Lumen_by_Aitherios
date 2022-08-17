import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services';
import commentFormStyle from '../styles/commentForm.module.css'
import { motion, AnimatePresence } from "framer-motion"


const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, [])

    const handleCommentSubmission = () => {
        setError(false);
        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;
        if(!comment || !name || !email) {
            setError(true)
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        const commentObj = { name, email, comment, slug }
        if (storeData){
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
            .then((res) =>{
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })
    }

    return (
        <div className={commentFormStyle.commentFormWrapper}>
            <h3 className={commentFormStyle.commentFormPrompt}> Leave a Comment </h3>
            <div >
                <textarea 
                    ref={commentEl}
                    placeholder='Comment'
                    name="Comment" 
                    rows="10"
                    required
                    className={commentFormStyle.textArea} 
                />
            </div>
            <div className="">
                <input
                    type="text"
                    ref={nameEl}
                    placeholder='Name'
                    name='name'
                    required
                    className={commentFormStyle.inputArea} 
                    
                />
            </div>
            <div className="">
                <input
                    type="email"
                    ref={emailEl}
                    placeholder='Email'
                    name='Email'
                    required
                    className={commentFormStyle.inputArea} 
                />
            </div>

            <AnimatePresence>
                {error && <motion.div 
                            initial={{ opacity: 0, y: -900 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -900 }}
                            className={commentFormStyle.error}>
                                **All fields are required
                            </motion.div>}
            </AnimatePresence>

            <div className={commentFormStyle.checkArea}>
               
                <div className={commentFormStyle.postButtonContainer}>
                    <button
                        type="button"
                        onClick={handleCommentSubmission}
                        className={commentFormStyle.postButton}   
                    >
                        <a>
                            Post Comment 
                        </a>
                    </button>
                    <AnimatePresence>
                        {showSuccessMessage && <motion.div 
                                                    initial={{ opacity: 0, y: -900 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -900 }}
                                                    className={commentFormStyle.success}> 
                                                        Comment Submitted for Review 
                                                </motion.div>}
                    </AnimatePresence>
                </div>

                <div className={commentFormStyle.checkContainer}>
                    <input
                        type="checkbox"
                        ref={storeDataEl}
                        name="storeData"
                        id="storeData"
                        value="true"
                        className={commentFormStyle.checker}
                        
                    />
                    <label className={commentFormStyle.checkLabel} htmlFor="storeData">Save my Information.</label>
                </div>
            </div>
        </div>
    )
}

export default CommentsForm