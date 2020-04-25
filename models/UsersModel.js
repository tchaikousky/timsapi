const db = require('./conn.js');

class UsersModel {
    constructor(id, firstName, lastName, userName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    static async getAllUsers() {
        try {
            const response = await db.any(`SELECT * FROM users`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async getUser(id) {
        try {
            const response = await db.any(`SELECT * FROM users WHERE id = ${id}`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async checkUser(userName, password) {
        try{
            const response = await db.any(`SELECT id, userName, firstName, email FROM users WHERE userName = '${userName}' AND password = '${password}'`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    async addUser() {
        try{
            const response = await db.one(`INSERT INTO users (firstName, lastName, userName, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [this.firstName, this.lastName, this.userName, this.email, this.password]);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async checkUserName(userName) {
        try {
            const response = await db.any(`SELECT * FROM users WHERE userName = '${userName}'`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };

    static async checkUserEmail(email) {
        try {
            const response = await db.any(`SELECT * FROM users WHERE email = '${email}'`);
            return response;
        }catch (error) {
            console.error(error);
            return error;
        };
    };
}

module.exports = UsersModel;