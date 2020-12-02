import React, { useState } from 'react'
import './login.css'
import Axios from 'axios';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const axios = Axios.create({
        baseURL: 'https://0.0.0.0:1337'
    })
    var loginRequest = (e) => {
        e.preventDefault();
        axios.post('/login', {
            data: {
                username: username,
                password: password
            }
        })
            .catch(e => {
            })
            .then((res) => {
                if (res && res.status === 200) {
                    sessionStorage.setItem('userLoggedIn', true)
                    window.location = '/'
                } else {
                    alert('Invalid credentials. Please try again.')
                }
            })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Sign In </h2>

                <div className="fadeIn first">
                </div>
                <form onSubmit={loginRequest}>
                    <input autoFocus={true} autoComplete='off' type="text" id="username" className="fadeIn second" name="login" placeholder="Username" onChange={e => {
                        setUsername(e.target.value);
                    }} />
                    <input type="text" id="password" type="password" className="fadeIn third" name="login" placeholder="Password" onChange={e => {
                        setPassword(e.target.value);
                    }} />
                    <input type="submit" className="fadeIn fourth" value="Sign in" onClick={loginRequest} />
                </form>
            </div>
        </div>
    )

}