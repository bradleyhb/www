/**
 * Angular Service: HelperFactory
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('HelperFactory', HelperFactory);
    
    HelperFactory.$inject = ['$rootScope'];

    function HelperFactory($rootScope) {

        return {
            rootScopeDigest: rootScopeDigest,
            htmlStringToDom: htmlStringToDom,
            dataURItoBlob: dataURItoBlob
        };
        
        ////////////////////////////////////////////////////////////////////

        /**
         * Function: htmlStringToDom
         *
         * Parses an HTML string to DOM.
         *
         * Parameters:
         * 
         *     (String) htmlString - The HTML string
         *
         * Returns:
         * 
         *     (Object) - The DOM Object
         */
        function htmlStringToDom(htmlString) {
            var parser = new DOMParser(),
                doc = parser.parseFromString(htmlString, 'text/html');

            return doc;
        }

        /**
         * Function: rootScopeDigest
         *
         * Update $rootScope views
         */
        function rootScopeDigest() {
            if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
                $rootScope.$apply();          
            }
        }

        /**
         * Function: dataURItoBlob
         *
         * Converts the data URI to BLOB
         *
         * Parameters:
         * 
         *     (Object) imgDOM - The image DOM.
         *
         * Returns:
         * 
         *     (Blob) - The converted data to Blob.
         */
        function dataURItoBlob(imgDOM) {

            // Create a temporary canvas object
            var canvas = document.createElement('canvas');
            canvas.width = imgDOM.width;
            canvas.height = imgDOM.height;

            // Copy image content to canvas
            var canvasCtx = canvas.getContext('2d');
            canvasCtx.drawImage(imgDOM, 0, 0);

            // Get the data from the canvas context
            var data = canvas.toDataURL('image/jpeg');

            console.log(canvasCtx);
        }

    }
})();