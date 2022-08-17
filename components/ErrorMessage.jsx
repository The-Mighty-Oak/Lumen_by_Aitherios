import React from 'react'
import Smile from './Smile'
// import styles from '../styles/Home.module.css'

const ErrorMessage = () => {
  return (
    <div className='errorContainer'>
        <div className='errorWrapper'>
            <div className='errorHeader'>
                  <p><span>Oops!</span> It appears something went wrong.</p>
            </div>
            <div className='errorPrompt'>
                <p>Let's try again!</p>
            </div>
            <div className='errorImage'>
                <Smile />
            </div>
        </div>
    </div>
  )
}

export default ErrorMessage