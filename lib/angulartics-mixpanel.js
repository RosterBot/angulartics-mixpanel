(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc overview
 * @name angulartics.mixpanel
 * Enables analytics support for Mixpanel (http://mixpanel.com)
 */
angular.module('angulartics.mixpanel', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {

    $analyticsProvider.registerSetUsername(function (userId) {
      mixpanel && mixpanel.identify(userId);
    });
    $analyticsProvider.registerSetAlias(function (userId) {
      mixpanel && mixpanel.alias(userId);
    });
    $analyticsProvider.registerSetSuperPropertiesOnce(function (properties) {
      mixpanel && mixpanel.register_once(properties);
    });
    $analyticsProvider.registerSetSuperProperties(function (properties) {
      mixpanel && mixpanel.register(properties);
    });
    $analyticsProvider.registerSetUserPropertiesOnce(function (properties) {
      mixpanel && mixpanel.people.set_once(properties);
    });
    $analyticsProvider.registerSetUserProperties(function (properties) {
      mixpanel && mixpanel.people.set(properties);
    });
    $analyticsProvider.registerPageTrack(function (path) {
      // tracking page views is not considered a best practice with mixpanel, so let's not do it.
      // see https://mixpanel.com/help/questions/articles/why-measure-events-vs-page-views
      //mixpanel.track( "Page Viewed", { "page": path });
    });
    $analyticsProvider.registerEventTrack(function (action, properties, callback) {
      callback = callback || function(){};
      mixpanel && mixpanel.track(action, properties, callback);
    });
    $analyticsProvider.registerIncrementProperty(function (property, value) {
      if (typeof value === 'undefined') {
        mixpanel && mixpanel.people.increment(property);
      } else {
        mixpanel && mixpanel.people.increment(property, value);
      }
    });
    $analyticsProvider.registerUserTimings(function (action, properties) {
      mixpanel && mixpanel.time_event(action);
    });

}]);

})(window, window.angular);
