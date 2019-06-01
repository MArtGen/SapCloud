"use strict";

const request = require('request-promise');
const dbClass = require(global.__base + "utils/dbClass");

module.exports = {
        async execute() {
        const db = new dbClass(req.db);
/*         const reqOptions = {
            url: '/log',
            method: 'GET',  //GET, POST, PUT, HEAD...
            data: {          //body to send if needed		    
                'usid' : 'U001',
                'text' : 'Log per time',
                'createdby': 'AutoCreatingBy',
                'createdon': 'AutoCreatingOn',
            }
        }; */
/*         const res = await request(reqOptions); */
/*         await db.executeUpdate(sSql);
        res.type("application/json").status(201).send(JSON.stringify({text: "Logging"})); */
    }
};	