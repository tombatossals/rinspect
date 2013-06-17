var snmp = require("snmp-native");
    logger = require('./log'),
    util = require('util');

function getroutes(ip, username, password, callback) {

    var session = new snmp.Session({ host: ip, port: 161, community: 'public' });
    session.get({ oid: [ 1, 3, 6, 1, 2, 1, 4, 24, 4, 1, 4 ], type: 4 }, function (error, varbind) {
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbind.oid + ' = ' + varbind.value + ' (' + varbind.type + ')');
        }
    });
}

module.exports.getroutes = getroutes;
