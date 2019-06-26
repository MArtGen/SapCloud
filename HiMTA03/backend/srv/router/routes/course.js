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
        logger.info('Course get <select_all> request');

        try {
            //COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("Course GET Works. <select_all>", "DefaultUser");

            const db = new dbClass(req.db);
            const sSql = 'SELECT * FROM \"COURSE\"';
            var result = await db.getVal(sSql);
            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/coid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Course get <select_by_coid> request');

        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("Course GET Works. <select_by_coid>", "DefaultUser");

            const db = new dbClass(req.db);

            const courId = [ req.query.coid ];
            const sSql = 'SELECT * FROM \"COURSE\" WHERE "COID" = ?';
            var result = await db.executeUpdate(sSql, courId);

            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/actcourse", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Course get <select_by_maxid> request');

        try {
            //COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("Course GET Works. <select_by_maxid>", "DefaultUser");

            const db = new dbClass(req.db);

            const courId = [ req.query.cuid ];
            const sSql = 'SELECT * FROM \"COURSE\" WHERE "CUID" = ? ORDER BY "COID" DESC LIMIT 1';
            var result = await db.executeUpdate(sSql, courId);

            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "DefaultUser");
            next(e);
        }
    });

    app.get("/tablecourse", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('Course get <select_by_maxid> request');

        try {
            //COMMON.checkAjaxAuth(req, "himta.view");
            helper.AddToLog("Course GET Works. Courses for table view", "Cur_display View");

            const db = new dbClass(req.db);

            const sSql = 'SELECT \"COID\", \"NAME\", \"DATE\", \"VALUE\", \"COURSE\".\"CREATEDBY\", \"COURSE\".\"CREATEDON\" FROM \"COURSE\" INNER JOIN \"CURRENCY\" ON \"COURSE\".\"CUID\" = \"CURRENCY\".\"CUID\";';
            var result = await db.getVal(sSql);

            res.type("application/json").status(201).send(JSON.stringify(result));
        } catch (e) {
            helper.AddToLog(e.message, "Cur_display View");
            next(e);
        }
    });

    return app;
};