'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('TabACtrl', function ($stateParams , $scope ,  $sce ) {

    // load the url (hardcoded!!)
    // TODO: load the urls thru the dataService
    if ( $stateParams.id === '2'){
        $scope.url = "http://www.haaretz.co.il/";
    }else{
        $scope.url = "http://www.ynet.co.il/";
    }

    $scope.loaded = false;
    $scope.url = $sce.trustAsResourceUrl ($scope.url);


    $scope.iframeLoad = function(){
      $scope.loaded = true;
    };

  });
