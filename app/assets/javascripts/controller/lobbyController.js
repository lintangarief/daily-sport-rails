var dailyApp = angular.module('daily');

dailyApp.controller('lobbyController', ['$scope', '$state', '$rootScope', '$q', '$location', '$window', 'gameService',
  function ($scope, $state, $rootScope, $q, $location, $window, gameService) {
    function init() {
      console.log("load lobbyController");
      $scope.contests = {
        "token":"eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0Nzg2MTI1ODIsImp0aSI6IkJBcjY1NXNiRFhvWGNaZCtKb0pQUWNFOGhTMTI3OWw1aE92Z3kwRDhXOUk9IiwiaXNzIjoibG9jYWxob3N0IiwibmJmIjoxNDc4NjEyNTgyLCJleHAiOjE0Nzg2MjMzODIsImRhdGEiOnsidXNlcmlkIjoiMiJ9fQ.q8e0thyo8FsZOQhaJWzDNmWbP0nvFvlAt065K0Vs2nI",
        "data":{
          "active_contests":[
            {
              "contest_id":"17",
              "contest_name":"Weekend EPL Special",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"3",
              "entry_max_register":"1",
              "user_entry_count":"2",
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"3",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"16",
              "contest_name":"Saturday EPL Galore",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"2",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"1",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"15",
              "contest_name":"Saturday Champion",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"3",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"14",
              "contest_name":"Saturday EPL Galore",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"2",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"1",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"13",
              "contest_name":"Saturday Champion",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"3",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"12",
              "contest_name":"Saturday EPL Galore",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"2",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"1",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"11",
              "contest_name":"Saturday Champion",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"3",
              "prize":"Rp. 10,000,000*"
            }
          ],
          "inactive_contests":[
            {
              "contest_id":"17",
              "contest_name":"Weekend EPL Special",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"3",
              "entry_max_register":"1",
              "user_entry_count":"2",
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"1",
              "prize":"Rp. 10,000,000*"
            },
            {
              "contest_id":"16",
              "contest_name":"Saturday EPL Galore",
              "league_shorthand":"BPL",
              "start_date":"2016-08-27",
              "start_time":"18:30:00",
              "entry_max":"1000",
              "entry_fee":"0",
              "entry_count":"0",
              "entry_max_register":"1",
              "user_entry_count":0,
              "sponsor_id":"1",
              "sponsorname":"Djarum",
              "sponsorlogo":"http://localhost/fantasygame/viewimage/logo/sponsor/1",
              "sponsorbanner":"http://localhost/fantasygame/viewimage/banner/sponsor/1",
              "leagues_id":"1",
              "prize":"Rp. 10,000,000*"
            }
          ]
        }
      }
    }

    $scope.filterContest = function(type){
      gameService.getContests(type).then(function(result){
        $scope.contest = result;
      })
    }

    $scope.showContestModal = function(contest){
      $scope.contest = contest;
      $('#modal-contest').modal('show');
    }

    angular.element(document).ready(init);
  }
]);
