const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/InventoryModel');
const cors = require('cors');

router.get('/:userId?', cors(), async function(req, res, next) {
    const { userId } = req.params;
    const userInventory = await inventoryModel.getInventoryByUser(userId);

    res.json(userInventory);
});

router.post('/users/id', cors(), async function (req, res, next) {
    const userId = req.body.userId;
    const productId = req.body.productId;                                                                                                
    const startWeight = req.body.startWeight;
    const currentWeight = req.body.currentWeight;
    const price = req.body.price;

    const inventory = new inventoryModel(null, userId, productId, startWeight, currentWeight, price);
    inventory.addToInventory();

    res.send('Inventory has been updated.');
});

router.post('/users/remove', cors(), async function (req, res, next) {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const removedItem = await inventoryModel.removeFromInventory(userId, productId);

    res.send('Removal complete');
});

router.post('/users/update', cors(), async function (req, res, next) {
    const id = req.body.id;
    const currentWeight = req.body.currentWeight;

    const updatedItem = await inventoryModel.updateInventory(id, currentWeight);

    res.send('Item has been updated');
});

module.exports = router;