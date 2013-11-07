app = angular.module('pageLoadTests', [])

app.constant 'environments', [
  name: 'local'
  url: 'http://localhost:3450/'
,
  name: 'dev5'
  url: 'http://spl.vmdevpro-05.onetech.local/'
,
  name: 'test'
  url: 'http://spl.ottest.net/'
]

AppCtrl = ($scope, environments) ->
  iframe = document.getElementById('iframe1')
  $scope.stop = false
  $scope.tests = []
  $scope.currentTest = 1
  $scope.testCount = 5
  $scope.campaignId = 3051
  $scope.ordinalId = 1
  $scope.environments = environments
  $scope.environment = environments[0].url
  $scope.showIframe = false

  $scope.startTesting = ->
    $scope.reset()
    $scope.runTest()

  $scope.reset = ->
    $scope.stop = false
    $scope.tests = []
    $scope.currentTest = 1

  $scope.average = ->
    sum = $scope.tests.reduce (t, s) -> t + s.time
    return (sum / $scope.tests.length).toFixed(2)

  $scope.testLink = ->
    newUrl = "#{$scope.environment}EnterCampaign.aspx?id=#{$scope.campaignId}"
    newUrl += "&ord=#{$scope.ordinalId}" unless isNaN($scope.ordinalId)
    return newUrl

  $scope.runTest = ->
    startTime = (new Date()).getTime()
    iframe.onload = -> $scope.pageLoaded(startTime)
    iframe.src = $scope.testLink()

  $scope.pageLoaded = (startTime) ->
    return false if $scope.stop
    now = (new Date()).getTime()
    try url = iframe.contentWindow.location.href
    $scope.tests.push
      time: now - startTime
      url: url
    $scope.$apply()
    $scope.runTest() if $scope.currentTest++ < $scope.testCount

  return


angular.module('pageLoadTests').controller('AppCtrl', ['$scope', 'environments', AppCtrl])