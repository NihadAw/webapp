'use strict';

angular
  .module('webApp')
  .directive('myFrame',function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        replace: true,
      //  transclude: true,
        scope: {
            sitesList: "=",
        },
      //  template: '<iframe src="" height="100%" width="100%" frameborder="0"></iframe>',
        templateUrl: 'views/iframe.html',
        compile: function (element, attrs, transclude) {
            console.log('element',element);
            console.log('element',element.children('iframe'));
            console.log(transclude);
          //  element[0].outerHTML = element[0].outerHTML.replace('%url%',attrs.iframeSrc);
            element.children('iframe').attr('src', attrs.iframeSrc);

            console.log(element);
            element.children('.dropdown').on('click',function (e) {
                e.preventDefault();
                console.log(e.target.href);
                if (e.target.href !== undefined){
                  element.children('iframe').attr('src', e.target.href);
                }
            });

        },
        link: function (scope) {
              console.log('scope: ', scope);
              scope.$watch('sitesList', function(newValue, oldValue) {
               if (newValue){
                   console.log("I see a data change!" ,newValue);
                   console.log("I see a data change!",oldValue );
              }
           }, true);
        }
    };
})


// prefix http
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
