/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

function _prepareObject(oVal, req) {
    let date = new Date();

    if (oVal.createdby == undefined) oVal.createdby = "DebugBankCurrency";
    else oVal.createdby = req.body.createdby;

    oVal.createdon = date.toDateString().replace(/\s+/g, '-');
    return oVal;
}

async function AddToLog(req, db, text) {
    const oLog = _prepareObject(req.body, req);
          oLog.text = text;
          oLog.loid = await db.getNextval("loid");

    const sSql = "INSERT INTO \"LOG\" VALUES(?, ?, ?, ?)";
    const aValues = [ oLog.loid, oLog.text, oLog.createdby, oLog.createdon ];
    
    await db.executeUpdate(sSql, aValues);
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_all> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bankcur", req, res);

        try {
            tracer.exiting("/bankcur", "BankCur Get Works. <select_all>");
            AddToLog(req, db, "BankCur Get Works. <select_all>");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"BANKCURRENCY\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/bankcur", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/bid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_by_bid> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bankcur/bid", req, res);

        try {
            tracer.exiting("/bankcur/bid", "BankCur Get Works. <select_by_bid>");
            AddToLog(req, db, "BankCur Get Works. <select_by_bid>");

            const db = new dbClass(req.db);
            const bcid = [ req.query.bid ];
            const sSql = 'SELECT * FROM \"BANKCURRENCY\" WHERE "BID" = ?';
            var result = await db.executeUpdate(sSql, bcid);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/bankcur/bid", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/cuid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur get <select_by_cuid> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bankcur/cuid", req, res);

        try {
            tracer.exiting("/bankcur/cuid", "BankCur Get Works. <select_by_cuid>");
            AddToLog(req, db, "BankCur Get Works. <select_by_cuid>");

            const db = new dbClass(req.db);

            const bcid = [ req.query.cuid ];
            const sSql = 'SELECT * FROM \"BANKCURRENCY\" WHERE "CUID" = ?';
            var result = await db.executeUpdate(sSql, bcid);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/bankcur/cuid", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('BankCur put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bankcur", req, res);

        try {
            tracer.exiting("/bankcur", "BankCur PUT Works.");
            AddToLog(req, db, "BankCur PUT Works.");

            const db = new dbClass(req.db);

            const oBC = _prepareObject(req.body, req);

            const sSql = "INSERT INTO \"BANKCURRENCY\" VALUES(?, ?, ?, ?)";
            const aValues = [ oBC.bid, oBC.cuid, oBC.createdby, oBC.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oBC));
        } catch (e) {
            tracer.catching("/bankcur", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    return app;
};
