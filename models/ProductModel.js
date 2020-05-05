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

    static async searchProduct(searchParam) {
        try {
            const response = await db.any(`SELECT * FROM product WHERE name ILIKE '%${searchParam}%'`);
            console.log(searchParam);
            return response;
        }catch (error) {
            console.error(error);
            return `Could not find ${searchParam} in our database.`
        }
    }

    static async getProductId(productName) {
        try {
            const response = await db.any(`SELECT id FROM product WHERE name = '${productName}'`);
            console.log(response)
            return response;
        }catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = ProductModel;