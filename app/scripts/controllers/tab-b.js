'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TabBCtrl
 * @description
 * # TabBCtrl
 * used to display the multiple site list tabs (tab 1 and 3)
 *
 */
angular.module('webApp')
  .controller('TabBCtrl', function ($stateParams, $scope , $log ,  $sce, dataService) {
    var id = $stateParams.id;


    var init = function(){
      $log.debug('TabBCtrl init');
      $scope.selectedLink = { name : 'Links',
                              url :'',
                            };
      $scope.showMenu = false;
      $scope.loaded = false;

      // get the data from the dataService
      dataService.fetchData().then(function(){

          $scope.sitesList =  dataService.getTabData(id);
          if ($scope.sitesList[0].name === undefined || $scope.sitesList[0].name ===''){
              $scope.showMenu = true;
          }else{
              $scope.setSrc(0);
          }
      });
    };

    init();


    // handles the sitesForm submit
    $scope.submitForm = function() {

       // check the form is validity
       if ($scope.sitesForm.$valid) {
           $log.debug('Form is VALID' , $scope.sitesList );
           dataService.setTabData(id,$scope.sitesList);

       }else{
           $log.error('Form is not VALID');
       }
       // hide the siteLists Menu
       $scope.showMenu = false;

    };

    // sets the iframe src
    $scope.setSrc = function(index){
      $scope.loaded = false;
      $scope.iframesrc = $sce.trustAsResourceUrl ($scope.sitesList[index].url);
      $scope.selectedLink.name = $scope.sitesList[index].name;
      $scope.selectedLink.url = $scope.sitesList[index].url;

    };

    // triggered on the iframe event
    $scope.iframeLoad = function(){
      $log.debug('iframe loaded...');
      $scope.$apply(function () {
          $scope.loaded = true;
        });
    };


  });
