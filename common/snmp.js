var snmp = require("snmp-native"),
    Netmask = require('netmask').Netmask,
    logger = require('./log'),
    util = require('util');

function extractRoute(value) {
    var route = {};
    if (value instanceof Array) {
        var ip = value.splice(11, 4).join(".");
        var netmask = value.splice(11, 4).join(".");
        var gateway = value.splice(12, 4).join(".");
        var block = new Netmask(ip, netmask);
        var dstaddress = util.format("%s/%s", block.base, block.bitmask);
        route.dstaddress = dstaddress;
        route.gateway = gateway;
        route.distance = 110;
    }
    return route;
}

function getSNMPOSPFRoutes(ip, callback) {

    var session = new snmp.Session({ host: ip, port: 161, community: 'public' });
    var oids = {
                   ipCidrRouteDest: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 1 ],
                   ipCidrRouteProto: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 7 ]
                   //ipCidrRouteMask: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 2 ],
                   //ipCidrRouteNextHop: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 4 ],
                   //ipCidrRouteMetric1: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 11 ]
               };

    session.getSubtree({ oid: oids.ipCidrRouteProto }, function (error, varbind) {
        session.close();
        var result = []; 
        for (var j in varbind) {
            if (varbind[j].value !== 13) continue; // OSPF
            var value = varbind[j].oid;
            var route = extractRoute(value);
            result.push(route);
        }
        callback(result);
    });
}

function getroutes(ip, username, password, zone_id, callback) {
    getSNMPOSPFRoutes(ip, function(routes) {
        callback(zone_id, routes);
    });
}

module.exports.getroutes = getroutes;
