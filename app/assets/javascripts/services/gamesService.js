var dailyApp = angular.module('daily');

dailyApp.factory("gameService", ["$http","$q","$window", "authenticationSvc",function ($http, $q, $window, authenticationSvc) {
    var userInfo;
    var urlBase = 'http://localhost/fantasygame';
    function getContests(id) {
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/contests', {headers: {"Authorization": userInfo ? userInfo.token : ""}})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        if (userInfo) {
          authenticationSvc.changeToken(data.token);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function getContestEvent(id) {
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/events/' + id, {headers: {"Authorization": userInfo ? userInfo.token : ""}})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        if (userInfo) {
          authenticationSvc.changeToken(data.token);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function detailLobby(params) {
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

    function getPlayers(idContest){
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/players/' + idContest, {headers: {"Authorization": userInfo ? userInfo.token : ""}})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        if (userInfo) {
          authenticationSvc.changeToken(data.token);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function getPlayerDetail(contestId, playerId){
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/playerdetail/'+ contestId + '/' + playerId, {})
      .success(function (result, status, headers, config) {
        if (result.error) {
          deferred.reject(result.data);
        }
        deferred.resolve(result.data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function checkEnterContest(idContest){
      var deferred = $q.defer();
      $http.get(urlBase + '/lobby/join/' + idContest, {headers: {"Authorization": userInfo ? userInfo.token : ""}})
      .success(function (data, status, headers, config) {
        if (data.error) {
          deferred.reject(data);
        }
        if (userInfo) {
          authenticationSvc.changeToken(data.token);
        }
        deferred.resolve(data);
      })
      .error(function (data, status, header, config) {
        deferred.reject(data);
      });
      return deferred.promise;
    }

    function getChapcha(){
      var deferred = $q.defer();
      $http.get(urlBase + '/captcha', {headers: {"Authorization": userInfo ? userInfo.token : ""}})
      .success(function (response, status, headers, config) {
        if (response.error) {
          deferred.reject(response);
        }
        if (userInfo) {
          authenticationSvc.changeToken(response.data.token);
        }
        deferred.resolve(response.data);
      })
      .error(function (response, status, header, config) {
        deferred.reject(response);
      });
      return deferred.promise;
    }

    function sendTeamDraft(params, idContest, idEvent){
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: urlBase + '/draft/add/' + idContest + '/' + idEvent,
          headers: {'Content-Type': 'application/x-www-form-urlencoded', "Authorization": userInfo ? userInfo.token : ""},
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
      getContestEvent: getContestEvent,
      detailLobby: detailLobby,
      getPlayers: getPlayers,
      checkEnterContest: checkEnterContest,
      getPlayerDetail: getPlayerDetail,
      getChapcha: getChapcha,
      sendTeamDraft: sendTeamDraft
    };
}]);
