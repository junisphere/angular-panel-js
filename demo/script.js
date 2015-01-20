/**
 *
 * Copyright 2014 Andreas Büchler
 * Licensed under the MIT License.
 *
 */


var demoApp = angular.module('demoApp', ['angularPanel', 'nvd3']);


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

    $scope.panel0 = {
      title: 'Dynamic Bootstrap Panel with nvd3 Directive',
      collapsed: false
    };

    $scope.panel1 = {
      title: 'Dynamic Bootstrap Panel',
      collapsed: false,
      content: 'The panel\'s content is another directive.'
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


    // The Nvd3 Demo was taken from http://plnkr.co/edit/EVW5qF?p=preview

    $scope.options = {
      chart: {
        type: 'multiBarChart',
        height: 600,
        margin: {
          top: 20,
          right: 25,
          bottom: 60,
          left: 25
        },
        clipEdge: true,
        staggerLabels: true,
        transitionDuration: 1000,
        tooltips: true,
        tooltipContent: function (key, x, y, e, graph) {
          return '<p>' + key + ': ' + y + '</p>';
        },
        stacked: true,
        showControls: false,
        xAxis: {
          axisLabel: 'Time',
          showMaxMin: true,
          tickFormat: function (d) {
            return d;
          }
        },
        yAxis: {
          axisLabel: 'Number of emails',
          axisLabelDistance: 100,
          tickFormat: function (d) {
            return d3.format(',.f')(d);
          }
        }
      }
    };

    $scope.data = generateData();

    function generateData() {
      var values = [];
      var values0 = [];
      var values1 = [];
      //change number of bars here by editing '90'//
      for (var h = 0; h < 90; h++) {
        //replace the y values with your own values//
        values.push({x: h, y: Math.random() + 1});
        values0.push({x: h, y: Math.sqrt(h) / 2});
        values1.push({x: h, y: Math.abs(h - 18)})
      }

      return [
        {
          key: 'Sent',
          color: '#bcbd22',
          values: values
        },
        {
          key: 'Received',
          color: '#1f77b4',
          values: values0
        },
        {
          key: 'Spam',
          color: 'black',
          values: values1
        }
      ];
    }


  }
]);
