var app = angular.module('mvb', ['ngRoute','ngStorage', 'angularMoment', 'youtube-embed']);

app.config(function($routeProvider,$httpProvider) {
    $routeProvider
      .when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/authenticate/:token',{
        templateUrl:'/partials/auth.html',
        controller: 'authController'
      })
      .otherwise({redirectTo: "/login"})

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
         return {
             'request': function (config) {
                 config.headers = config.headers || {};
                 if ($localStorage.token) {
                     config.headers.token = $localStorage.token;
                 }
                 return config;
             },
             'responseError': function (response) {
                 if (response.status === 401 || response.status === 403) {
                     $location.path('/login');
                 }
                 return $q.reject(response);
             }
         };
      }]);
});

app.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/navbar.html'
  };
});

app.directive('game', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/batch.html'
  };
});

app.factory('game_service', function($http, ENV){
  return {
    getVideos:function(){
      return $http.get('insert api endpoint here').then(function(data){
        return data.data;
      });
    },
    createGame:function(game){
      return $http.post('insert api endpoint here', game);
    }
  };
});
