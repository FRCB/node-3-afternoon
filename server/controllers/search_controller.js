const swag = require('../models/swag')

module.exports = {

    search: (req, res, next) => {
        let { category } = req.query

        if (!category) {
            res.status(200).send(swag);
        } else {
            const filteredSwag = swag.filter(e => e.category === category);
            res.status(200).send(filteredSwag);
        }
    }
}