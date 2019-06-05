/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const helper = require(global.__base + "utils/Helper");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger('/Application');
        logger.info('Currency get <select_all> request');
/*         let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/currency", req, res); */

        try {
/*             tracer.exiting("/currency", "Currency GET Works. <select_all>"); */
            helper.AddToLog("Currency GET Works. <select_all>", "DefaultUser");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"CURRENCY\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
/*             tracer.catching("/currency", e); */
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/curname", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency get <select_by_name> request');
            
        try {
            helper.AddToLog("Currency GET Works. <select_by_name>", "DefaultUser");

            const db = new dbClass(req.db);

            const curName = [ req.query.name ];
            const sSql = 'SELECT * FROM \"CURRENCY\" WHERE "NAME" = ?';
            var result = await db.executeUpdate(sSql, curName);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency post request');

        try {
            helper.AddToLog("Currency POST Works.", "DefaultUser");

            const db = new dbClass(req.db);

            const oCur = helper._prepareObject(req.body, "MAG");
				  oCur.cuid = await db.getNextval("cuid");

            const sSql = "INSERT INTO \"CURRENCY\" VALUES(?, ?, ?, ?)";
            const aValues = [ oCur.cuid, oCur.name, oCur.createdby, oCur.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oCur));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency put request');

        try {
            helper.AddToLog("Currency PUT Works.", "DefaultUser");

            const db = new dbClass(req.db);

            const oCur = helper._prepareObject(req.body, "MAG");
            const sSql = "UPDATE \"CURRENCY\" SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"CUID\" = ?";
						const aValues = [ oCur.name, oCur.createdby, oCur.createdon, oCur.cuid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oCur));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    return app;
};