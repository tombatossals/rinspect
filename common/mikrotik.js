var api = require('mikronode'),
    logger = require('./log'),
    util = require('util');

function getroutes(ip, username, password, callback) {

    var connection = new api(ip, username, password);
    connection.on('error', function(err) {
        logger.error(err, ip);
        logger.error(util.format("FATAL: Can't connect to the API: %s %s %s", ip, username, password));
        callback();
        //process.exit(0);
    });

    connection.connect(function(conn) {
        var chan=conn.openChannel();
        chan.write('/ip/route/print',function() {
            chan.on('done',function(data) {
                var parsed = api.parseItems(data);
                var routes = [];
                var count = parsed.length;
                parsed.forEach(function(item) {
                    if (item.disabled === "false") {
                        var route = { distance: item.distance, dstaddress: item["dst-address"] };
                        routes.push(route);
                    }
                    count--;
                    if (count === 0) {
                        callback(routes);
                    }
                });
                chan.close();
                conn.close();
            });
        });
    });
}

function getips(ip, username, password, callback) {

    var connection = new api(ip, username, password);
    connection.on('error', function(err) {
        logger.error(err, ip);
        logger.error(util.format("FATAL: Can't connect to the API: %s %s %s", ip, username, password));
        callback();
        //process.exit(0);
    });

    connection.connect(function(conn) {
        var chan=conn.openChannel();
        chan.write('/ip/address/print',function() {
            chan.on('done',function(data) {
                var parsed = api.parseItems(data);
                var interfaces = [];
                var count = parsed.length;
                parsed.forEach(function(item) {
                    var iface = { name: item.interface, address: item.address };
                    interfaces.push(iface);
                    count--;
                    if (count === 0) {
                        callback(interfaces);
                    }
                });
                chan.close();
                conn.close();
            });
        });
    });
}

function traceroute(ip, username, password, remoteip, callback) {

    var connection = new api(ip, username, password);
    connection.on('error', function(err) {
        console.log("ERROR", err);
        callback();
    });

    connection.connect(function(conn) {
        var chan=conn.openChannel();
        chan.write([ '/tool/traceroute', '=address=' + remoteip ], function() {
            chan.on('done', function(data) {
                var parsed = api.parseItems(data);
                var path = [];
                var count = parsed.length;
                parsed.forEach(function(item) {
                    if (item.address.search("10.") == 0 || item.address.search("172.") == 0) {
                        path.push(item.address);
                    }
                    count--;
                    if (count === 0) {
                        callback(path);
                    }
                });
                chan.close();
                conn.close();
            });
        });
    });
}

module.exports.traceroute = traceroute;
module.exports.getips = getips;
module.exports.getroutes = getroutes;
