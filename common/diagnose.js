#!/usr/bin/env node

var getroutes = require("./mikrotik").getroutes;
var Netmask = require('netmask').Netmask;
var util = require("util");

function diagnose(ip, username, password) {

    function checkroutes(routes) {
        console.log("Redes no directamente conectadas al router de un rango diferente al 10.0.0.0/8:")
        for (i in routes) {
            var route = routes[i];
            var block = new Netmask(route.dstaddress);
            if (!block.base.match(/^10\./) && route.distance > 0) {
            	console.log(util.format("%s/%s", block.base, block.bitmask));
            }
        }

        console.log("Redes publicadas con un rango diferente al /30, /29 o /27:");
        for (i in routes) {
            var route = routes[i];
            var block = new Netmask(route.dstaddress);
            if ([30, 29, 27].indexOf(block.bitmask) === -1 && route.distance > 0) {
            	console.log(util.format("%s/%s", block.base, block.bitmask));
            }
        }
    }

    getroutes("10.228.144.161", "guest", "", checkroutes);

}

module.exports = diagnose
