app.controller('mainController', function($scope, $http, $localStorage, $location) {
  $scope.logout = function(){
    $localStorage.$reset();
    $location.path('/');
  }
});

app.controller('HomeController', function($scope, $http, $location, game_service){

});

app.controller('LoginController', function($scope, $anchorScroll, $location, $http){
  $scope.place = 'Login';
  $scope.playerVars = {
      controls: 0,
      autoplay: 1
  };
  $scope.getPlaylist = function() {
    // GET https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=hits%2C+vevo&type=video&key={YOUR_API_KEY}
    $http.get("url to server", function() {
      // send get request data for query to youtube
    })
  }
  $scope.theBestVideo = 'sMKoNBRZM1M';
  $scope.googleauth = function(){
    window.location= config.host+'auth/google'
  }
  $scope.toAbout = function() {
   $location.hash('about');
   $anchorScroll();
 };
});

app.controller('authController', function($scope, $http,$routeParams,$localStorage, $location){
  // Get token out of header and set in local storage
  $localStorage.token = $routeParams.token;
  $location.path('/home')

})
