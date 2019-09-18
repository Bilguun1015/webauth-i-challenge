import React, {useState, useEffect} from 'react'
import { axiosWithAuth } from '../login/axiosWIthAuth.js';

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:7000/api/users')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('err in getting users', err);
            });
    });

    return(
        <>
            <h1>Hey</h1>
        </>
    )
}

export default Users;