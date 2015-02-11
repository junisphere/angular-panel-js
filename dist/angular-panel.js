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
          $log.debug(scope);
          iElement.children().append($compile(bodyContents)(scope));

        }
      };
    }
  ]);


}());

angular.module('angularPanel').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/ab-panel/panel.tpl.html',
    "<div class=\"panel panel-primary\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <div class=\"pull-right\">\n" +
    "\n" +
    "            <a href=\"\" ng-click=\"onRefreshClicked()\" title=\"{{'LABEL_PANEL_HEADER_ICON_REFRESH' | translate}}\">\n" +
    "                <span class=\"ab-glyphicon-color glyphicon glyphicon-refresh\"></span>\n" +
    "            </a>\n" +
    "\n" +
    "            <a href=\"\" ng-click=\"onEditClicked()\" title=\"{{'LABEL_PANEL_HEADER_ICON_SETTINGS' | translate}}\">\n" +
    "                <span class=\"ab-glyphicon-color glyphicon glyphicon-cog\"></span>\n" +
    "            </a>\n" +
    "            <a href=\"\" ng-click=\"onCollapseClicked()\" title=\"{{'LABEL_PANEL_HEADER_ICON_COLLAPSE' | translate}}\">\n" +
    "        <span\n" +
    "                class=\"ab-glyphicon-color glyphicon {{ panelModel.collapsed ? 'glyphicon-plus' : 'glyphicon-minus' }}\"></span>\n" +
    "            </a>\n" +
    "\n" +
    "            <a href=\"\" ng-click=\"onRemoveClicked()\" title=\"{{'LABEL_PANEL_HEADER_ICON_REMOVE' | translate}}\">\n" +
    "                <span style=\"margin-left: 20px;\" class=\"ab-glyphicon-color glyphicon glyphicon-remove\"></span>\n" +
    "            </a>\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- Order does matter here - title must come last -->\n" +
    "        <h3 class=\"panel-title\">{{panelModel.title}}</h3>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('templates/ab-panel/panelbody.tpl.html',
      "<div class=\"panel-body\">\n" +
      "</div>\n"
  );

}]);
