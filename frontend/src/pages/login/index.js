import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input } from "@nextui-org/react";
import Image from 'next/image';
import { IoMdMail } from "react-icons/io";
import { TbPasswordFingerprint } from "react-icons/tb";



/**
 * The LoginPage component renders the login form and handles the login process.
 * It sends the login credentials to the backend and stores the token and email in local storage upon successful login.
 * 
 * @returns {JSX.Element} The LoginPage component.
 */
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email); // Store email in local storage
                router.push('/'); // Redirect to the home page
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="flex flex-col items-center justify-center w-1/2 gap-4">
                <Image src="/logo.png" alt="Logo" width={300} height={300}/>
                <p className="text-5xl font-semibold">Quintor Hardware catalogus</p>
            </div>
            <form onSubmit={handleLogin} className="w-1/2 p-4 border-2 border-quintor-red rounded shadow-lg bg-white">
                <div className="flex gap-2 items-center justify-center">
                <h1 className="text-3xl text-center text-quintor-red"><IoMdMail /></h1>
                <h1 className="text-3xl text-center text-quintor-red"><TbPasswordFingerprint/></h1>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    fullWidth
                    required
                    className="p-2 m-2"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    fullWidth
                    required
                    className="p-2 m-2"
                />
                <Button type="submit" color="primary" className="p-4 m-2 w-full bg-quintor-red" fullWidth>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
