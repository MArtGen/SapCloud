"use strict";

module.exports = (app, server) => {
    app.use("/bank", require("./routes/bank")());
    app.use("/currency", require("./routes/currency")());
    app.use("/course", require("./routes/course")());
    app.use("/log", require("./routes/log")());
    app.use("/bankcur", require("./routes/bankcur")());
};
