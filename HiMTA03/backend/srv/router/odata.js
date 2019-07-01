/*eslint no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */
"use strict";

const dbClass = require(global.__base + "utils/dbClass");
const helper = require(global.__base + "utils/Helper");
const COMMON = require(global.__base + "utils/common");

const addWhereClause = (req, aWhere) => {
    req.query.SELECT.where = req.query.SELECT.where ?
        req.query.SELECT.where.concat(["and"]).concat(aWhere) : aWhere;
};

const getCreatedByClause = sCreatedBy => [{
    ref: ["createdby"]
}, "=", {
    val: sCreatedBy
}];

module.exports = function () {
    this.before("READ", req => {
        req.log.debug(`BEFORE_READ ${req.target["@Common.Label"]}`);

        //restrict by createdby
        addWhereClause(req, getCreatedByClause("Scheduler"));

        req.log.debug(req.body);
    });

    this.on("CREATE", "log", async (log) => {
        COMMON.checkOdataAuth(req, "himta.edit");
        req.log.debug(`ON CREATE ${req.target["@Common.Label"]}`);

        const {
            data
        } = log;
        if (data.length < 1) {
            return null;
        }

        var client = await dbClass.createConnection();
        let db = new dbClass(client);

        if (!data.loid) {
            data.loid = await db.getNextval("loid");
        }
        data.text = "Newest courses were added";
        const oLog = helper._prepareObject(data, "AutoBot");
        oLog.text = data.text;
        const sSql = `INSERT INTO "LOG" VALUES(?,?,?,?)`
        const aValues = [data.loid, data.text, data.createdby, data.createdon];

        req.log.debug(aValues);
        req.log.debug(sSql);
        await db.executeUpdate(sSql, aValues);

        return data;
    });

    this.after("READ", (entity) => {
        if (entity.length > 0) {
            entity.forEach(item => item.createdby = "OdataAutoBot");
        }
    });
};