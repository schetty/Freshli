const inventoryDao = require("./inventoryDao");

const inventoryService = {
    getAllRequestHandler: (req, res) => {
        inventoryDao.getAll()
        .then((docs) => {
            res.send(docs);
        }, (err) => {
            res.status(500).send(err);
        });
    },

    postItemRequestHandler: (req, res) => {
        let newItem = req.body;

        inventoryDao.insertItem(newItem)
        .then((insertedItem) => {
            console.log(insertedItem);
            res.status(200).end();
        }, (err) => {
            res.status(400).send(err);
        });
    },

    putItemRequestHandler: (req, res) => {
        let updatedItem = req.body;
        inventoryDao.updateItem(updatedItem)
            .then (
                function () {
                    res.status(200).end();
                }, (err) => {
                    res.status(500).send(err);
                }
            );

    }
};

module.exports = inventoryService;