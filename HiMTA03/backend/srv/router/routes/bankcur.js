/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");
const dbClass = require(global.__base + "utils/dbClass");
const helper = require(global.__base + "utils/Helper");
const COMMON = require(global.__base + "utils/common");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_all> request');

        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("BankCur Get Works. <select_all>", "DefaultUser");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"BANKCURRENCY\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/bid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_by_bid> request');

        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("BankCur Get Works. <select_by_bid>", "DefaultUser");

            const db = new dbClass(req.db);
            const bcid = [ req.query.bid ];
            const sSql = 'SELECT * FROM \"BANKCURRENCY\" WHERE "BID" = ?';
            var result = await db.executeUpdate(sSql, bcid);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/cuid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_by_cuid> request');

        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("BankCur Get Works. <select_by_cuid>", "DefaultUser");

            const db = new dbClass(req.db);

            const bcid = [ req.query.cuid ];
            const sSql = 'SELECT * FROM \"BANKCURRENCY\" WHERE "CUID" = ?';
            var result = await db.executeUpdate(sSql, bcid);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur put request');

        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("BankCur PUT Works.", req.body.createdby);

            const db = new dbClass(req.db);

            const oBC = helper._prepareObject(req.body, req);

            const sSql = "INSERT INTO \"BANKCURRENCY\" VALUES(?, ?, ?, ?)";
            const aValues = [ oBC.bid, oBC.cuid, oBC.createdby, oBC.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oBC));
        } catch (e) {
            helper.AddToLog(e.message, req.body.createdby);
            next(e);
        }
    });

    return app;
};
