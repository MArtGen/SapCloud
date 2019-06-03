/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

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
        logger.info('Course get <select_all> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/course", req, res);

        try {
            tracer.exiting("/course", "Course GET Works. <select_all>");
            AddToLog(req, db, "Course GET Works. <select_all>");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"COURSE\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/course", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/coid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Course get <select_by_coid> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/course/coid", req, res);

        try {
            tracer.exiting("/course/coid", "Course GET Works. <select_by_coid>");
            AddToLog(req, db, "Course GET Works. <select_by_coid>");

            const db = new dbClass(req.db);

            const courId = [ req.query.coid ];
            const sSql = 'SELECT * FROM \"COURSE\" WHERE "COID" = ?';
            var result = await db.executeUpdate(sSql, courId);

            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/course/coid", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    app.get("/actcourse", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Course get <select_by_maxid> request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/course/actcourse", req, res);

        try {
            tracer.exiting("/course/actcourse", "Course GET Works. <select_by_maxid>");
            AddToLog(req, db, "Course GET Works. <select_by_maxid>");

            const db = new dbClass(req.db);

            const courId = [ req.query.coid ];
            const sSql = 'SELECT * FROM \"COURSE\" WHERE "CUID" = ? ORDER BY "COID" DESC LIMIT 1';
            var result = await db.executeUpdate(sSql, courId);

            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            tracer.catching("/course/actcourse", e);
            AddToLog(req, db, e.message);
            next(e);
        }
    });

    return app;
};