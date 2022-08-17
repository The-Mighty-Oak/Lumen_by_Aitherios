import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SubscribeForm from './SubscribeForm'



const SubscribeSubmit = () => {
    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={(props) => {
                const { subscribe, status, message } = props || {};
                return (
                    <SubscribeForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                );
            }}
        />
    );
};

export default SubscribeSubmit