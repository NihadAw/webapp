'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('Tab2Ctrl', function ($scope , $log ,  $sce, dataService) {



    $scope.init = function(){
      $log.info('Tab2Ctrl init');
      //$scope.iframesrc = "";
      $scope.selectedLink = { name : 'Links',
                              url :'',
                            };
      $scope.showMenu = false;
      $scope.loaded = false;
      //$scope.sitesList = $localStorage.sitesList || [{},{},{}];

      dataService.fetchData().then(function(){
          $scope.sitesList =  dataService.getTabData(2);
          //$scope.iframesrc = $sce.trustAsResourceUrl ($scope.sitesList[0].url);
          $scope.setSrc(0);
      });

    };

    $scope.init();

    $scope.iframeLoad = function(){
      $log.debug('iframe loaded..');
      $scope.$apply(function () {
          $scope.loaded = true;
        });
    };

    // $scope.$watch('sitesList', function() {
    //     //$localStorage.sitesList = $scope.sitesList;
    //
    //     dataService.setTabData(2,$scope.sitesList);
    //     $log.debug('dataService', dataService.getTabData(2) );
    // });
    //
    // $scope.$watch(function() {
    //     return angular.toJson(dataService.getTabData(2));
    // }, function() {
    //     //$scope.sitesList = angular.toJson(dataService.getTabData(2));
    //
    //
    // });


    $scope.submitForm = function() {

       // check to make sure the form is valid
       if ($scope.sitesForm.$valid) {
           $log.info('Form is VALID');
           console.log('$scope.sitesList',   $scope.sitesList);

           dataService.setTabData(2,$scope.sitesList);
       }else{
           $log.error('Form is not VALID');
       }
       // hide the siteLists Menu
       $scope.showMenu = false;

    };

    $scope.setSrc = function(index){
      $scope.loaded = false;
      console.log('set src');
      $scope.iframesrc = $sce.trustAsResourceUrl ($scope.sitesList[index].url);
      $scope.selectedLink.name = $scope.sitesList[index].name;
      $scope.selectedLink.url = $scope.sitesList[index].url;

    };


    $scope.$on('$destroy', function () {
        $log.error('Tab2Ctrl destroied');
    });
  });
