angular.module('pageLoadTests').controller('AppCtrl', ['$scope','environments', AppCtrl]);

function AppCtrl($scope, environments) {
	var interval, beforeLoad, stop;
	var iframe = document.getElementById('iframe1');

	$scope.loadingTimes = [];
	$scope.currentTest = 1;
	$scope.testCount = 5;
	$scope.campaignId = 3051;
	$scope.ordinalId = 1;
	$scope.environments = environments;
	$scope.environment = environments[0].url;

	$scope.startTesting = function() {
		$scope.reset();
		$scope.runTest();
	};

	$scope.reset = function() {
		stop = false;
		$scope.loadingTimes = [];
		$scope.currentTest = 1;
	};

	$scope.stopTesting = function() {
		stop = true;
	};

	$scope.average = function() {
		$scope.loadingTimes;
		var sum = 0;
		for (var i = $scope.loadingTimes.length - 1; i >= 0; i--) {
			sum += $scope.loadingTimes[i];
		};
		return sum / $scope.loadingTimes.length;
	};

	$scope.runTest = function() {
		var startTime = (new Date()).getTime();

		var newUrl = $scope.environment + 'EnterCampaign.aspx?id=' + $scope.campaignId;

		if (!isNaN($scope.ordinalId)) {
			newUrl += '&ord=' + $scope.ordinalId;
		}

		iframe.onload = function() {
			$scope.pageLoaded(startTime);
		}
		iframe.src = newUrl;
	};

	$scope.pageLoaded = function(startTime) {
		if (stop) return;
		var now = (new Date()).getTime();
		var ms = now - startTime;
		$scope.loadingTimes.push(ms);
		$scope.$apply();

		if ($scope.currentTest++ < $scope.testCount) {
			$scope.runTest();
		}
	};

	function expireCookies() {
	    var c = document.cookie.split(";");
	    for (var i = 0; i < c.length; i++) {
	        var e = c[i].indexOf("=");
	        var n = e > -1 ? c[i].substr(0, e) : c[i];
	        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	};

}
