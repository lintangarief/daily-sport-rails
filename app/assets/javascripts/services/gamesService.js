var dailyApp = angular.module('daily');

dailyApp.factory("gameService", ["$http","$q","$window",function ($http, $q, $window) {
    var userInfo;
    var urlBase = 'http://localhost/fantasygame';
    function getContests(id) {
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

    function detailLobby(params){
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


    function init() {
        if ($window.sessionStorage["userInfo"]) {
          userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
      getContests: getContests,
      detailLobby: detailLobby
    };
}]);
