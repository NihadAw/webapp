'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('TabBCtrl', function ($stateParams, $scope , $log ,  $sce, dataService) {
    var id = $stateParams.id;

    $scope.init = function(){
      $log.info('TabBCtrl init');
      $scope.selectedLink = { name : 'Links',
                              url :'',
                            };
      $scope.showMenu = false;
      $scope.loaded = false;
      dataService.fetchData().then(function(){

          $scope.sitesList =  dataService.getTabData(id);

          if ($scope.sitesList[0].name === undefined || $scope.sitesList[0].name ===''){
              $scope.showMenu = true;
          }else{
              $scope.setSrc(0);
          }

      });

    };

    $scope.init();

    $scope.submitForm = function() {

       // check to make sure the form is valid
       if ($scope.sitesForm.$valid) {
           $log.info('Form is VALID');
           console.log('$scope.sitesList',   $scope.sitesList);

           dataService.setTabData(id,$scope.sitesList);
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

    $scope.iframeLoad = function(){
      $log.debug('iframe loaded..');
      $scope.$apply(function () {
          $scope.loaded = true;
        });
    };


  });
