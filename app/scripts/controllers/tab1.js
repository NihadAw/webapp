'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('Tab1Ctrl', function ($scope ,  $sce ) {
    $scope.url = "http://www.ziqaq.ps";
    $scope.loaded = false;
    $scope.url = $sce.trustAsResourceUrl ($scope.url);

    $scope.iframeLoad = function(){
      console.log('frame');
      $scope.loaded = true;
    };

  });
