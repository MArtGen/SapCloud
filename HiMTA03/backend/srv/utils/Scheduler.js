"use strict";

const request = require('request-promise');
const dbClass = require(global.__base + "utils/dbClass");

function _prepareObject(oVal) {
    let date = new Date();
    oVal.createdby = "AutoUpdate";
    oVal.createdon = date.toDateString().replace(/\s+/g, '-');
    oVal.date = date.toDateString().replace(/\s+/g, '-');
    return oVal;
};

async function AddToLog(req, db, text) {
    const oLog = _prepareObject(req.body, req);
          oLog.text = text;
          oLog.loid = await db.getNextval("loid");

    const iSql = "INSERT INTO \"LOG\" VALUES(?, ?, ?, ?)";
    const aValues = [ oLog.loid, oLog.text, oLog.createdby, oLog.createdon ];
    
    await db.executeUpdate(iSql, aValues);
};

module.exports = {
    async execute(app) {
        try {

            app.get('/currency', async (req) => {
                const db = new dbClass(req.db);

                const result = await db.getVal(`SELECT CUID, NAME FROM \"CURRENCY\"`);

                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++)
                    {
                        const reqOptions = {
                            url: 'http://www.nbrb.by/API/ExRates/Rates/' + result[i].name + '?ParamMode=2',
                            method: 'GET'
                        };
                        const res = await request(reqOptions);
                        const oCourse = _prepareObject(req.body);
                        oCourse.coid = await db.getNextval("coid");
                        oCourse.cuid = result[i].cuid;
                        oCourse.value = res.Cur_OfficialRate;
                        const iSql = "INSERT INTO \"COURSE\" VALUES(?, ?, ?, ?, ?, ?)";
                        const aValues = [ oCourse.coid, oCourse.cuid, oCourse.date, oCourse.value, oCourse.createdby, oCourse.createdon ];
                        await db.executeUpdate(iSql, aValues);
                    };
                    AddToLog(req, db, "New courses was added.");
                };
            });

        } catch (e) {
            next(e);
        };
    }
};	