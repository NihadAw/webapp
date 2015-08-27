'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 * Haifa Uni FED course project (2015).
 * Nihad Aw
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ui.router',
    'ngStorage',
  ])

.run(function(){
  console.log('webApp run');
})

.config(function ($stateProvider , $urlRouterProvider , $logProvider ) {

    $logProvider.debugEnabled(false);// debug flag

    $stateProvider
    .state('app', {
             url: "/",
             templateUrl: "views/main.html",
             controller: 'MainCtrl'
       })
    .state('app.taba', {
             url: "tab-a/:id",
             templateUrl: "views/tab_a.html",
             controller: 'TabACtrl',
       })
    .state('app.tabb', {
             url: "tab-b/:id",
             templateUrl: "views/tab_b.html",
             controller: 'TabBCtrl',
             persist: true

       });

    $urlRouterProvider.otherwise('tab-b/1');
  });
