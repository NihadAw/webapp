'use strict';

/**
* @ngdoc directive
* @name httpPrefix
* @name iframeOnload
* #httpPrefix:
* used to autoprefix and validate url inputs schema [ http:// and https:// ]
*
* #iframeOnload
* used to a hook a function on iframe load as an iframe attr
**/


angular.module('webApp')

/**
* @ngdoc directive
* #httpPrefix
* used to autoprefix and validate url inputs schema [ http:// and https:// ]
**/
.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(https?):\/\//i.test(value) && 'http://'.indexOf(value) === -1) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else {
                  return value;
                }
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
})

/**
* @ngdoc directive
* #iframeOnload
* used to a hook a function on iframe load as an iframe attr
**/
.directive('iframeOnload', [function(){
return {
    scope: {
        callBack: '&iframeOnload'
    },
    link: function(scope, element){
        element.on('load', function(){
            return scope.callBack();
        });
        scope.$on('$destroy', function() {
           element.off('load');
        });
    }
  };
}]);
