var logger = require('./log'),
    http = require('http'),
    settings = require('../config/settings'),
    util = require('util');

function zone_list_networks(zone_id, callback) {
    var options = {
        host: settings.guifinet_api_host,
        path: util.format('%s?command=guifi.zone.list_networks&network_type=ospf&zone_id=%s&timestamp=%s', settings.guifinet_api_path, zone_id, new Date().getTime() )
    };

    var req = http.get(options, function(res) {
        var output = "";
        res.on("data", function(chunk) {
            output += chunk;
        });
   
        res.on("end", function() {
            var obj = JSON.parse(output);
            callback(obj.responses.networks);
        });
    });
}

function node_search_by_ip(ip, network, callback) {
    var options = {
        host: settings.guifinet_api_host,
        path: util.format('%s?command=guifi.node.search_by_ip&ip=%s&timestamp=%s', settings.guifinet_api_path, ip, new Date().getTime() )
    };

    var req = http.get(options, function(res) {
        var output = "";
        res.on("data", function(chunk) {
            output += chunk;
        });
   
        res.on("end", function() {
            var obj = JSON.parse(output);
            var data = {
                name: obj.responses.rows[0].name,
                url: obj.responses.rows[0].url,
                network: network
            }
            callback(data);
        });
    });
}

module.exports.zone_list_networks = zone_list_networks;
module.exports.node_search_by_ip = node_search_by_ip;
