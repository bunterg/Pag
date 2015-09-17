var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('AppCtrl', function($scope, $http, $animate, $window) {
      $scope.etiquetas = ['General'];
      $scope.etiquetasPersonalizadas = [];
      
      $scope.regresar = function() {
            $window.location.href = '/';
      };
});