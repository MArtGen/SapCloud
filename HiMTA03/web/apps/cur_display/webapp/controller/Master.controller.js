sap.ui.define([
    "cur_display/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("cur_display.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            //this.host = "http://localhost:3000";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://c5277740trial-trial-dev-router.cfapps.eu10.hana.ondemand.com";

            jQuery.ajax({
                type: "GET",
                url: this.host + "/currency",
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    var oModel = new JSONModel(data);
                    var oTable = this.byId("CurrencyTable");
                    oTable.setModel(oModel, "oData");
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading CURRENCY");
                }.bind(this)
            });
        },

        onChange: function(oEvent) {
            var sExpend = oEvent.getParameter("expand");
            if(sExpend === true) {
                jQuery.ajax({
                    type: "GET",
                    url: this.host + "/course",
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data){
                        var oModel = new JSONModel(data);
                        var oTable = this.byId("CourseTable");
                        oTable.setModel(oModel, "oData");
                    }.bind(this),
                    error: function(oError){
                        jQuery.sap.log.error(oError);
                        sap.m.MessageBox.error("Error of reading COURSE");
                    }.bind(this)
                });
            };
        },

        onCount: function() {
            jQuery.ajax({
                type: "GET",
                url: "/crs/EUR?ParamMode=2",
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    var oFInp = this.byId("inputFirstCourse");
                    var oSInp = this.byId("inputSecCourse");
                    var fText = this.byId("firstCourse");
                    var sText = this.byId("secondCourse");
                    var sum = this.byId("sum");
                    var oFData = {
                        count: Number(oFInp._lastValue) * data.Cur_OfficialRate,
                        course: data.Cur_OfficialRate,
                        value: Number(oFInp._lastValue)
                    };
                    var oSData = {
                        count: Number(oSInp._lastValue) * data.Cur_OfficialRate,
                        course: data.Cur_OfficialRate,
                        value: Number(oSInp._lastValue)
                    };
                    var sumData = { sum: oFData.count + oSData.count }
                    var oFModel = new JSONModel(oFData);
                    var oSModel = new JSONModel(oSData);
                    var sumModel = new JSONModel(sumData);
                    fText.setModel(oFModel);
                    sText.setModel(oSModel);
                    sum.setModel(sumModel);
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading COURSE EUR");
                }.bind(this)
            })
        }
    });
});
