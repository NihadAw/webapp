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
    .state('about', {
             url: "/about",
             templateUrl: "views/about.html",
             controller: 'AboutCtrl',
             controllerAs: 'about'
       })
    .state('app.tab1', {
             url: "tab1",
             templateUrl: "views/tab_a.html",
             controller: 'Tab1Ctrl',
       })
    .state('app.tab2', {
             url: "tab2",
             //cache: true,
             templateUrl: "views/tab_b.html",
             controller: 'Tab2Ctrl',
             persist: true


       })
    .state('about.hello', {
             url: "/contact",
             templateUrl: "views/hello.html",
             controller: 'HelloCtrl',
       });

    $urlRouterProvider.otherwise('tab1');
  });
