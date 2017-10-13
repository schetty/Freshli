const uuid = require('uuid/v1');
const mongoose = require('mongoose');
const config = require ('../../config');
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoDbUrl);

let InventoryItem = mongoose.model('Item', {
    productName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    measureUnit: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true,
    },
    lastUpdated: {
        type: Number,
        required: true
    }
});

let inventoryDao = {
    insertItem: (newItem) => {
        let dbItem = {
            productName: newItem.productName,
            qty: newItem.qty,
            pricePerUnit: newItem.pricePerUnit,
            measureUnit: newItem.measureUnit,
        };
        dbItem.uuid = uuid();
        dbItem.lastUpdated = Date.now();

        let doc = new InventoryItem(dbItem);
        return doc.save();
    },
    getAll: () => {
        return InventoryItem.find({}, {_id: 0, productName: 1, qty: 1, pricePerUnit: 1, measureUnit: 1, uuid: 1, lastUpdated: 1 })
            .exec();  //To return a fully-fledged promise
    },
    updateItem: (item) => {
        return InventoryItem.findOne({uuid : item.uuid}).exec()
            .then(
                (dbItem) => {
                    if (item.lastUpdated == dbItem.lastUpdated) {
                        dbItem.qty = item.qty;
                        dbItem.save();
                        return;
                    }
                    //stale object
                },
                (err) => {
                    //object not found
                }
            );
    }
};


module.exports = inventoryDao;