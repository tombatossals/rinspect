rinspect
========

Inspection utility of the OSPF routing table of a router connected to the guifi.net network. It can analyze the routing table of a working router (Mikrotik branch only for now), compare this routing table with the official guifi.net registered routes, and generate a report with the inconsistencies.

How does it works
-----------------

 * Queries the router via "SNMP" or "Mikrotik API" and gets the routing table.
 * Connects to the guifi.net API and get the official routes for your zone.
 * Compare both results, getting a report of the networks not matching.

How to install
--------------

First we must check the git repository:

    $ git clone https://github.com/tombatossals/rinspect.git
    Cloning into 'rinspect'...
    remote: Counting objects: 46, done.
    remote: Compressing objects: 100% (34/34), done.
    remote: Total 46 (delta 17), reused 34 (delta 9)
    Unpacking objects: 100% (46/46), done.

Now we must install the node.js dependencies:

    $ cd rinspect
    $ npm install
    npm http GET https://registry.npmjs.org/winston
    npm http GET https://registry.npmjs.org/ssh2
    npm http GET https://registry.npmjs.org/grunt-contrib-jshint
    npm http GET https://registry.npmjs.org/grunt
    npm http GET https://registry.npmjs.org/grunt-contrib-watch
    npm http GET https://registry.npmjs.org/grunt-cli
    ...
    ├── lodash@1.1.1
    ├── http-proxy@0.10.3 (pkginfo@0.2.3, utile@0.1.7)
    ├── log4js@0.6.6 (dequeue@1.0.3, semver@1.1.4, async@0.1.15, readable-stream@1.0.2)
    ├── istanbul@0.1.22 (abbrev@1.0.4, which@1.0.5, fileset@0.1.5, nopt@2.0.0, wordwrap@0.0.2, async@0.1.22, mkdirp@0.3.5, escodegen@0.0.23, handlebars@1.0.12, esprima@0.9.9)
    └── socket.io@0.9.16 (base64id@0.1.0, policyfile@0.0.4, redis@0.7.3, socket.io-client@0.9.16)
    $

  
The application is ready to use:

    $ ./rinspect.js --ip 10.228.144.161
    Checking...
    The published OSPF network 10.90.97.72/29 overlaps with the published OSPF network 10.90.97.64/27
    The published OSPF network 10.228.140.64/27 overlaps with the published OSPF network 10.228.140.80/29
    The published OSPF network 10.90.74.144/29, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 10.90.74.160/29, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 10.90.74.224/29, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 10.90.97.64/27, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 10.228.133.201/32, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 10.228.178.128/25, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    The published OSPF network 150.128.0.0/16, coming from UJI Humanas (http://guifi.net/node/31843) is not registered on guifi.net
    



