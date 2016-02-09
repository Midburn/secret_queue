var config = {
	path: 'http://queue-api.midburn.org/register',
	maxRetries: 30,
	waitBetweenRetries: 1000
};

var app = angular.module('midburn', []);

app.controller('RegisterCtrl', function($scope, $http) {

	$scope.retries = 0;
	var timeout = 10000;

	$scope.sendForm = function() {
		$scope.processing = true;
		sendRequest();
	};

	var sendRequest = function() {
		$http({
			url: config.path,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			data: {
				username: $scope.email
			},
			timeout: timeout
		}).then(responseSuccess, responseError);
	};

	var responseSuccess = function() {
		window.location = 'thanks.html?email=' + $scope.email;
	};

	var responseError = function() {
		if ($scope.retries < config.maxRetries) {
			$scope.retries += 1;
			ga('send', 'event', 'register', 'responseError', 'retry', $scope.retries);
			setTimeout(sendRequest, config.waitBetweenRetries);
		} else {
			$scope.processing = false;
			$scope.cannotProcess = true;
		}
	};

	$scope.$watch('retries', function(retries) {
		if (retries) {
			if (retries > 5) {
				timeout = 15000;
			}
		}
	});

});