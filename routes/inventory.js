const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/InventoryModel');
const productModel = require('../models/ProductModel');
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

    const inventory = new inventoryModel(null, userId, productId, startWeight, currentWeight);
    inventory.addToInventory();

    res.json('Inventory has been updated.');
});

router.post('/users/input/list', cors(), async function (req, res, next) {
    const list = req.body.listToAdd;
    const userId = req.body.userId;
    
    console.log(list);
    for(element of list) {
        console.log('LOOK HERE DUMMY', element)
        const product =  await productModel.getProductId(element.name);
        console.log(product, "hey");
        const inventory = new inventoryModel(null, userId, product[0].id, element.weight, element.weight);
        await inventory.addToInventory();
        
        // res.json('Inventory has been updated');
    }; 
})

router.post('/users/remove', cors(), async function (req, res, next) {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const removedItem = await inventoryModel.removeFromInventory(userId, productId);

    res.json('Removal complete');
});

router.post('/users/update', cors(), async function (req, res, next) {
    const id = req.body.id;
    const currentWeight = req.body.currentWeight;

    const updatedItem = await inventoryModel.updateInventory(id, currentWeight);

    res.json('Item has been updated');
});

module.exports = router;