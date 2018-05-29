const swag = require('../models/swag')

module.exports = {

    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex(e => e.id == id);

        if (index === -1) {
            const selectedSwag = swag.find(e => e.id == id);

            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    // add: (req, res, next) => {
    //     let { id } = req.query;
    //     let index = req.session.user.cart.findIndex(e => e.id === id)

    //     if (index === -1) {
    //         for (let i = 0; i < swag.length; i++) {
    //             if (swag[i].i == id) {
    //                 req.session.user.cart.push(swag[i]);
    //                 req.session.user.total += swag[i].price;
    //             }
    //         }
    //     }
    //     res.status(200).send(req.session.user);
    // },

    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;

        const selectedSwag = swag.find(e => e.id == id);

        if (selectedSwag) {
            const i = cart.findIndex(e => e.id == id);
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    // delete: (req, res, next) => {
    //     let { id } = req.query;

    //     for (let i = 0; i < swag.length; i++) {
    //         if (swag[i].i === id) {
    //             req.session.user.cart.splice(i, 1);
    //             req.session.user.total -= swag[i].price;
    //         }
    //         res.status(200).send(req.session.user);
    //     }
    // },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}