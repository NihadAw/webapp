'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'ngStorage',
  ])

.run(function(){
  console.log('webApp run');
})

.config(function ($stateProvider , $urlRouterProvider ) {
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
             //cache: true,
             templateUrl: "views/tab_b.html",
             controller: 'TabBCtrl',
             persist: true


       });

    $urlRouterProvider.otherwise('tabb/1');
  });
