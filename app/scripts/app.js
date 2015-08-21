'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
  .module('webappApp', [
    'ngAnimate',
    'ngCookies',
    'ui.router'
  ])

.config(function ($stateProvider , $urlRouterProvider ) {
    $stateProvider
    .state('app', {
             url: "/",
            // abstract: true,
             templateUrl: "views/main.html",
             controller: 'AppCtrl'
       })
    .state('about', {
             url: "/about",
             templateUrl: "views/about.html",
             controller: 'AboutCtrl',
             controllerAs: 'about'
       })
    .state('about.contact', {
             url: "/contact",
             templateUrl: "views/contact.html",
             controller: 'ContactCtrl',
       })
    .state('about.hello', {
             url: "/contact",
             templateUrl: "views/hello.html",
             controller: 'HelloCtrl',
       });

    $urlRouterProvider.otherwise('/');
  });
