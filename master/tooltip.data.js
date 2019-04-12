window.source = {
  "title": "Tooltip",
  "url": "tooltip.html",
  "type": "js",
  "content": "import React, {Component} from 'react';\nimport PropTypes from 'prop-types';\n\nimport Popup from '../popup/popup';\nimport {Listeners} from '../global/dom';\n\nimport styles from './tooltip.css';\n\n/**\n * @name Tooltip\n * @category Components\n * @tags Ring UI Language\n * @constructor\n * @description Displays a tooltip.\n * @extends {ReactComponent}\n * @example-file ./tooltip.examples.html\n */\nexport default class Tooltip extends Component {\n  static PopupProps = Popup.PopupProps;\n\n  static propTypes = {\n    delay: PropTypes.number,\n    selfOverflowOnly: PropTypes.bool,\n    popupProps: PropTypes.object,\n    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n    children: PropTypes.node\n  };\n\n  static defaultProps = {\n    title: '',\n    selfOverflowOnly: false,\n    popupProps: {}\n  };\n\n  state = {showPopup: false};\n\n  componentDidMount() {\n    if (this.props.title) {\n      this.addListeners();\n    }\n  }\n\n  componentDidUpdate(prevProps) {\n    if (!prevProps.title && this.props.title) {\n      this.addListeners();\n    } else if (prevProps.title && !this.props.title) {\n      this.listeners.removeAll();\n    }\n  }\n\n  componentWillUnmount() {\n    this.listeners.removeAll();\n  }\n\n  listeners = new Listeners();\n  containerRef = el => {\n    this.containerNode = el;\n  };\n\n  showPopup = () => {\n    const {delay, title, selfOverflowOnly} = this.props;\n\n    if (!title) {\n      return;\n    }\n\n    const showPopup = () => {\n      if (selfOverflowOnly) {\n        const {containerNode} = this;\n\n        // inline element?\n        if (containerNode.clientWidth === 0 && containerNode.clientHeight === 0) {\n          return;\n        }\n        if (\n          containerNode.scrollWidth <= containerNode.clientWidth &&\n          containerNode.scrollHeight <= containerNode.clientHeight\n        ) {\n          return;\n        }\n      }\n      this.setState({showPopup: true});\n    };\n\n    if (delay) {\n      this.timeout = setTimeout(showPopup, delay);\n    } else {\n      showPopup();\n    }\n  };\n\n  hidePopup = () => {\n    clearTimeout(this.timeout);\n    this.setState({showPopup: false});\n  };\n\n  addListeners() {\n    this.listeners.add(this.containerNode, 'mouseover', this.showPopup);\n    this.listeners.add(this.containerNode, 'mouseout', this.hidePopup);\n    this.listeners.add(document, 'scroll', this.hidePopup);\n  }\n\n  popupRef = el => {\n    this.popup = el;\n  };\n\n  render() {\n    const {children, title, delay, selfOverflowOnly, popupProps, ...restProps} = this.props; // eslint-disable-line no-unused-vars\n\n    return (\n      <span {...restProps} ref={this.containerRef}>\n        {children}\n        <Popup\n          hidden={!this.state.showPopup}\n          onCloseAttempt={this.hidePopup}\n          maxHeight={400}\n          className={styles.tooltip}\n          attached={false}\n          top={4}\n          dontCloseOnAnchorClick\n          ref={this.popupRef}\n          {...popupProps}\n        >{title}</Popup>\n      </span>\n    );\n  }\n}\n",
  "examples": [
    {
      "name": "Tooltip",
      "url": "examples/tooltip/tooltip.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"tooltip\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\n\nimport Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';\nimport Button from '@jetbrains/ring-ui/components/button/button';\n\nconst buttonWithTooltip = (\n  <Tooltip title=\"Explanation\">\n    <Button id=\"button-with-explanation\">Button that requires an explanation</Button>\n  </Tooltip>\n);\n\nrender(buttonWithTooltip, document.getElementById('tooltip'));\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n:global(#tooltip) {\n  padding-bottom: 100px;\n}\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "Tooltip can only be displayed when necessary",
      "url": "examples/tooltip/tooltip-can-only-be-displayed-when-necessary.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"tooltips\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport React from 'react';\nimport {render} from 'react-dom';\n\nimport Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';\n\nconst loremIpsum = 'Lorem ipsum dolor sit amet, vitae alienum prodesset vis ei, quando nullam ' +\n                   'oportere sea eu, vim an labore diceret docendi. Vim ne illud iusto feugait, ' +\n                   'sea laudem prompta accommodare eu, vidit noster efficiantur est id. Ex vide ' +\n                   'tollit necessitatibus est, eum no quas dicunt. Luptatum singulis usu ne, cu ' +\n                   'sit populo semper civibus. Tamquam dolorem qui ea, nec no dolor vidisse conceptam, ' +\n                   'an est ponderum eloquentiam.';\n\nconst twoLoremIpsums = (\n  <React.Fragment>\n    <div className=\"lorem-ipsum\">\n      <Tooltip title={loremIpsum} selfOverflowOnly className=\"lorem-ipsum__text\">\n        <b>Tooltip won't be displayed:</b> {loremIpsum}\n      </Tooltip>\n    </div>\n    <div className=\"lorem-ipsum\">\n      <Tooltip title={loremIpsum} selfOverflowOnly className=\"lorem-ipsum__text_overflow\">\n        <b>Tooltip will be displayed:</b> {loremIpsum}\n      </Tooltip>\n    </div>\n  </React.Fragment>\n);\n\nrender(twoLoremIpsums, document.getElementById('tooltips'));\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n:global(.lorem-ipsum) {\n  padding-bottom: 200px;\n}\n\n:global(.lorem-ipsum__text_overflow) {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n  ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Displays a tooltip.",
  "attrs": {
    "name": "Tooltip",
    "category": "Components",
    "tags": "Ring UI Language",
    "constructor": "",
    "description": "Displays a tooltip.",
    "extends": "{ReactComponent}",
    "example-file": "./tooltip.examples.html"
  }
};