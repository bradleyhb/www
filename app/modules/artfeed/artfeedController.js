(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('ArtFeedController', ArtFeedController);

		ArtFeedController.$inject = ['HelperFactory', 'FirebaseFactory', 'AWSFactory'];

		function ArtFeedController(HelperFactory, FirebaseFactory, AWSFactory){
			var vm = this;

			vm.items = [];
			vm.retrieveData = retrieveData;


        	var limit = 10,
            startAt = '-JZx4GMVeSydJSs9tBZM',
            isPollRunning = false;

			AWSFactory.fileUpload();


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

		};

})();
