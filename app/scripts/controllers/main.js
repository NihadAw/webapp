'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function ($scope, dataService , $log ,$location) {

      $log.info('MainCtrl');
      $scope.notification = "hello World!";
      
      dataService.getNotification().then(function(data){
        //  $log.debug('Data: ' , data);
          $scope.notification = data;
      });

      dataService.getQuickActions().then(function(data){
          $log.debug('getQuickActions: ' , data);
          $scope.quickActions = data;
      });


      // used to set active class for the tabs
      $scope.isActive = function (viewLocation) {
           var active = (viewLocation === $location.path());
           return active;
      };
  });
