#!/usr/bin/env node

var util = require("util"),
    settings = require("./config/settings"),
    argv = require("optimist").usage("Usage: $0 [diagnose|query-ip [ip]]").demand([ "ip" ]).check(check_parameters).default("password", "").default("username", "guest").default("zone", "País Valencià").demand(1).argv;


function check_parameters(argv) {
    var sections = [ "diagnose", "query-ip" ]
    for (var i=0; i<argv._.length; i++) { 
        var argument = argv._[i];
        if (sections.indexOf(argument) === -1) {
            return false;
        }
    }
    return true;
}

var zone_id = settings.zones[argv.zone];
var f = require(util.format("./common/%s", argv._[0]));
f(argv.ip, argv.username, argv.password, zone_id, argv.method);
