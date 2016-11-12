var dailyApp = angular.module('daily');

dailyApp.controller('BaseController', ['$scope', '$state', '$rootScope', '$q', '$location', '$window', '$http', 'authenticationSvc',
  function ($scope, $state, $rootScope, $q, $location, $window, $http, authenticationSvc) {

    function init() {
      $scope.$state = $state;
      $scope.userInfo = sessionStorage.userInfo;
      $scope.userData = $scope.userInfo ? JSON.parse($scope.userInfo) : false;
      $scope.isLogin = $scope.userData ? true : false;
    }

    $scope.logout = function(){
      sessionStorage.clear();
      $state.go('login', {}, {reload: true});
    }

    angular.element(document).ready(init);
  }
]);
