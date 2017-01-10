var dailyApp = angular.module("daily");
dailyApp.controller("draftContestController", ["$scope", "$rootScope", "$state", "$location", "$http", "$rootScope", "$window", "authenticationSvc", "$timeout", "gameService", "constant", "$interval",
 function ($scope, $rootScope, $state, $location, $http, $rootScope, $window, authenticationSvc, $timeout, gameService, constant, $interval) {
    function init() {
      $scope.activeMenu = 'all';
      $scope.players_select = [];
      $scope.salery_rem = 100000;
      $scope.contestId = $state.params.contestId;
      $scope.ligaId = $state.params.ligaId;
      $scope.players = [];
      $scope.orderByStatus = '';
      $scope.reverse = true;
      $scope.selectedEventId = "[0,0]";
      $scope.events = {};
      $scope.timeshow = false;
      $scope.showError = false;
      authenticationSvc.getContestDetail($scope.token || "", $scope.ligaId, $scope.contestId).then(function(result){
        $scope.contest = result.data;
        checkEnterContest($scope.contest);
      })
      gameService.getContestEvent($scope.ligaId).then(function(result){
        $scope.events = result.data;
        var contestTimespan = moment.tz(result.data[0].start_date + " " + result.data[0].start_time, "Asia/Jakarta").toDate();
        $interval(function() {
           var currentTimespan = moment.tz("Asia/Jakarta").toDate();
           $scope.timeContest = moment.utc(moment(contestTimespan,"DD/MM/YYYY HH:mm:ss").diff(moment(currentTimespan,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
         }, 1000 );
        $scope.timeshow = true;
        $scope.timerActive = true;
      });
      gameService.getPlayers($scope.contestId).then(function(result){
        $scope.players = result.data;
        $scope.players.map(function(player){
          player.salary = parseInt(player.salary);
          player.fp_form = parseInt(player.fp_form)
        })
      })
    };

    function checkEnterContest(contest){
      gameService.checkEnterContest($scope.contest.contest_id).then(function(result){
        return true;
      }, function(e){
        $scope.messageError = e.error.message;
        $('#modalError').modal({ backdrop:'static',keyboard:false, show:true});
      })
    }
    function convertArrayOfObjectsToCSV(args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
          return null;
      }

      columnDelimiter = args.columnDelimiter || ',';
      lineDelimiter = args.lineDelimiter || '\n';

      keys = Object.keys(data[0]);
      keys.splice(-1,1)
      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;
          result += item[key];
          ctr++;
        });
        result += lineDelimiter;
      });

      return result;
    }

    $scope.downloadCSV = function(args) {
      var data, filename, link;
      var csv = convertArrayOfObjectsToCSV({
          data: args.data
      });

      if (csv == null) return;
      filename = args.filename || 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);

      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    }

    $scope.callback = function () {
      $scope.txt = 'Countdown is over!';
      $state.go('lobby');
    };

    $scope.selectPlayer = function(player){
      if (currentRem()) {
        alert("Sorry, player can't append to list, please check your Salary Rem")
        return false;
      }
      if (!$scope.players_select.length){
        $scope.players_select.pushIfNotExist(player, function(e) {
          return e.player_phase_id === player.player_phase_id;
        });
        currentRem();
      }else{
        var error = "";
        if ($scope.events.length < 5) {
          switch(player.pos) {
            case "Defender":
              appendPlayerByPosition("Defender", 3, player);
              break;
            case "Midfielder":
              appendPlayerByPosition("Midfielder", 3, player);
              break;
            case "Forward":
              appendPlayerByPosition("Forward", 1, player);
              break;
          }
        }else{
          switch(player.pos) {
            case "Defender":
              appendPlayerByPosition("Defender", 4, player);
              break;
            case "Midfielder":
              appendPlayerByPosition("Midfielder", 4, player);
              break;
            case "Forward":
              appendPlayerByPosition("Forward", 2, player);
              break;
          }
        }
      }
    }

    function getPlayerSelectedByPos(pos){
      var countByPos = 0;
      $scope.players_select.map(function(player){
      if (player.pos === pos){
        countByPos += 1;
      }})
      return countByPos;
    }

    $scope.orderByFilter = function(status){
      $scope.reverse = ($scope.orderByStatus === status) ? !$scope.reverse : false;
      $scope.orderByStatus = status;
    }

    function appendPlayerByPosition(pos, max, player){
      if (getPlayerSelectedByPos(pos) < max) {
        $scope.players_select.pushIfNotExist(player, function(e) {
          return e.player_phase_id === player.player_phase_id;
        });
        currentRem();
      }else{
        alert("You can only choose"+ max +" "+ pos);
      }
    }

    $scope.detailsPlayer = function(player){
      gameService.getPlayerDetail($scope.contest.contest_id, player.player_phase_id).then(function(result){
        $scope.player = result;
        $('#modalPlayer').modal({ backdrop:'static',keyboard:false, show:true});
      }, function(e){

      })
    }

    $scope.draftTeamClick = function(){
      var mp4 = document.getElementById("mp4");
      mp4.setAttribute('src', 'http://api.dailysportboss.com/video/ads/mp4/' + $scope.contest.sponsors_id);
      var webm = document.getElementById("webm");
      webm.setAttribute('src', 'http://api.dailysportboss.com/video/ads/webm/' + $scope.contest.sponsors_id);
      var ogv = document.getElementById("ogv");
      ogv.setAttribute('src', 'http://api.dailysportboss.com/video/ads/ogv/' + $scope.contest.sponsors_id);

      $('#modalVideo').modal({ backdrop:'static',keyboard:false, show:true});
      $scope.videoOnEnded = false;
      var video = document.getElementById("video");
      $('#video').get(0).play();
      video.onended = function() {
        $scope.videoOnEnded = true;
      };
      $scope.capcha  = ".....";
      gameService.getChapcha().then(function(result){
        $scope.capcha = result.randomword;
      })
    }

    $scope.removePlayer = function(player_delete){
      $scope.players_select = $.grep($scope.players_select, function(player){
           return player.player_phase_id != player_delete.player_phase_id;
      });
      currentRem();
    }

    $scope.closeModal = function(){
      $('.modal-backdrop').remove();
    }

    function currentRem(){
      var rem = 0
      $scope.players_select = $scope.players_select || [];
      $scope.players_select.map(function(player){
        rem += parseInt(player.salary)
      })
      $scope.salery_rem = constant.SALARY_REM - rem;
    }

    angular.element(document).ready(init);
}]);

dailyApp.filter('customMatch', function() {
  return function(players, teamName) {
    teamName = teamName.replace(/\[/g, '')
    teamName = teamName.replace(/\]/g, '')
    if (typeof teamName == "string") {
      teamName = teamName.split(',');
    }
    if (teamName[0] == "0" || teamName.length > 2) {
      return players;
    }
    var teamHomeName = teamName[0]
    var teamAwayName = teamName[1]
    return players.filter(function(element, index, array) {
      return element.team_shorthand == teamHomeName || element.team_shorthand == teamAwayName
    });

  };
});
dailyApp.filter('', function () {
  return function () {
    return;
  };
});
