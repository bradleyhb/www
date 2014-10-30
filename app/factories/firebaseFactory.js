/**
 * Angular Service: FirebaseFactory
 */
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('FirebaseFactory', FirebaseFactory);

    function FirebaseFactory() {
        
        var dataRef = new Firebase('https://crackling-inferno-7542.firebaseIO.com');

        return {
            pushData: pushData,
            setData: setData,
            getData: getData,
            getViewLargeImage: getViewLargeImage,
        };
        
        //////////////////////////////////////////////////////////////////////////////    
        
        /**
         * Function: setData
         *
         * Saves a data to Firebase
         *
         * Parameters:
         * 
         *     (Object) data - The data object to be pushed to Firebase
         */
        function setData(data) {
            dataRef.set(data);
        }

        /**
         * Function: pushData
         *
         * Push a data to Firebase
         *
         * Parameters:
         * 
         *     (Object) data - The data object to be pushed to Firebase
         */
        function pushData(data) {
            dataRef.push(data);
        }

        /**
         * Function: getData
         *
         * Retrieve data in Firebase
         *
         * Parameters:
         * 
         *     (Object) callback - The callback receiver to be executed upon return result
         */
        function getData(startAt, limit, callback) {
            var refQuery = dataRef;
            if (startAt) refQuery = refQuery.startAt(null, startAt);
            refQuery.limit(limit).on('child_added', callback);
        }

        function getViewLargeImage(callback) {
            dataRef.on('child_added', callback);
        }
    }
})();