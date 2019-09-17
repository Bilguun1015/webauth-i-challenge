const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

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

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
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

router.get('/logout', (req, res) => {
    const { username } = req.session.user;
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ error: 'error logging out'});
            } else {
                res.status(200).json({ message: `see you next time ${username}!` });
            };
        });
    } else {
        res.status(200).json({ message: 'already logged out!' });
    };
});

module.exports = router;