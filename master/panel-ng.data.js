window.source = {
  "title": "Panel Ng",
  "url": "panel-ng.html",
  "type": "js",
  "content": "/**\n * @name Panel Ng\n * @category Legacy Angular\n * @tags Ring UI Language\n * @framework Angular\n * @description Provides an Angular wrapper for Pager.\n* @example\n   <example name=\"Docked Panel Ng\">\n     <file name=\"index.html\" disable-auto-size>\n      <div ng-app='PanelNgExample'>\n        <div rg-panel>\n          <rg-button mode=\"primary\">Save</rg-button>\n          <rg-button >Cancel</rg-button>\n        </div>\n      </div>\n     </file>\n     <file name=\"index.js\" webpack=\"true\">\n      import angular from 'angular';\n      import PanelNG from '@jetbrains/ring-ui/components/panel-ng/panel-ng';\n      import ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\n      angular.module('PanelNgExample', [PanelNG, ButtonNG]);\n     </file>\n   </example>\n */\nimport angular from 'angular';\n\nimport styles from '../panel/panel.css';\nimport {addClasses} from '../global/dom';\n\n\nconst angularModule = angular.module('Ring.panel', []);\n\nangularModule.directive('rgPanel', function rgEqualValueDirective() {\n  return {\n    link: function link(scope, iElement) {\n      addClasses(iElement[0].classList, styles.panel);\n    }\n  };\n});\n\nexport default angularModule.name;\n",
  "examples": [
    {
      "name": "Docked Panel Ng",
      "url": "examples/panel-ng/docked-panel-ng.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div ng-app='PanelNgExample'>\n  <div rg-panel>\n    <rg-button mode=\"primary\">Save</rg-button>\n    <rg-button >Cancel</rg-button>\n  </div>\n</div>\n     ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport angular from 'angular';\nimport PanelNG from '@jetbrains/ring-ui/components/panel-ng/panel-ng';\nimport ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\nangular.module('PanelNgExample', [PanelNG, ButtonNG]);\n     ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Provides an Angular wrapper for Pager.",
  "attrs": {
    "name": "Panel Ng",
    "category": "Legacy Angular",
    "tags": "Ring UI Language",
    "framework": "Angular",
    "description": "Provides an Angular wrapper for Pager.",
    "example": "   <example name=\"Docked Panel Ng\">\n     <file name=\"index.html\" disable-auto-size>\n      <div ng-app='PanelNgExample'>\n        <div rg-panel>\n          <rg-button mode=\"primary\">Save</rg-button>\n          <rg-button >Cancel</rg-button>\n        </div>\n      </div>\n     </file>\n     <file name=\"index.js\" webpack=\"true\">\n      import angular from 'angular';\n      import PanelNG from '@jetbrains/ring-ui/components/panel-ng/panel-ng';\n      import ButtonNG from '@jetbrains/ring-ui/components/button-ng/button-ng';\n      angular.module('PanelNgExample', [PanelNG, ButtonNG]);\n     </file>\n   </example>"
  }
};