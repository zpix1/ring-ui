window.source = {
  "title": "Icon Ng",
  "url": "icon-ng.html",
  "type": "js",
  "content": "import angular from 'angular';\nimport 'dom4';\n\nimport {Color} from '../icon/icon__constants';\nimport TemplateNg from '../template-ng/template-ng';\nimport styles from '../icon/icon.css';\n\n/**\n * @name Icon Ng\n * @category Legacy Angular\n * @tags Ring UI Language\n * @description Provides an Angular wrapper for Icon.\n * @example\n    <example name=\"Icon Ng\">\n      <file name=\"index.html\">\n        <div ng-app=\"TestApp\" ng-strict-di ng-controller=\"testCtrl\">\n          <rg-icon glyph=\"{{icon}}\"></rg-icon>\n          <rg-icon glyph=\"{{icon}}\" color=\"MAGENTA\"></rg-icon>\n          <rg-icon glyph=\"{{icon}}\" color=\"{{'BLUE'}}\" loading=\"true\"></rg-icon>\n        </div>\n      </file>\n    <file name=\"index.js\" webpack=\"true\">\n      import angular from 'angular';\n      import IconNG from '@jetbrains/ring-ui/components/icon-ng/icon-ng';\n      import ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\n      import {CheckmarkIcon, WarningIcon} from '@jetbrains/ring-ui/components/icon';\n\n      angular.module('TestApp', [ButtonNG, IconNG]).controller('testCtrl', function($scope) {\n        $scope.icon = CheckmarkIcon;\n        $scope.error = WarningIcon;\n      });\n    </file>\n  </example>\n */\n\nconst angularModule = angular.module('Ring.icon', [TemplateNg]);\nconst BASE64_PREFIX = 'data:image/svg+xml;base64,';\n\nangularModule.directive('rgIcon', function rgIconDirective() {\n  return {\n    restrict: 'E',\n    scope: {\n      glyph: '@',\n      loading: '=?',\n      color: '@?',\n      size: '@?',\n      height: '@?',\n      width: '@?'\n    },\n    template: `<span class=\"${styles.icon}\" rg-template=\"normalizedGlyph\" rg-template-class=\"${styles.glyph}\" ng-style=\"style\"></span>`,\n    controller: $scope => {\n      function decodeBase64IfNeeded(glyph) {\n        // This hack allows passing SVG content as string from angular templates like\n        // <rg-icon glyph=\"data:image/svg+xml;base64,PHN2ZyB4bWx...></rg-icon>\n        const isEncoded = glyph.indexOf(BASE64_PREFIX) === 0;\n        return isEncoded ? window.atob(glyph.replace(BASE64_PREFIX, '')) : glyph;\n      }\n\n      $scope.$watch('glyph', value => {\n        if (!value) {\n          return;\n        }\n        $scope.normalizedGlyph = decodeBase64IfNeeded(value);\n      });\n    },\n    link: function link(scope, iElement, iAttrs) {\n      iAttrs.$addClass('ring-icon'); // TODO: We keep this class for now for compatibility reasons (styles overrides)\n\n      scope.$watch('loading', value => {\n        if (value) {\n          iAttrs.$addClass(styles.loading);\n        } else {\n          iAttrs.$removeClass(styles.loading);\n        }\n      });\n\n      scope.$watch(() => scope.color && Color[scope.color] && styles[Color[scope.color]],\n        (colorClass, prevColorClass) => {\n          if (colorClass) {\n            iAttrs.$addClass(colorClass);\n\n            // Remove previous class, but don't remove initial one\n            if (prevColorClass && prevColorClass !== colorClass) {\n              iAttrs.$removeClass(prevColorClass);\n            }\n          }\n        }\n      );\n\n      scope.$watchGroup(['size', 'width', 'height'], ([size, width, height]) => {\n        if (size && !width && !height) {\n          const sizeString = `${size}px`;\n          scope.style = {\n            width: sizeString,\n            height: sizeString\n          };\n          return;\n        }\n\n        scope.style = {};\n        if (width) {\n          scope.style.width = `${width}px`;\n        }\n        if (height) {\n          scope.style.height = `${height}px`;\n        }\n      });\n    }\n  };\n});\n\nexport default angularModule.name;\n",
  "examples": [
    {
      "name": "Icon Ng",
      "url": "examples/icon-ng/icon-ng.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div ng-app=\"TestApp\" ng-strict-di ng-controller=\"testCtrl\">\n  <rg-icon glyph=\"{{icon}}\"></rg-icon>\n  <rg-icon glyph=\"{{icon}}\" color=\"MAGENTA\"></rg-icon>\n  <rg-icon glyph=\"{{icon}}\" color=\"{{'BLUE'}}\" loading=\"true\"></rg-icon>\n</div>\n      ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport angular from 'angular';\nimport IconNG from '@jetbrains/ring-ui/components/icon-ng/icon-ng';\nimport ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\nimport {CheckmarkIcon, WarningIcon} from '@jetbrains/ring-ui/components/icon';\n\nangular.module('TestApp', [ButtonNG, IconNG]).controller('testCtrl', function($scope) {\n  $scope.icon = CheckmarkIcon;\n  $scope.error = WarningIcon;\n});\n    ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Provides an Angular wrapper for Icon.",
  "attrs": {
    "name": "Icon Ng",
    "category": "Legacy Angular",
    "tags": "Ring UI Language",
    "description": "Provides an Angular wrapper for Icon.",
    "example": "    <example name=\"Icon Ng\">\n      <file name=\"index.html\">\n        <div ng-app=\"TestApp\" ng-strict-di ng-controller=\"testCtrl\">\n          <rg-icon glyph=\"{{icon}}\"></rg-icon>\n          <rg-icon glyph=\"{{icon}}\" color=\"MAGENTA\"></rg-icon>\n          <rg-icon glyph=\"{{icon}}\" color=\"{{'BLUE'}}\" loading=\"true\"></rg-icon>\n        </div>\n      </file>\n    <file name=\"index.js\" webpack=\"true\">\n      import angular from 'angular';\n      import IconNG from '@jetbrains/ring-ui/components/icon-ng/icon-ng';\n      import ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\n      import {CheckmarkIcon, WarningIcon} from '@jetbrains/ring-ui/components/icon';\n\n      angular.module('TestApp', [ButtonNG, IconNG]).controller('testCtrl', function($scope) {\n        $scope.icon = CheckmarkIcon;\n        $scope.error = WarningIcon;\n      });\n    </file>\n  </example>"
  }
};