var app = angular.module('pageLoadTests', []);

app.constant('environments', [
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
]);

