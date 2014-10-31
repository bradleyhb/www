(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ClientController', ClientController);

    /**
     * Angular Controller: ClientController
     */
    ClientController.$inject = ['HelperFactory','FirebaseFactory', 'AWSFactory'];

    function ClientController(HelperFactory, FirebaseFactory, AWSFactory) {
        
        var vm = this;

        vm.items = [];
        vm.retrieveData = retrieveData;

        var limit = 10,
            startAt = '-JZx4GMVeSydJSs9tBZM',
            isPollRunning = false;

        // retrieveData();

        AWSFactory.fileUpload();
        
        ////////////////////////////////////////////////////////////////////

        /**
         * Function: retrieveData
         *
         * Retrieve data from Firebase
         */
        function retrieveData() {
            if (!isPollRunning) {
                isPollRunning = true;
                var prevStartAt = startAt;
                var x = 0;
                console.log('asd');
                FirebaseFactory.getData(startAt, limit, function(response) {
                    startAt = response.hc.path.m[0];
                    console.log(response.val());
                    if (prevStartAt != startAt) {
                        vm.items.push(response.val());
                        HelperFactory.rootScopeDigest();
                    }

                    if (++x >= limit) isPollRunning = false; 
                });
            }
        }


            $('#artfeed-a').click(function(){
                $('body').css('overflow-y', 'hidden');
            });
    }
})();