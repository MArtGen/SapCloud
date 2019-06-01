/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

function _prepareObject(oVal, req) {
    let date = new Date();
    oVal.createdby = "DebugUser";
    oVal.createdon = date.toDateString().replace(/\s+/g, '-');
    return oVal;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"CURRENCY\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCur = _prepareObject(req.body, req);
				  oCur.cuid = await db.getNextval("cuid");

            const sSql = "INSERT INTO \"CURRENCY\" VALUES(?, ?, ?, ?)";
			const aValues = [ oCur.cuid, oCur.name, oCur.createdby, oCur.createdon ];

            console.log (aValues);
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oCur));
        } catch (e) {
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oCur = _prepareObject(req.body, req);
            const sSql = "UPDATE \"CURRENCY\" SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"CUID\" = ?";
						const aValues = [ oCur.name, oCur.createdby, oCur.createdon, oCur.cuid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oCur));
        } catch (e) {
            next(e);
        }
    });

    return app;
};