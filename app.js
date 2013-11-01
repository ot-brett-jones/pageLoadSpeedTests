

function AppCtrl ($scope) {
	var interval, beforeLoad, stop;
	var iframe = document.getElementById('iframe1');

	$scope.loadingTimes = [];
	$scope.currentTest = 1;
	$scope.testCount = 5;
	$scope.campaignId = 3051;
	$scope.ordinalId = 1;

	$scope.environments = environments = [
		{
			"name": "local",
			"url": "http://localhost:3450/"
		},
		{
			"name": "dev5",
			"url": "http://spl.vmdevpro-05.onetech.local/"
		},
		{
			"name": "test",
			"url": "http://spl.ottest.net/"
		}
	];

	$scope.environment = environments[0];

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
		beforeLoad = (new Date()).getTime();
		expireCookies();

		var newUrl = (function(){
			var url = $scope.environment.url + 'EnterCampaign.aspx?id=' + $scope.campaignId;

			if (!isNaN($scope.ordinalId)) {
				url += '&ord=' + $scope.ordinalId;
			}

			return url;
		})();

		iframe.src = newUrl;
	};

	$scope.pageLoaded = function() {
	     var now = (new Date()).getTime();
	     var ms = now - beforeLoad;
	     $scope.loadingTimes.push(ms);
	     $scope.$apply();

	     if (($scope.currentTest++ < $scope.testCount) && !stop) {
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
