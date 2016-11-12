var dailyApp = angular.module('daily');

dailyApp.controller("resetPasswordController", ["$scope", "$rootScope", "$state", "$location", "$http", "$rootScope", "$window", "authenticationSvc", "$timeout",
 function ($scope, $rootScope, $state, $location, $http, $rootScope, $window, authenticationSvc, $timeout) {

    $scope.resetPassword = function(params) {
      var fv = $('#formReset').data('formValidation');
      if (!fv.isValid()) {
        return false;
      }else{
        authenticationSvc.resetPassword(params, $scope.newToken).then(function (result) {
          $scope.message = result.success.message;
          $timeout(function() {
            $state.go('login');
          }, 5000);
        }, function (data) {
            $window.alert(data.error.message);
        });
      }
    };

    function init() {
      $scope.noContent = true;
      $scope.token = $state.params.token;
      authenticationSvc.validationTokenResetPassword($scope.token).then(function(result){
        if (result.error) {
          $scope.noContent = false;
          $scope.showError = true;
          $scope.messageError = result.error.message;
        }else{
          $scope.noContent = false;
          $scope.newToken = result.token;
          $scope.account = {
            newpassword: '',
            newpassword2: ''
          };
          $scope.message = "";
        }
      })

    };

    $scope.$on('$viewContentLoaded', function() {
      $('#formReset').formValidation({
        framework: 'bootstrap',
        fields: {
          'newpassword': {
              validators: {
                  notEmpty: {
                      message: 'The password is required and cannot be empty'
                  }
              }
          },
          'newpassword2': {
              validators: {
                  notEmpty: {
                      message: 'The confirm password is required and cannot be empty'
                  },
                  identical: {
                      field: 'password',
                      message: 'The password and its confirm must be the same'
                  }
              }
          },
        }
      });
    });

    angular.element(document).ready(init);
}]);
