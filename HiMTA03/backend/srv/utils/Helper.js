/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0, dot-notation:0, no-use-before-define:0 */
/*eslint-env node, es6 */
"use strict";

const dbClass = require(global.__base + "utils/dbClass");
const COMMON = require(global.__base + "utils/common");

function _prepareObject(oVal, req) {
    let date = new Date();
    const user = COMMON.getAjaxUser(req);
    oVal.createdby = user;
    oVal.createdon = date.toDateString().replace(/\s+/g,'-') + ' ' + 
                     date.getHours() + ':' +
                     date.getMinutes() + ':' +
                     date.getSeconds();
    oVal.date = date.toDateString().replace(/\s+/g, '-');
    return oVal;
};
    
async function AddToLog(text, createdby) {
    let clientPromise = dbClass.createConnection();
    let db = new dbClass(await clientPromise);
    let oLog = _prepareObject({loid: 1000, text: '', createdby: '', createdon: ''}, createdby);
        oLog.text = text;
        oLog.loid = await db.getNextval("loid");
    let iSql = "INSERT INTO \"LOG\" VALUES (?, ?, ?, ?)";
    let aValues = [ oLog.loid, oLog.text, oLog.createdby, oLog.createdon ];
        
    await db.executeUpdate(iSql, aValues);
};


module.exports = {
    _prepareObject: _prepareObject,
    AddToLog: AddToLog
};