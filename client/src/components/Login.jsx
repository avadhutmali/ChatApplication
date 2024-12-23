import React, { useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate } from 'react-router'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    axios.defaults.withCredentials = true;

    const token = Cookies.get("token");
    console.log(token)
    
    if(token){
        console.log("why")
        return <Navigate to="/chat"/>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3003/api/user/login", { username, password });
            const { token } = response.data;
            Cookies.set("token",token)
            Cookies.set("username",username)
            alert("Login successful!");
          } catch (error) {
            alert(error.response ? error.response.data.message : "An error occurred");
          } finally {
            setIsLoading(false);
          }
    };

    return (
        <div className="h-screen w-full bg-blue-300 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4">Login</h2>
                <label htmlFor="username" className="block mb-2">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded px-2 py-1 mb-4 w-full"
                />
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-2 py-1 mb-4 w-full"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded bg-blue-500 text-white ${isLoading ? "opacity-50" : ""}`}
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
