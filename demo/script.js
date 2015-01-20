/**
 *
 * Copyright 2014 Andreas Büchler
 * Licensed under the MIT License.
 *
 */


var demoApp = angular.module('demoApp', ['angularPanel']);


demoApp.directive('someOtherDirective', ['$log',
  function ($log) {

    return {
      restrict: 'E',
      template: '<div style="background-color: goldenrod; margin: 10px; padding: 10px;"><h1>{{displayText}}</h1></div>',
      scope: {
        displayText: '='
      },
      link: function (/*scope, iElement*/) {
        $log.debug('Linking someOtherDirective');
      }
    }
  }
]);


demoApp.controller('PanelCtrl', ['$scope', '$log',
  function ($scope, $log) {

    $log.debug('PanelCtrl setup...');

    $scope.panel = {
      title: 'Dynamic Bootstrap Panel',
      collapsed: false,
      content: 'The panel\'s content is another directive.'
    };

    $scope.panelCollapse = function (newValue) {
      if (newValue) {
        $scope.panel.collapsed = newValue;
        $log.debug('toggle collapse: ' + newValue);
      }
      return $scope.panel.collapsed;
    };

    $scope.panelEdit = function () {
      alert('Edit');
    };


    $scope.panelRefresh = function () {
      alert('Refresh');
    };

    $scope.panelRemove = function () {
      alert('Remove');
    };


  }
]);
