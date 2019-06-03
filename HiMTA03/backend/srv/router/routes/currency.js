/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

function _prepareObject(oVal, req) {
    let date = new Date();

    if (oVal.createdby == undefined) oVal.createdby = "DebugCurrency";
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
//Start of TEST
    app.get("/test", async (req, res, next) => {
        const db = new dbClass(req.db);
        try {
            const snSql = await db.getVal(`SELECT CUID, NAME FROM \"CURRENCY\"`);
            res.type("application/json").status(201).send(JSON.stringify(snSql));
        } catch (e) {
            AddToLog(req, db, e.message);
            next(e);
        };
    });
//Finish of TEST

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency get <select_all> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/currency", req, res);

        try {
            tracer.exiting("/currency", "Currency GET Works. <select_all>");
            AddToLog(req, db, "Currency GET Works. <select_all>");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"CURRENCY\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/currency", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/curname", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency get <select_by_name> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/currency/curname", req, res);
            
        try {
            tracer.exiting("/currency/curname", "Currency GET Works. <select_by_name>");
            AddToLog(req, db, "Currency GET Works. <select_by_name>");

            const db = new dbClass(req.db);

            const curName = [ req.query.name ];
            const sSql = 'SELECT * FROM \"CURRENCY\" WHERE "NAME" = ?';
            var result = await db.executeUpdate(sSql, curName);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/currency/curname", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency post request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/currency", req, res);

        try {
            tracer.exiting("/currency", "Currency POST Works.");
            AddToLog(req, db, "Currency POST Works.");

            const db = new dbClass(req.db);

            const oCur = _prepareObject(req.body, req);
				  oCur.cuid = await db.getNextval("cuid");

            const sSql = "INSERT INTO \"CURRENCY\" VALUES(?, ?, ?, ?)";
            const aValues = [ oCur.cuid, oCur.name, oCur.createdby, oCur.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oCur));
        } catch (e) {
            tracer.catching("/currency", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Currency put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/currency", req, res);

        try {
            tracer.exiting("/currency", "Currency PUT Works.");
            AddToLog(req, db, "Currency PUT Works.");

            const db = new dbClass(req.db);

            const oCur = _prepareObject(req.body, req);
            const sSql = "UPDATE \"CURRENCY\" SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"CUID\" = ?";
						const aValues = [ oCur.name, oCur.createdby, oCur.createdon, oCur.cuid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oCur));
        } catch (e) {
            tracer.catching("/currency", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    return app;
};