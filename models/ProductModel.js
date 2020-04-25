const db = require('./conn.js');

class ProductModel {
    constructor(id, name, weight) {
        this.id = id;
        this.name = name;
        this.weight = weight;
    };

    static async getAllProduct() {
        try {
            const response = await db.any(`SELECT * FROM product`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async getSingleProduct(id) {
        try {
            const response = await db.any(`SELECT * FROM product WHERE id = ${id}`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };
}

module.exports = ProductModel;