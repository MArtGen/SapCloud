sap.ui.define([
    "cur_create/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("cur_create.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            //this.host = "http://localhost:3000/api";
            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://c5277740trial-trial-dev-router.cfapps.eu10.hana.ondemand.com";

            this.oDataModel = new JSONModel({
                toCurrency: {}
            });
            this.getView().setModel(this.oDataModel, "data");
        },


        onSave: function(){
            var oData = this.oDataModel.getData();

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "POST",
                url: this.host + "/currency",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function(data){
                    sap.m.MessageBox.success("Creating was sucessful");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                }.bind(this),
                error: function(oError) {
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Creating failed");
                }.bind(this)
            });
        },

        onCancel: function(){
            this.oDataModel.setData();
        }     
    });
});
