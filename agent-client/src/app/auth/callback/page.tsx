"use client"

import React, { useEffect, useState } from 'react'

const AuthCallback = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (code) {
            fetch(`http://127.0.0.1:8000/api/v1/auth/github/callback?code=${code}`)
                .then(res => res.json())
                .then(data => {
                    console.log("data:", data);

                }).catch(err => {
                    console.log("error:", err);
                })
        }
    }, [])

    return (
        <div>Callback</div>
    )
}

export default AuthCallback