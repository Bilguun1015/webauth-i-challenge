const express = require('express');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'error retreiving users'});
        });
});






module.exports = router;