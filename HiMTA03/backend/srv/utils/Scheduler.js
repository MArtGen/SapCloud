"use strict";

const request = require('request-promise');
const dbClass = require(global.__base + "utils/dbClass");
const helper = require(global.__base + "utils/Helper");

module.exports = {
    async execute() {
        try {
            let clientPromise = dbClass.createConnection();
            let db = new dbClass(await clientPromise);
            let result = await db.getVal(`SELECT CUID, NAME FROM \"CURRENCY\"`);
            for (let i = 0; i < result.length; i++)
            {
                let oCourse = helper._prepareObject({ coid: 1000, cuid: '', createdby: '', createdon: '', date: '', value: '' }, "Scheduler");
                let coId = function () { 
                    return new Promise ((resolve) => {                        
                        let coid = db.getNextval("coid"); 
                        resolve(coid);
                    })
                    .then ((coid) => { oCourse.coid = coid; });
                };
                let reqBank = new Promise((resolve) => { 
                    let reqOptions = {
                        url: 'https://www.nbrb.by/API/ExRates/Rates/' + result[i].NAME +'?ParamMode=2',
                        method: 'GET'
                    };
                    let res = request(reqOptions);
                    resolve(res); 
                })
                .then ((res) =>{
                    oCourse.value = JSON.parse(res).Cur_OfficialRate;
                })
                .then (coId)
                .then (() => {                    
                    oCourse.cuid = result[i].CUID;    
                });
                Promise.all([reqBank, coId])
                .then(() => { 
                    let iSql = "INSERT INTO \"COURSE\" VALUES(?, ?, ?, ?, ?, ?)";
                    let aValues = [ oCourse.coid, oCourse.cuid, oCourse.date, oCourse.value, oCourse.createdby, oCourse.createdon ];
                    db.executeUpdate(iSql, aValues); })
                .catch(e => console.log(e.message))
                .then(() => { helper.AddToLog("New course for " + result[i].NAME + " was added.", "Scheduler"); })
            };
        } catch (e) {
            helper.AddToLog("Error of Scheduler: " + e.message, "Scheduler");
            console.log("Error of Scheduler: " + e.message);
        };
    }
};	