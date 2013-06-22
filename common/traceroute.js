#!/usr/bin/env node

var Netmask = require('netmask').Netmask,
    traceroute = require('traceroute'),
    zone_list_networks = require('./guifi_api_client').zone_list_networks,
    node_search_by_ip = require('./guifi_api_client').node_search_by_ip,
    util = require("util");

function getFirstKey(obj) {
    var r = [];
    for (var k in obj) {
        if (!obj.hasOwnProperty(k)) {
            continue;
        }
        return k;
    }
}

function get_guifi_ips(hops, callback) {
    var count = hops.length;
    var ips = new Object();

    for (var i in hops) {
        var hop = hops[i];
        var ip = getFirstKey(hop);
        node_search_by_ip(ip, undefined, function(data) {
            if (data) {
                ips[data.ip] = { time: hop[ip], name: data.name, url: data.url };
            }

            if (count === 1) {
                callback(ips);
            } else {
                count = count - 1;
            }
        });
    }
}

function query(ip) {
    traceroute.trace(ip, function(err, hops) {
        get_guifi_ips(hops, function(ips) {
            for (var i in hops) {
                var hop = hops[i];
                var ip = getFirstKey(hop);
                var data = ips[ip];
                console.log(util.format("Hop %s: %s [ %s (%s) ]", i, ip, data.name, data.url));
            }
        });
    });
}

module.exports = query;
