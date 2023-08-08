import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmailVerification = () => {
    const { token } = useParams()
    const [emailVerificationStatus, setEmailVerificationStatus] = useState('')

    useEffect(() => {
        axios.get('/http://localhost:8000/emailverification/${token}')
            .then(response => {
                setEmailVerificationStatus('email verification successful')
            })
            .catch((error) => {
                setEmailVerificationStatus('invalid or expired token')
            })
    }, [token])

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{emailVerificationStatus}</p>
        </div>
    )
}

export default EmailVerification