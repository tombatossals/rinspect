var api = require('mikronode'),
    logger = require('./log'),
    util = require('util');

function getroutes(ip, username, password, zone_id, callback) {

    var connection = new api(ip, username, password);
    connection.on('error', function(err) {
        logger.error(err, ip);
        logger.error(util.format("FATAL: Can't connect to the API: %s %s %s", ip, username, password));
        process.exit(0);
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
                        var route = { distance: item.distance, dstaddress: item["dst-address"], gateway: item.gateway };
                        routes.push(route);
                    }
                    count--;
                    if (count === 0) {
                        callback(zone_id, routes);
                    }
                });
                chan.close();
                conn.close();
            });
        });
    });
}

module.exports.getroutes = getroutes;
