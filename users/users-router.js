const express = require('express');
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({message: `Welcome ${user.username}!`})
            } else {
                res.status(401).json({ message: 'You cannot pass!' });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'error loging in'})
        });
});


router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'error retreiving users'});
        });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);

    Users.add({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "error saving user"});
        });
});




module.exports = router;