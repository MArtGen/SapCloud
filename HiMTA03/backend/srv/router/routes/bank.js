/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const helper = require(global.__base + "utils/Helper");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank get <select_all> request');

        try {
            helper.AddToLog("Bank Get Works. <select_all>", "DefaultUser");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"BANK\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/bankname", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank get <select_by_name> request');

        try {
            helper.AddToLog("Bank Get Works. <select_by_name>", "DefaultUser");
            
            const db = new dbClass(req.db);
            const bankName = [ req.query.name ];
            const sSql = 'SELECT * FROM \"BANK\" WHERE "NAME" = ?';
            var result = await db.executeUpdate(sSql, bankName);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank post request');

        try {
            helper.AddToLog("Bank POST Works", req.body.createdby);

            const db = new dbClass(req.db);
            const oBank = helper._prepareObject(req.body, req.body.createdby);
				  oBank.bid = await db.getNextval("bid");

            const sSql = "INSERT INTO \"BANK\" VALUES(?, ?, ?, ?)";
            const aValues = [ oBank.cuid, oBank.name, oBank.createdby, oBank.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oBank));
        } catch (e) {
            helper.AddToLog(e.message, req.body.createdby);
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank put request');

        try {
            helper.AddToLog("Bank PUT Works", req.body.createdby);

            const db = new dbClass(req.db);

            const oBank = helper._prepareObject(req.body, req.body.createdby);
            const sSql = "UPDATE \"BANK\" SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"BID\" = ?";
						const aValues = [ oBank.name, oBank.createdby, oBank.createdon, oBank.bid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oBank));
        } catch (e) {
            helper.AddToLog(e.message, req.body.createdby);
            next(e);
        }
    });

    return app;
};
