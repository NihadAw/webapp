'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main Controller of the webApp
 *
 * parent state of the tabs
 */
angular.module('webApp')
  .controller('MainCtrl', function ($scope, dataService , $log ,$location) {

      $log.debug('MainCtrl');
      $scope.notification = "hello World!";

      // get the notification from the dataService
      dataService.getNotification().then(function(data){
          $scope.notification = data;
      });

      // get the Quick Actions from the dataService
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
