#!/usr/bin/env node

var util = require("util"),
    settings = require("./config/settings"),
    argv = require("optimist").usage("Usage: $0 [diagnose|traceroute]").demand([ "ip" ]).check(check_parameters).default("password", "").default("username", "guest").default("zone", "País Valencià").default("method", "snmp").argv;


function check_parameters(argv) {
    var sections = [ "diagnose", "traceroute" ];
    for (var i=0; i<argv._.length; i++) { 
        var argument = argv._[i];
        if (sections.indexOf(argument) === -1) {
            return false;
        }
    }
    return true;
}

var command = settings.default_command;
var zone_id = settings.zones[argv.zone];
var method = settings.query_mode;

if (argv._[0]) {
    command = argv._[0];
}

if (argv.method) {
    method = argv.method;
}
    
var f = require(util.format("./common/%s", command));
f(argv.ip, argv.username, argv.password, zone_id, method);
