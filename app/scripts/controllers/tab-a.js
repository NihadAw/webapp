'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TabACtrl
 * @description
 * # TabACtrl
 * Controller to display the fixed url tabs (tab 2 and tab 4)
 * TODO: the url is hardcoded in the controler but it should be moved to dataService and handled there
 */
angular.module('webApp')
  .controller('TabACtrl', function ($stateParams , $scope ,  $sce ) {

    // decide the url acording to the tab number , not the best practice,
    // but it will do for now ;-)
    if ( $stateParams.id === '2'){
        $scope.url = "https://www.paulirish.com/";
    }else{
        $scope.url = "https://addyosmani.com/";
    }

    $scope.loaded = false;
    $scope.url = $sce.trustAsResourceUrl ($scope.url);

    // triggred on iframe onLoad
    $scope.iframeLoad = function(){
      $scope.$apply(function () {
          $scope.loaded = true;
        });
    };

  });
