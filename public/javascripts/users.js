var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('AppCtrl', function($scope, $http, $animate, $mdDialog) {
      
      $scope.user = {
            name: '',
            pass: '',
      };
      console.log($scope.user);
});