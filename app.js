function AppCtrl ($scope) {
	var interval, beforeLoad;
	var iframe = document.getElementById('iframe1');

	$scope.loadingTimes = [];

	$scope.startTesting = function() {
		var i = 0;
		interval = setInterval(function() {
			if (i++ >= 10) {
				$scope.stopTesting();
			}
			$scope.reload();
		}, 2000);
	};

	$scope.stopTesting = function() {
		if (interval) clearInterval(interval);
	};

	$scope.reload = function() {
		beforeLoad = (new Date()).getTime();
		iframe.src = 'http://spl.vmdevpro-05.onetech.local/EnterCampaign.aspx?id=659&ord=0';
	};

	$scope.pageLoaded = function() {
	     var now = (new Date()).getTime();
	     var ms = now - beforeLoad;
	     $scope.loadingTimes.push(ms);
	     $scope.$apply();
	}
}
