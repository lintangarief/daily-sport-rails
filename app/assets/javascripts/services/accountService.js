var dailyApp = angular.module('daily');

dailyApp.factory("authenticationSvc", ["$http","$q","$window",function ($http, $q, $window) {
    var userInfo;
    var urlBase = 'http://localhost/fantasygame';

    function changeToken(token){
      var userData = JSON.parse($window.sessionStorage["userInfo"]);
      userData.token = token;
      $window.sessionStorage["userInfo"] = JSON.stringify(userData);
    }

    function login(userName, password) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/login/submit',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {
            username: userName,
            password: password
          }
      }).success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        userInfo = {
            token: data.token,
            data: data.data
        };
        console.log(data.token)
        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function signup(params){
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/signup/register',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: params
      }).success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function forgotPassword(params, token){
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/reset/request',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: params
      }).success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function resetPassword(params, token){
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/reset/password/' + token,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: params
      }).success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function validationTokenResetPassword(token){
      var deferred = $q.defer();
      $http.get(urlBase + '/reset/form/'+ token, {})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: urlBase + "/logout/submit",
            headers: {
                "access_token": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function getUserInfo() {
      return userInfo;
    }

    function activationUser(token){
      var deferred = $q.defer();
      $http.get(urlBase + '/activation/v1/'+ token, {})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function getProfile(token){
      var deferred = $q.defer();
      console.log(token)
      $http.get(urlBase + '/users', { headers: {'Authorization': token}})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function getContestDetail(token, ligaId, contestId){
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/contestdetails/'+ ligaId + '/' + contestId, {headers: {"Authorization": userInfo ? userInfo.token : ""}})
        .success(function (data, status, headers, config) {
          if (data.error) {
            deferred.reject(data);
          }
          deferred.resolve(data);
        })
        .error(function (data, status, header, config) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function editProfile(token, user){
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/users/edit',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: user
      }).success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
          userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        signup: signup,
        forgotPassword: forgotPassword,
        resetPassword: resetPassword,
        activationUser: activationUser,
        getUserInfo: getUserInfo,
        validationTokenResetPassword: validationTokenResetPassword,
        changeToken: changeToken,
        getProfile: getProfile,
        getContestDetail: getContestDetail,
        editProfile: editProfile
    };
}]);
