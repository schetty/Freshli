'use strict';
var mongoHost = "ds145009.mlab.com",
    mongoPort = 45009,
    mongoUser = "svc-inventory",
    creds = mongoUser + ":PZJ8YHuwNfEV@";

var config = {
    mongoDbUrl: 'mongodb://' + creds + mongoHost + ":" + mongoPort + "/heroku_h2313rvj",
    serverPort: process.env.PORT || 8080,
    serverHost: "0.0.0.0"
};

module.exports = config;