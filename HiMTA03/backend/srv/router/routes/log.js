/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");
const COMMON = require(global.__base + "utils/common");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            //COMMON.checkAjaxAuth(req, "himta.view");
            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"LOG\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    return app;
};