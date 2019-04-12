window.source = {
  "title": "Auth",
  "url": "auth.html",
  "type": "js",
  "content": "import WindowFlow from './window-flow';\nimport defaultOnBackendDown from './down-notification';\nimport Auth from './auth__core';\n\n/**\n * @name Auth\n * @category Utilities\n * @tags Ring UI Language\n * @description Authenticates a user in [Hub](https://www.jetbrains.com/hub/).\n *\n * @prop {object} config\n * @prop {string} config.serverUri\n * @prop {string} config.redirectUri\n * @prop {string} config.clientId\n * @prop {boolean=false} config.redirect — use redirects instead of loading the token in the background.\n * @prop {string[]} config.scope\n * @prop {string[]} config.optionalScopes\n * @prop {boolean} config.cleanHash - whether or not location.hash will be cleaned after authorization is completed.\n * Should be set to false in angular > 1.2.26 apps to prevent infinite redirect in Firefox\n * @prop {User?} user\n * @prop {string[]} config.userFields List of user data fields to be returned by auth.requestUser (default list is used in Header.HeaderHelper)\n * @prop {string[]} config.fetchCredentials\n *\n * @param {{\n *   serverUri: string,\n *   redirectUri: string?,\n *   requestCredentials: string?,\n *   clientId: string?,\n *   scope: string[]?,\n *   optionalScopes: string[]?,\n *   cleanHash: boolean?,\n *   fetchCredentials: string?,\n *   userFields: string[]?\n * }} config\n *\n * @example-file ./auth.examples.html\n */\n\n/**\n * Extend Auth config with non-required and not pure-JS stuff\n */\nAuth.DEFAULT_CONFIG = {\n  ...Auth.DEFAULT_CONFIG,\n  EmbeddedLoginFlow: WindowFlow,\n  onBackendDown: defaultOnBackendDown\n};\n\nexport * from './auth__core';\nexport default Auth;\n",
  "examples": [
    {
      "name": "Auth",
      "url": "examples/auth/auth.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div><a href=\"#\" id=\"force-update\" hidden=\"true\" class=\"ring-link\">Force token update</a></div>\n<div id=\"example\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport Auth from '@jetbrains/ring-ui/components/auth/auth';\nimport authDialogService from '@jetbrains/ring-ui/components/auth-dialog-service/auth-dialog-service';\nimport hubConfig from '@ring-ui/docs/components/hub-config';\nimport '@jetbrains/ring-ui/components/link/link__legacy.css';\n// Example config:\n// var hubConfig = {\n//   serverUri: 'https://hub.jetbrains.com/',\n//   clientId: '81a0bffb-6d0f-4a38-b93a-0a4d1e567698',\n//   requestCredentials: 'skip',\n//   redirectUri: window.location.href.split('#')[0]\n// };\n\nconst log = function (title, obj) {\n  const titleElem = document.createElement('b');\n  const jsonElem = document.createElement('span');\n  const lineBreak = document.createElement('br');\n  lineBreak.style.lineHeight = '32px';\n\n  titleElem.innerHTML = title + ' ';\n  jsonElem.innerHTML = JSON.stringify(obj) + '\\n';\n\n  document.getElementById('example').appendChild(titleElem);\n  document.getElementById('example').appendChild(jsonElem);\n  document.getElementById('example').appendChild(lineBreak);\n};\n\nconst auth = new Auth(hubConfig);\nauth.setAuthDialogService(authDialogService);\n\n(async () => {\n  try {\n    const location = await auth.init();\n    log('Location to restore:', location)\n    const token = await auth.requestToken();\n    log('Token:', token);\n    const data = await auth.requestUser();\n    log('User profile data:', data);\n  } catch (e) {\n    log('error', e);\n  }\n\n  const forceUpdateLink = document.querySelector('#force-update');\n  forceUpdateLink.hidden = false;\n\n  forceUpdateLink.addEventListener('click', async () => {\n    const newToken = await auth.forceTokenUpdate();\n    log('Token has been refreshed:', newToken);\n  });\n})();\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "Auth in iframe",
      "url": "examples/auth/auth-in-iframe.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"example\"></div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport Auth from '@jetbrains/ring-ui/components/auth/auth';\nimport IFrameFlow from '@jetbrains/ring-ui/components/auth/iframe-flow'\nimport authDialogService from '@jetbrains/ring-ui/components/auth-dialog-service/auth-dialog-service';\nimport hubConfig from '@ring-ui/docs/components/hub-config';\nimport '@jetbrains/ring-ui/components/link/link__legacy.css';\n\nconst auth = new Auth({\n  ...hubConfig,\n  EmbeddedLoginFlow: IFrameFlow\n});\nauth.setAuthDialogService(authDialogService);\n\n(async () => {\n  try {\n    const location = await auth.init();\n    await auth.login();\n    const data = await auth.requestUser();\n    document.getElementById('example').innerHTML = JSON.stringify(data);\n  } catch (e) {\n    console.error('Failed', e);\n  }\n})();\n  ",
          "showCode": true
        }
      ]
    },
    {
      "name": "Auth landing page",
      "url": "examples/auth/auth-landing-page.html",
      "disableAutoSize": false,
      "files": [
        {
          "type": "html",
          "content": "\n<div id=\"example\">\n  <div><a href=\"#\" id=\"open-link\" class=\"ring-link\">Open landing page</a></div>\n  <div><a href=\"#\" id=\"force-update\" class=\"ring-link\">Force token update</a></div>\n  <div><a href=\"#\" id=\"log-out\" class=\"ring-link\">Log out</a></div>\n  <div id=\"example\"></div>\n</div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport Auth from '@jetbrains/ring-ui/components/auth/auth';\nimport '@jetbrains/ring-ui/components/link/link__legacy.css';\nimport authService from '@jetbrains/ring-ui/components/auth-dialog-service/auth-dialog-service';\nimport hubConfig from '@ring-ui/docs/components/hub-config';\nimport LandingEntryFileName from '@jetbrains/ring-ui/components/auth/landing-entry';\n\nconst log = function (title, obj) {\n  const titleElem = document.createElement('b');\n  const jsonElem = document.createElement('span');\n  const lineBreak = document.createElement('br');\n  lineBreak.style.lineHeight = '32px';\n\n  titleElem.innerHTML = title + ' ';\n  jsonElem.innerHTML = JSON.stringify(obj) + '\\n';\n\n  document.getElementById('example').appendChild(titleElem);\n  document.getElementById('example').appendChild(jsonElem);\n  document.getElementById('example').appendChild(lineBreak);\n};\n\nasync function run() {\n  const auth = new Auth({\n    ...hubConfig,\n    redirectUri: hubConfig.redirectUri + LandingEntryFileName\n  });\n\n  auth.setAuthDialogService(authService);\n  await auth.init();\n\n  const user = await auth.requestUser();\n  log('Logged in as:', user.name)\n\n  document.querySelector('#open-link').href = LandingEntryFileName;\n\n  document.querySelector('#force-update').addEventListener('click', async () => {\n    const newToken = await auth.forceTokenUpdate();\n    log('New token:', newToken);\n  });\n\n  document.querySelector('#log-out').addEventListener('click', () => {\n    auth.login();\n  });\n}\n\nrun();\n\n  ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Authenticates a user in [Hub](https://www.jetbrains.com/hub/).",
  "attrs": {
    "name": "Auth",
    "category": "Utilities",
    "tags": "Ring UI Language",
    "description": "Authenticates a user in [Hub](https://www.jetbrains.com/hub/).",
    "prop": "{string[]} config.fetchCredentials",
    "param": "{{\n  serverUri: string,\n  redirectUri: string?,\n  requestCredentials: string?,\n  clientId: string?,\n  scope: string[]?,\n  optionalScopes: string[]?,\n  cleanHash: boolean?,\n  fetchCredentials: string?,\n  userFields: string[]?\n}} config",
    "example-file": "./auth.examples.html"
  }
};