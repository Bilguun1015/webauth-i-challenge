import React, {useState} from 'react';
import { Link, Route} from 'react-router-dom';

import axios from 'axios';

const Login = props => {
    console.log(props)
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = e => {
        e.preventDefault();
        axios
            .post('http://localhost:7000/api/auth/login', user)
            .then(res => {
                console.log(res)
                localStorage.setItem('cookies', res.data.token)
                props.history.push('/protected')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <form onSubmit={login}>
                <input type='text' name='username' value={user.username} onChange= {handleChange} placeholder='username'/>
                <input type='password' name='password' value={user.password} onChange= {handleChange} placeholder='password'/>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login;