const db = require('./conn.js');

class InventoryModel {
    constructor(id, userId, productId, startWeight, currentWeight) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.startWeight = startWeight;
        this.currentWeight = currentWeight;
    }

    static async getInventoryByUser(userId) {
        try {
            const response = await db.any(`SELECT * FROM inventory WHERE userId = ${userId}`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    async addToInventory() {
        try {
            const response = await db.any(`INSERT INTO inventory (userId, productId, startWeight, currentWeight) VALUES ($1, $2, $3, $4) RETURNING id`, [this.userId, this.productId, this.startWeight, this.currentWeight]);
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