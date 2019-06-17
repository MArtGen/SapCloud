"use strict";

const https = require("https");
const port = process.env.PORT || 3000;
const server = require("http").createServer();
const xsenv = require("@sap/xsenv");
const xssec = require("@sap/xssec");
const xsHDBConn = require("@sap/hdbext");
const express = require("express");
const logging = require("@sap/logging");
const compression = require("compression");
const cds = require("@sap/cds");
const bodyParser = require('body-parser');
const passport = require("passport");

if (process.argv[2] === "--debug") {
    global.DEBUG_MODE = true;
    //Load environment variables for CLOUD
    xsenv.loadEnv("debug-env.json");
}

https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + "/";

// Initialize Express App
const app = express();

//Body parser
app.use(bodyParser.json());

//logging
const appContext = logging.createAppContext();
app.use(logging.middleware({
    appContext: appContext,
    logNetwork: true
}));

//Compression
app.use(compression({
    threshold: "1b"
}));

/* const hanaOptions = xsenv.getServices({
    hana: {
        plan: "hdi-shared"
    }
}); */

let hanaOptions = {
    hana: {
        host: "zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com",
        port: "21513",
        encrypt: true,
        sslValidateCertificate: false,
        driver: "com.sap.db.jdbc.Driver",
        url: "jdbc:sap://zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com:21513?encrypt=true&validateCertificate=false&currentschema=SHARED",
        schema: "SHARED",
        hdi_user: "SHARED_CBJPD5ZEY2VWMI2TMU60N5KLH_DT",
        hdi_password: "Xo1EIbTesySzHTSrzclc2oSsEA6MtIm89fBYN9zajxqfK0v88Rerhb-Az8jOioO6.Bv4Vr7JzQrQtyasZZaf.ykgNrnwBI1qZQk6IVolNfkLIj2n.y.kgCpDk-1ongR1",
        user: "SHARED_CBJPD5ZEY2VWMI2TMU60N5KLH_RT",
        password: "Tk9t.8bpaTPELse31B9_0V4D6aZ_2wUN7tlt27KG7OE9EF56uD3qUH-wAmg_s4QA-9bnvUoM-0NlTc-OnpLG3081H2UipQbnSAJuC6-voTcj0kNmWlBp3pw_ihrNK8z."
    }
};

//Build a JWT Strategy from the bound UAA resource
passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
    uaa: {
        tag: "xsuaa"
    }
}).uaa));

app.use(passport.initialize());

if (!global.DEBUG_MODE) {
    app.use(
        passport.authenticate("JWT", {
            session: false
        })
    );
}

hanaOptions.hana.pooling = true;
app.use(
    xsHDBConn.middleware(hanaOptions.hana)
);

//CDS OData V4 Handler
cds.connect({
    kind: "hana",
    logLevel: "info",
    credentials: hanaOptions.hana
});
cds
    .serve("gen/csn.json", {
        crashOnError: false
    })
    .at("/odata/")
    .with(require("./router/odata.js"))
    .in(app)
    .catch(err => {
        // do not crash on error
    });

//Setup Routes
require("./router")(app, server);

const schedulerExecute = require(global.__base + "utils/Scheduler").execute;
schedulerExecute();
setInterval(schedulerExecute, 12 * 60 * 60 * 1000);

//Error handling
app.use(function (err, req, res, next) {
        res.status(500).send({
            "msgId": "",
            "type": "Error",
            "msg": err.message
        });
});

//Start the Server
server.on("request", app);
server.listen(port, () => {
    console.info(`HTTP Server: ${server.address().port}`);
});