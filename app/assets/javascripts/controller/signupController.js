var dailyApp = angular.module('daily');

dailyApp.controller("signupController", ["$scope", '$rootScope', "$state", "$location", "$window", "authenticationSvc", function ($scope, $rootScope, $state, $location, $window, authenticationSvc) {

    $scope.signup = function(params) {
      var fv = $('#signupForm').data('formValidation');
      if (!fv.isValid()) {
        return false;
      }else{
        authenticationSvc.signup(params).then(function (result) {
          $scope.message = result.success.message;
        }, function (data) {
            $scope.errorMessage = data.error.message;
        });
      }
    };

    function init() {
      $scope.account = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        mobilephone: '',
        birthday: '',
        zip_code: ''
      };
      $scope.message = null;
    };


    $scope.$on('$viewContentLoaded', function() {
      $('#signupForm').formValidation({
        framework: 'bootstrap',
        fields: {
          'first_name': {
            validators: {
              notEmpty: {
                message: 'The first name is required'
              }
            }
          },
          'last_name': {
            validators: {
              notEmpty: {
                message: 'The last name is required'
              }
            }
          },
          'username': {
            validators: {
              notEmpty: {
                message: 'The username is required'
              }
            }
          },
          'email': {
            validators: {
              notEmpty: {
                message: 'The username is required'
              }
            }
          },
          'password': {
              validators: {
                  notEmpty: {
                      message: 'The password is required and cannot be empty'
                  }
              }
          },
          'password2': {
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
          'mobilephone': {
            validators: {
              notEmpty: {
                message: 'The phone number is required'
              }
            }
          },
          'birthday': {
            validators: {
              notEmpty: {
                message: 'The birthday is required'
              }
            }
          },
          'zip_code': {
            validators: {
              notEmpty: {
                message: 'The mobilephone is required'
              }
            }
          },
          'address': {
            validators: {
              notEmpty: {
                message: 'The address is required'
              }
            }
          }
        }
      });
    });

    angular.element(document).ready(init);
}]);
