var dailyApp = angular.module('daily');

dailyApp.controller("myAccountController", ["$scope", "$rootScope", "$state", "$location", "$http", "$rootScope", "$window", "authenticationSvc", "$timeout",
 function ($scope, $rootScope, $state, $location, $http, $rootScope, $window, authenticationSvc, $timeout) {
    function init() {
      if (!$rootScope.userData.hasOwnProperty("token")) {
        $state.go('login', {}, {reload: true});
      }
      $scope.showMessage = false;
      getProfile();
    };

    function getProfile(){
      authenticationSvc.getProfile($scope.userData.token).then(function(result){
        $scope.user = result.data;
      })
    }

    $scope.editAccount = function(){
      authenticationSvc.editProfile($scope.userData.token, $scope.user).then(function(result){
        $scope.user = result.data;
      })
    }

    $scope.formatSubscriber = function(status){
      return parseInt(status);
    }
    angular.element(document).ready(init);
}]);
