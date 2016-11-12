var dailyApp = angular.module("daily");
dailyApp.controller("signupCompleteController", ["$scope", "$rootScope", "$state", "$location", "$http", "$rootScope", "$window", "authenticationSvc", "$timeout",
 function ($scope, $rootScope, $state, $location, $http, $rootScope, $window, authenticationSvc, $timeout) {
    function init() {
      $scope.showMessage = false;
      $scope.token = $state.params.token;
      if ($scope.token) {
        authenticationSvc.activationUser($scope.token).then(function(result){
          $scope.message = result.success.message || result.error.message;
          $timeout(function() {
            $state.go('login');
          }, 5000);
        })
      }else {
        $scope.result = "Please check your token or call our Administrator"
      }
    };
    angular.element(document).ready(init);
}]);
