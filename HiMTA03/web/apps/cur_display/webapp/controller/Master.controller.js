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
                url: "http://www.nbrb.by/API/ExRates/Rates/EUR?ParamMode=2",
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    var oInp = this.byId("inputCourse");
                    var oData = {
                        count: Number(oInp._lastValue) * data.Cur_OfficialRate
                    } 
                    var oModel = new JSONModel(oData);
                    this.getView().setModel(oModel);
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading COURSE EUR");
                }.bind(this)
            })
        }
    });
});
