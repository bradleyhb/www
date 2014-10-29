/**
 * Angular Service: AWSFactory
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('AWSFactory', AWSFactory);

    AWSFactory.$inject = ['HelperFactory'];

    function AWSFactory(HelperFactory) {

        /** AWS CONFIG **/
        var creds = {
                secretAccessKey: '',
                accessKeyId: '',
                endpoint: 's3-us-west-2.amazonaws.com',
                region: 'us-west-1'
            },
            bucket = new AWS.S3(creds);

        return {
            fileUpload: fileUpload
        };
        
        ////////////////////////////////////////////////////////////////////

        /**
         * Function: fileUpload
         *
         * Upload file to AWS S3.
         */
        function fileUpload() {
            var params = {
                Bucket: 'silkscreen',
                // ACL: 'public-read',
                Key: 'testfile3.jpg',
                ContentType: 'image/jpeg',
                Body: 'D:\\Documents\\Capture.PNG'
            };

            // bucket.putObject(params, function(err, data) {
            //     console.log(err);
            //     console.log(data);
            // });
            // bucket.getObject({Bucket: 'silkscreen', Key: 'testfile.jpg'}, function(err, data) {
            //     console.log(err);
            //     console.log(data);
            // });
        }
    }
})();