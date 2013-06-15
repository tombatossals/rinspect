#!/usr/bin/env node

var util = require("util");
var argv = require("optimist").usage("Usage: $0 [diagnose|query-ip [ip]]").demand([ "ip" ]).check(check_parameters).default("password", "").default("username", "guest").demand(1).argv;


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

var f = require(util.format("./common/%s", argv._[0]));
f(argv.ip, argv.username, argv.password);
