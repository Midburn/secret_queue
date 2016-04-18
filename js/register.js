var config = {
	path: 'https://midburn-queue.herokuapp.com/register',
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
				email: $scope.email
			},
			timeout: timeout
		}).then(responseSuccess, responseError);
	};

	var responseSuccess = function() {
		window.location = 'thanks.html?email=' + $scope.email;
	};

	var responseError = function() {
        ga('send', 'event', 'register', 'responseError', 'retry', $scope.retries);
        setTimeout(sendRequest, config.waitBetweenRetries);
	};

	$scope.$watch('retries', function(retries) {
		if (retries) {
			if (retries > 5) {
				timeout = 15000;
			}
		}
	});

});