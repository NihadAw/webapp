'use strict';

angular.module('webApp')
.service('dataService', function($http, $log, $q , $localStorage){
    var dataService = {};

    var init = function(){
      $log.debug('dataService init');
      // check if we have something in localStorage
      if ( $localStorage.webapp  === undefined ){
          $localStorage.webapp ={
            tabsList: {}
          };
      }else {
        //  dataService.data.tabsList = $localStorage.webapp.tabsList;
      }

    };

    init();

    dataService.fetchData = function(){
        var deferred = $q.defer();
        $http.get('/data/config.json', { cache: true}).success(function(data) {
            dataService.data = data;
            $log.debug('dataService fetchData():' , data);
            // check if we already have the tabsList data in localStorage and replace it in dataService.data
            if ($localStorage.webapp.tabsList !== undefined){
                dataService.data.tabsList = $localStorage.webapp.tabsList;
            }

            deferred.resolve(dataService.data);
         });
         return deferred.promise;
    };


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
      --id; // we sttart the tabs from 1 not zero
      dataService.data.tabsList[id].siteList = data;
      $localStorage.webapp.tabsList = dataService.data.tabsList;
      $log.debug('setTabData:' , dataService.data);

    };

    dataService.getTabData = function (id) {
      $log.debug('dataService getTabData:' , id);
      --id; // we sttart the tabs from 1 not zero
      if (dataService.data.tabsList[id].siteList !== undefined){
          return dataService.data.tabsList[id].siteList;
      }else{
        return [{},{},{}];
      }


    };

    return dataService;
});
