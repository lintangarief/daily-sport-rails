var dailyApp = angular.module('daily');

dailyApp.controller("loginController", ["$scope", '$rootScope', "$state", "$location", "$window", "authenticationSvc", function ($scope, $rootScope, $state, $location, $window, authenticationSvc) {
    $scope.userInfo = null;
    $scope.login = function (params) {
      var fv = $('#loginForm').data('formValidation');
      if (!fv.isValid()) {
        return false;
      }else{
        authenticationSvc.login(params.username, params.password).then(function (result) {
          $rootScope.userData = result;
          $rootScope.isLogin = true;
          $state.go('lobby');
        }, function (data) {
          $scope.errorMessage = data.error.message;
        });
      }
    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };

    function init() {
      $scope.account = {username: '', password: ''};
    }

    $scope.$on('$viewContentLoaded', function() {
      $('#loginForm').formValidation({
        framework: 'bootstrap',
        fields: {
          'username': {
            validators: {
              notEmpty: {
                message: 'The username is required'
              }
            }
          },
          'password': {
            validators: {
              notEmpty: {
                message: 'The password is required'
              }
            }
          }
        }
      });
    });

    angular.element(document).ready(init);
}]);
