const db = require('./conn.js');

class InventoryModel {
    constructor(id, userId, productId, startWeight, currentWeight, price) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.startWeight = startWeight;
        this.currentWeight = currentWeight;
        this.price = price;
    }

    static async getInventoryByUser(userId) {
        try {
            const response = await db.any(`SELECT product.name, product.price, inventory.productid,  inventory.startweight, inventory.currentweight FROM product INNER JOIN inventory ON product.id = inventory.productid WHERE inventory.userId = ${userId}`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    async addToInventory() {
        try {
            const response = await db.any(`INSERT INTO inventory (userid, productid, startweight, currentweight) VALUES ($1, $2, $3, $4) RETURNING id`, [this.userId, this.productId, this.startWeight, this.currentWeight]);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async removeFromInventory(userId, productId) {
        try {
            const item = await db.any(`DELETE FROM inventory WHERE userId = ${userId} AND productId = ${productId} RETURNING id`);
            return item;
        } catch (error) {
            console.error(error);
            return error;  
        };
    };

    static async updateInventory(id, currentWeight) {
        try {
            const itemToUpdate = await db.any(`UPDATE inventory SET currentWeight = ${currentWeight} WHERE id = ${id} RETURNING id`);
            return itemToUpdate;     
        } catch (error) {
            console.error(error);
            return error;
        };
    };

}

module.exports = InventoryModel;