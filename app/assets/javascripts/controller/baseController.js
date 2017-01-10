var dailyApp = angular.module('daily');

dailyApp.controller('BaseController', ['$scope', '$state', '$rootScope', '$q', '$location', '$window', '$http', 'authenticationSvc',
  function ($scope, $state, $rootScope, $q, $location, $window, $http, authenticationSvc) {

    function init() {
      $scope.$state = $state;
      $rootScope.userInfo = sessionStorage.userInfo;
      $rootScope.userData = $rootScope.userInfo ? JSON.parse($rootScope.userInfo) : false;
      $rootScope.isLogin = $rootScope.userData ? true : false;
      Array.prototype.inArray = function(comparer) {
          for(var i=0; i < this.length; i++) {
              if(comparer(this[i])) return true;
          }
          return false;
      };

      Array.prototype.pushIfNotExist = function(element, comparer) {
          if (!this.inArray(comparer)) {
              this.push(element);
          }
      };
    }

    $rootScope.lobbyPages = function(){
      $state.go('lobby', {}, {reload: true});
    }

    $scope.logout = function(){
      sessionStorage.clear();
      $rootScope.userData = {};
      $rootScope.userInfo = {};
      $rootScope.isLogin = false;
      $state.go('login', {}, {reload: true});
    }

    angular.element(document).ready(init);
  }
]);
