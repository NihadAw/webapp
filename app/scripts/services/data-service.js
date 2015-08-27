'use strict';

/**
* @ngdoc service
* @name dataService // Provide the module and the service name
* #dataService
*
* used to handle the app data storage
* fetches Data from a static file
* loads and saves tabs data to localStorage
**/

angular.module('webApp')
.service('dataService', function($http, $log, $q , $localStorage){
    var dataService = {};

    var init = function(){
      $log.debug('dataService init');
      // check if we have something in localStorage or init it
      // namespaced "webapp"
      if ( $localStorage.webapp  === undefined ){
            $localStorage.webapp ={
              tabsList: []
            };
      }
    };

    init();

    // fetch the  data from the json file
    dataService.fetchData = function(){
        var deferred = $q.defer();
        $http.get('/data/config.json', {cache: true})
          .success(function(data) {
              dataService.data = data;
              $log.debug('dataService fetchData():' , data);
              // check if we already have the tabsList data in localStorage and replace it in dataService.data
              if ($localStorage.webapp.tabsList !== undefined && $localStorage.webapp.tabsList.length > 0  ){
                  dataService.data.tabsList = $localStorage.webapp.tabsList;
              }else {
                 //$localStorage.webapp = {};
                 $localStorage.webapp = data;
              }

              deferred.resolve(dataService.data);
           })
           .error(function (data, status){
                $log.error("dataService fetchData() Error,  status : " + status);
            });
         return deferred.promise;
    };


    // returns the notification message
    dataService.getNotification = function(){
        var deferred = $q.defer();
        if (!dataService.data || dataService.data === undefined ) {
              dataService.fetchData().then(function(){
                  deferred.resolve(dataService.data.notification);
              });
        }else{
          deferred.resolve(dataService.data.notification);
        }
        return deferred.promise;


    };

    // returns the quick actions obj
    dataService.getQuickActions = function(){
        var deferred = $q.defer();
        if (!dataService.data || dataService.data === undefined ) {
              dataService.fetchData().then(function(){
                  deferred.resolve(dataService.data.quickActions);
              });
        }else{
          deferred.resolve(dataService.data.quickActions);
        }
        return deferred.promise;


    };


    dataService.setTabData = function (id,data) {
      $log.debug('dataService setTabData:' , data);
      --id; // we start the tabs (routes) from 1 not zero
      dataService.data.tabsList[id].siteList = data;
      $localStorage.webapp.tabsList = dataService.data.tabsList;
      $log.debug('setTabData:' , dataService.data);

    };

    dataService.getTabData = function (id) {
      $log.debug('dataService getTabData:' , id);
      --id; // we start the tabs (routes) from 1 not zero
      // check if we have the tab data
      if (dataService.data.tabsList[id] !== undefined && dataService.data.tabsList[id].siteList !== undefined ){
          return dataService.data.tabsList[id].siteList;
      }else{
        // return empty obj (for three links)
        return [{},{},{}];
      }


    };

    
    return dataService;
});
