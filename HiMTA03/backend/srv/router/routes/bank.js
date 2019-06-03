/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

function _prepareObject(oVal, req) {
    let date = new Date();

    if (oVal.createdby == undefined) oVal.createdby = "DebugBank";
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
        logger.info('Bank get <select_all> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bank", req, res);

        try {
            tracer.exiting("/bank", "Bank Get Works. <select_all>");
            AddToLog(req, db, "Bank Get Works. <select_all>");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"BANK\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/bank", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/bankname", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank get <select_by_name> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bank/bankname", req, res);

        try {
            tracer.exiting("/bank/bankname", "Bank Get Works. <select_by_name>");
            AddToLog(req, db, "Bank Get Works. <select_by_name>");
            
            const db = new dbClass(req.db);
            const bankName = [ req.query.name ];
            const sSql = 'SELECT * FROM \"BANK\" WHERE "NAME" = ?';
            var result = await db.executeUpdate(sSql, bankName);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/bank/bankname", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank post request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bank", req, res);

        try {
            tracer.exiting("/bank", "Bank POST Works");
            AddToLog(req, db, "Bank POST Works");

            const db = new dbClass(req.db);
            const oBank = _prepareObject(req.body, req);
				  oBank.bid = await db.getNextval("bid");

            const sSql = "INSERT INTO \"BANK\" VALUES(?, ?, ?, ?)";
            const aValues = [ oBank.cuid, oBank.name, oBank.createdby, oBank.createdon ];
            
            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(201).send(JSON.stringify(oBank));
        } catch (e) {
            tracer.catching("/bank", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.put("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Bank put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/bank", req, res);

        try {
            tracer.exiting("/bank", "Bank PUT Works");
            AddToLog(req, db, "Bank PUT Works");

            const db = new dbClass(req.db);

            const oBank = _prepareObject(req.body, req);
            const sSql = "UPDATE \"BANK\" SET \"NAME\" = ?, \"CREATEDBY\" = ?, \"CREATEDON\" = ? WHERE \"BID\" = ?";
						const aValues = [ oBank.name, oBank.createdby, oBank.createdon, oBank.bid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oBank));
        } catch (e) {
            tracer.catching("/bank", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    return app;
};
