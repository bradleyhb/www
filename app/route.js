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
					templateUrl: templateDir + 'client/client.Html',
					controller: 'ClientController',
					controllerAs: 'client'
				})

				.when('/artwork/:imgurl', {
					templateUrl: templateDir + 'artwork/artwork.Html',
					controller: 'ArtWorkController',
					controllerAs: 'artwork'
				})

				.when('/dashboard', {
					templateUrl: templateDir + 'dashboard/dashboard.Html',
					controller: 'ClientController',
					controllerAs: 'client'
				})

				.otherwise({redirectTo: '/'});
		}
})();