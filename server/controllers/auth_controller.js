const users = require('../models/users')
let id = 1;

module.exports = {

    login: (req, res, next) => {
        let { username, password } = req.body;
        let truthyUser = users.find(e => e.username === username && e.password === password) // need to do that bc it is an array

        if (truthyUser) {
            req.session.user.username = truthyUser.username;
            res.status(200).send(req.session.user);
        } else {
            res.status(500).send('Unauthorized.');
        }
    },

    register: (req, res, next) => {
        let { username, password } = req.body;
        users.push({ id, username, password });
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }

}