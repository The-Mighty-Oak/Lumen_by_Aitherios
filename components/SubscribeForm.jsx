import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { decode } from 'html-entities';
import newStyles from '../styles/newsletterPage.module.css'
import { motion, AnimatePresence } from "framer-motion"

const SubscribeForm = ({ status, message, onValidated }) => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = () => {

        setError(null);

        if (!email) {
            setError('Please enter a valid email address');
            return null;
        }

        const isFormValidated = onValidated({ EMAIL: email });

        // On success return true
        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return decode(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? decode(formattedMessage) : null;
    }

    return (
        <div className={newStyles.subscribeContainer}>
            <div className={newStyles.subscribeFormContainer}>
                <div className={newStyles.subscribeFormInputWrapper}>
                    <input
                        onChange={(event) => setEmail(event?.target?.value ?? '')}
                        type="email"
                        placeholder="Enter Your email Address"
                        className={newStyles.subscribeFormInput}
                        onKeyUp={(event) => handleInputKeyEvent(event)}
                    />
                </div>
                <div className={newStyles.subscribeFormSubmitWrapper}>
                    <button className={newStyles.subscribeFormSubmit} onClick={handleFormSubmit}>
                        <a>
                            Subscribe
                        </a>
                    </button>
                </div>
            </div>
      
            <div className="newsletter-form-info">
                <AnimatePresence>
                    {status === "sending" && 
                        <motion.div
                            initial={{ opacity: 0, y: 900 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 900 }} 
                            className={newStyles.sendingText}>
                                Sending...
                        </motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                    {status === "error" || error ? (
                        <motion.div
                            initial={{ opacity: 0, y: 900 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 900 }} 
                            className={newStyles.errorMessage}
                            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
                        />
                    ) : null}
                </AnimatePresence>

                <AnimatePresence>
                {status === "success" && status !== "error" && !error && (
                    <motion.div 
                        initial={{ opacity: 0, y: 900 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 900 }} 
                        className={newStyles.successMessage} 
                        dangerouslySetInnerHTML={{ __html: decode(message) }} />
                )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default SubscribeForm