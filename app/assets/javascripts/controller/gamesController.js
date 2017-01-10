var dailyApp = angular.module('daily');

dailyApp.controller('gamesController', ['$scope', '$state', '$rootScope', '$q', '$location', '$window', 'gameService',
  function ($scope, $state, $rootScope, $q, $location, $window, gameService) {
    function init() {
      console.log("load gameContest");
      if (!$rootScope.userData.hasOwnProperty("token")) {
        $state.go('login', {}, {reload: true});
      }
      $scope.filterContest();
      $scope.showNodata = true;
    }


    $scope.enterContest = function(ligaId, contestId) {
      gameService.checkEnterContest(contestId).then(function(result){
        $state.go('draft_contest', {ligaId: ligaId, contestId: contestId});
      })
    }

    $scope.filterContest = function(type){
      gameService.getContests(type).then(function(result){
        $scope.contests = result;
        $scope.showNodata = false;
        if ($scope.contests.data.active_contests.length === 0 ) {
          $scope.showNodata = true;
        }
      })
    }

    $scope.showContestModal = function(contest){
      $scope.contest = contest;
      gameService.getContestEvent(contest.contest_id).then(function(result){
        $scope.events = result;
        $('#modal-contest').modal('show');
      });
    }
    angular.element(document).ready(init);
  }
]);
