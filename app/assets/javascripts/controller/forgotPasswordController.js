var dailyApp = angular.module('daily');

dailyApp.controller("forgotPasswordController", ["$scope", '$rootScope', "$state", "$location", "$window", "authenticationSvc", function ($scope, $rootScope, $state, $location, $window, authenticationSvc) {

    $scope.forgotPassword = function(params) {
      var fv = $('#forgotForm').data('formValidation');
      if (!fv.isValid()) {
        return false;
      }else{
        authenticationSvc.forgotPassword(params).then(function (result) {
          $scope.responseMessage = result.success.message;
        }, function (data) {
          $scope.responseMessage = data.error.message;
        });
      }
    };

    function init() {
      $scope.account = {
        email: ''
      };
      $scope.message = null;
    };

    $scope.$on('$viewContentLoaded', function() {
      $('#forgotForm').formValidation({
        framework: 'bootstrap',
        fields: {
          'email': {
            validators: {
              notEmpty: {
                message: 'The email is required'
              }
            }
          }
        }
      });
    });

    angular.element(document).ready(init);
}]);
