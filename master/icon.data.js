window.source = {
  "title": "Icon",
  "url": "icon.html",
  "type": "js",
  "content": "/**\n * @name Icon\n * @category Components\n * @tags Ring UI Language\n * @constructor\n * @description Displays an icon.\n * @extends {ReactComponent}\n * @example-file ./icon.examples.html\n */\n\nimport React, {PureComponent} from 'react';\nimport PropTypes from 'prop-types';\nimport classNames from 'classnames';\nimport InlineSVG from 'svg-inline-react';\nimport deprecate from 'util-deprecate';\n\nimport {Color, Size} from './icon__constants';\nimport styles from './icon.css';\n\nconst deprecateSize = deprecate(\n  () => {},\n  `\\`size\\`, \\`width\\` and \\`height\\` props are deprecated in Ring UI \\`Icon\\` component. The intrinsic sizes of SVG icon (\\`width\\` and \\`height\\` SVG attributes) are used instead.\n\nWe strongly recommend to use icons handcrafted for particular sizes. If your icon doesn't exist in the desired size, please ask your designer to draw one. \"Responsive\" checkmark should be unchecked when exporting icon.'`\n);\n\nexport default class Icon extends PureComponent {\n  static Color = Color;\n  static Size = Size;\n\n  static propTypes = {\n    className: PropTypes.string,\n    color: PropTypes.string,\n    glyph: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),\n    height: PropTypes.number,\n    size: PropTypes.number,\n    width: PropTypes.number,\n    loading: PropTypes.bool\n  };\n\n  static defaultProps = ({\n    className: '',\n    color: Color.DEFAULT,\n    glyph: ''\n  });\n\n  getStyle() {\n    const {size, width, height} = this.props;\n    if (width || height) {\n      deprecateSize();\n      return {width, height};\n    }\n    if (size) {\n      deprecateSize();\n      return {\n        width: size,\n        height: size\n      };\n    }\n    return null;\n  }\n\n  render() {\n    // eslint-disable-next-line no-unused-vars\n    const {className, size, color, loading, glyph, width, height, ...restProps} = this.props;\n\n    const classes = classNames(styles.icon,\n      {\n        [styles[color]]: !!color,\n        [styles.loading]: loading\n      },\n      className\n    );\n\n    return (\n      <span\n        {...restProps}\n        className={classes}\n      >\n        <InlineSVG\n          raw\n          src={glyph.call ? String(glyph) : glyph}\n          className={styles.glyph}\n          style={this.getStyle()}\n        />\n      </span>\n    );\n  }\n}\n\nexport {Size};\n\nexport function iconHOC(glyph, displayName) {\n  // eslint-disable-next-line react/no-multi-comp\n  return class BoundIcon extends PureComponent {\n    static Color = Color;\n    static Size = Size;\n\n    static toString() {\n      return glyph;\n    }\n\n    static displayName = displayName;\n\n    static propTypes = {\n      iconRef: PropTypes.func\n    };\n\n    render() {\n      const {iconRef, ...restProps} = this.props;\n      return <Icon ref={iconRef} {...restProps} glyph={glyph}/>;\n    }\n  };\n}\n",
  "examples": [
    {
      "name": "Icon",
      "url": "examples/icon/icon.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"some-icons\">\n  <span id=\"icon-container\"></span>\n  <span id=\"icon-search\"></span>\n  <span id=\"icon-pencil\"></span>\n  <span id=\"icon-custom-permission\"></span>\n</div>\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n:global(.ring-icon) {\n  display: inline-block;\n  margin: 8px;\n  padding: 8px;\n}\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\nimport {\n  SearchIcon,\n  CheckmarkIcon,\n  PencilIcon,\n  PermissionIcon\n} from '@jetbrains/ring-ui/components/icon';\n\nrender(\n  <CheckmarkIcon\n    className=\"additional-class ring-icon\"\n    color={CheckmarkIcon.Color.MAGENTA}\n  />,\n  document.getElementById('icon-container')\n);\n\nrender(\n  <SearchIcon\n    className=\"ring-icon\"\n  />,\n  document.getElementById('icon-search')\n);\n\nrender(\n  <PencilIcon\n    className=\"ring-icon\"\n  />,\n  document.getElementById('icon-pencil')\n);\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "Icons in text",
      "url": "examples/icon/icons-in-text.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"some-icons\" class=\"icons\">\n  Some text\n  <span id=\"chevron\"></span>\n  Text\n  <span id=\"small-add\"></span>\n  text\n  <span id=\"star\"></span>\n  Text\n  <span id=\"big-add\"></span>\n\n  <div class=\"underline\"></div>\n</div>\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n:global(.icons) {\n  position: relative;\n}\n\n:global(.icons) svg {\n  background-color: #eeea;\n}\n\n:global(.underline) {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  border-bottom: 0.1em solid rgba(0, 255, 0, 0.4);\n  bottom: 0.3em;\n}\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\nimport {\n  ChevronDownIcon,\n  Add10pxIcon,\n  Add20pxIcon,\n  StarFilledIcon\n} from '@jetbrains/ring-ui/components/icon';\n\nrender(\n  <ChevronDownIcon/>,\n  document.getElementById('chevron')\n);\nrender(\n  <Add10pxIcon/>,\n  document.getElementById('small-add')\n);\nrender(\n  <StarFilledIcon/>,\n  document.getElementById('star')\n);\nrender(\n  <Add20pxIcon/>,\n  document.getElementById('big-add')\n);\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "Icons list",
      "url": "examples/icon/icons-list.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<h3>All available icons are listed below. Place the cursor over an icon to\n  see its name.</h3>\n<div id=\"all-icons\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n@value unit from '../global/global.css';\n\n:global(.icon-example__container) {\n  margin-left: calc(0 - calc(unit * 2));\n}\n\n:global(.ring-icon) {\n  display: inline-block;\n  margin: 8px;\n  padding: 8px;\n  color: var(--ring-link-color);\n}\n\n:global(.secondary) {\n  fill: var(--ring-link-hover-color);\n}\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\n\nimport * as icons from '@jetbrains/ring-ui/components/icon/icons';\n\nrender(\n  <div className=\"icon-example__container\">\n    {Object.values(icons).map(Icon => (\n      <Icon\n        key={Icon}\n        title={Icon.displayName}\n        className=\"ring-icon\"\n      />\n    ))}\n  </div>,\n  document.getElementById('all-icons')\n);\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "List of JetBrains product logos",
      "url": "examples/icon/list-of-jet-brains-product-logos.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"logos\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n:global(.ring-icon) {\n  display: inline-block;\n  color: black;\n  margin: 8px;\n  padding: 8px;\n}\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\n\nimport * as logos from '@jetbrains/ring-ui/components/icon/logos';\n\nrender(\n  <div>\n    {Object.values(logos).map(Logo => (\n      <Logo\n        key={Logo}\n        title={Logo.displayName}\n        className=\"ring-icon\"\n      />\n    ))}\n  </div>,\n  document.getElementById('logos')\n);\n  ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Displays an icon.",
  "attrs": {
    "name": "Icon",
    "category": "Components",
    "tags": "Ring UI Language",
    "constructor": "",
    "description": "Displays an icon.",
    "extends": "{ReactComponent}",
    "example-file": "./icon.examples.html"
  }
};