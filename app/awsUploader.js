(function() {
    'use strict';

    var http = require('http');
    var AWS = require('aws-sdk');

    var key = process.argv[2];
    var url = process.argv[3];
    var req = http.get(url, httpResponse);

    /**
     * Function: httpResponse
     */
    function httpResponse(resp) {
        var buf = new Buffer('', 'binary');
        var creds = {
                secretAccessKey: 'W/xjubA3Uz6CZZNZisqGXvBYlneDOCSocnRiw/LL',
                accessKeyId: 'AKIAIEWGYPH26LKZJSBA',
                endpoint: 's3-us-west-2.amazonaws.com',
                region: 'us-west-1'
            };
        var bucket = new AWS.S3(creds);

        resp.on('data', function(chunk) {
            buf = Buffer.concat([buf, chunk]);
        });

        resp.on('end', function() {
            var params = {
                ContentLength: buf.length,
                ContentType: resp.headers['content-type'],
                Bucket: 'silkscreen',
                Body: buf,
                ACL: 'public-read',
                Key: key
            };

            bucket.putObject(params, function(err, data) {
                if (err) {
                    console.log('S3 Error: ' + err);
                } else {
                    console.log('S3 Data: ' + JSON.stringify(data));
                }
            });
        });
    }
})();