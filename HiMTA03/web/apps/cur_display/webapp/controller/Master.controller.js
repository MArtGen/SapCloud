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
                    var oTable = this.byId("currencyTable");
                    oTable.setModel(oModel, "oData");
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading CURRENCY");
                }.bind(this)
            });

            jQuery.ajax({
                type: "GET",
                url: "/crs/EUR?ParamMode=2",
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    var oFInp = this.byId("inputFirstCourse");
                    var oSInp = this.byId("inputSecCourse");
                    var oData = {
                        recipient: {
                            fcount: Math.round(Number(oFInp._lastValue) * data.Cur_OfficialRate * 100) / 100,
                            course: Number(data.Cur_OfficialRate),
                            fvalue: Number(oFInp._lastValue),
                            scount: Math.round(Number(oSInp._lastValue) * data.Cur_OfficialRate * 100) / 100,
                            svalue: Number(oSInp._lastValue),
                            sum: Math.round(((Number(oFInp._lastValue) * data.Cur_OfficialRate) +
                                 (Number(oSInp._lastValue) * data.Cur_OfficialRate)) * 100) / 100
                        }
                    };
                    var oModel = new JSONModel(oData);
                    this.byId("countPanel").setModel(oModel, "countData");
                    this.byId("countPanel").bindElement("countData>");
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading COURSE EUR");
                }.bind(this)
            })

            var toolPage = this.byId("toolPage");
            var sideExpanded = toolPage.getSideExpanded();
            this._setToggleButtonTooltip(sideExpanded);
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
        },

        onChange: function(oEvent) {
            var sExpend = oEvent.getParameter("expand");
            if(sExpend === true) {
                jQuery.ajax({
                    type: "GET",
                    url: this.host + "/course/tablecourse",
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data){
                        var oModel = new JSONModel(data);
                        var oTable = this.byId("courseTable");
                        oTable.setModel(oModel, "courseModel");
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
                    var oData = {
                        recipient: {
                            fcount: Math.round(Number(oFInp._lastValue) * data.Cur_OfficialRate * 100) / 100,
                            course: Number(data.Cur_OfficialRate),
                            fvalue: Number(oFInp._lastValue),
                            scount: Math.round(Number(oSInp._lastValue) * data.Cur_OfficialRate * 100) / 100,
                            svalue: Number(oSInp._lastValue),
                            sum: Math.round(((Number(oFInp._lastValue) * data.Cur_OfficialRate) +
                                 (Number(oSInp._lastValue) * data.Cur_OfficialRate)) * 100) / 100
                        }
                    };
                    var oModel = new JSONModel(oData);
                    this.byId("countPanel").setModel(oModel, "countData");
                    this.byId("countPanel").bindElement("countData>");
                }.bind(this),
                error: function(oError){
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Error of reading COURSE EUR");
                }.bind(this)
            })
        },

        onCollapseExpandPress: function () {
			var toolPage = this.byId("toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
        },
        
        _setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
        },
        
        onCreateCur: function () {
            sap.m.URLHelper.redirect("/cur_create/index.html");
        },

        onCurList: function () {
            sap.m.URLHelper.redirect("https://himtamag-cf-java-host.cfapps.eu10.hana.ondemand.com/");
        },

        onAuth: function () {
            sap.m.URLHelper.redirect("/route/auth");
        },

        onScope: function () {
            sap.m.URLHelper.redirect("/route/scope");
        },

        onRoutes: function () {
            sap.m.URLHelper.redirect("/route/");
        }
    });
});
