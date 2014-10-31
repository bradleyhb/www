(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('ArtWorkController', ArtWorkController);

		ArtWorkController.$inject = ['$routeParams', 'HelperFactory', 'FirebaseFactory', 'AWSFactory'];

		function ArtWorkController($routeParams, HelperFactory, FirebaseFactory, AWSFactory){
			var vm = this;

		    vm.imgIdx = $routeParams.imgurl;
			vm.items = [];
			vm.viewLargeImage = viewLargeImage;

			AWSFactory.fileUpload();

			viewLargeImage();

			function viewLargeImage() {
	            FirebaseFactory.getViewLargeImage(function(response) {
	                vm.items.push(response.val());
	                HelperFactory.rootScopeDigest();
	            });
	        }

		};
			
})();

