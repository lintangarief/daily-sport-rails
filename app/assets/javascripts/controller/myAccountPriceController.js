var dailyApp = angular.module('daily');

dailyApp.controller("myAccountPriceController", ["$scope", "$rootScope", "$state", "$location", "$http", "$rootScope", "$window", "authenticationSvc", "$timeout",
 function ($scope, $rootScope, $state, $location, $http, $rootScope, $window, authenticationSvc, $timeout) {
    function init() {
      if (!$rootScope.userData.hasOwnProperty("token")) {
        $state.go('login', {}, {reload: true});
      }
      $scope.showMessage = false;
      getProfilePrize();
    };

    function getProfilePrize(){
      authenticationSvc.getProfilePrize($scope.userData.token).then(function(result){
        $scope.user = result.data;
      })
    }

    angular.element(document).ready(init);
}]);
