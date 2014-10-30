(function () {
	'use strict'

	angular
		.module('myApp')
		.config(RouteConfig);

		RouteConfig.$inject = ['$routeProvider'];

		function RouteConfig($routeProvider){
			var templateDir = 'app/modules/';
			
			// $locationProvider.html5Mode(true);
			$routeProvider
				.when('/', {
					templateUrl: templateDir + 'client/client.html',
					controller: 'ClientController',
					controllerAs: 'client'
				})

				.when('/artwork/:imgurl', {
					templateUrl: templateDir + 'artwork/artwork.html',
					controller: 'ArtWorkController',
					controllerAs: 'artwork'
				})

				.when('/artfeed', {
					templateUrl: templateDir + 'artfeed/art_feed.html',
					controller: 'ArtFeedController',
					controllerAs: 'artfeed'
				})

				.otherwise({redirectTo: '/'});
		}
})();