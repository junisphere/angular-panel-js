/**
 * Created by andi on 20.01.15.
 */
(function () {
  'use strict';

  var module = angular.module('angularPanel', []);


  module.directive('abPanel', ['$http', '$compile', '$templateCache', '$log',
    function ($http, $compile, $templateCache, $log) {

      return {
        restrict: 'E',
        replace: true,
        scope: {
          panelModel: '=',
          collapse: '&?panelCollapse',
          onRefreshClicked: '&?panelRefresh',
          onEditClicked: '&?panelEdit',
          onRemoveClicked: '&?panelRemove'
        },
        link: function (scope, iElement) {

          $log.debug('Linking ab-panel');

          var panelContents = iElement.html();

          iElement.html($compile($templateCache.get('templates/ab-panel/panel.tpl.html'))(scope));
          iElement.children().append($compile(panelContents)(scope.$parent));

          scope.onCollapseClicked = function () {
            scope.panelModel.collapsed = !scope.panelModel.collapsed;
            scope.collapse(scope.panelModel.collapsed);
          };

        }
      };
    }
  ]);

  module.directive('abPanelBody', ['$http', '$compile', '$templateCache', '$log',
    function ($http, $compile, $templateCache, $log) {

      return {
        restrict: 'E',
        replace: true,
        link: function (scope, iElement) {
          $log.debug('Linking ab-panel-body');
          var bodyContents = iElement.html();

          iElement.html($compile($templateCache.get('templates/ab-panel/panelbody.tpl.html'))(scope));
          iElement.children().append($compile(bodyContents)(scope));

        }
      };
    }
  ]);


}());
