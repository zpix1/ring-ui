(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{2005:function(module,exports){function source(re){return re?"string"==typeof re?re:re.source:null}function concat(...args){return args.map(x=>source(x)).join("")}module.exports=function ini(hljs){const NUMBERS={className:"number",relevance:0,variants:[{begin:/([+-]+)?[\d]+_[\d_]+/},{begin:hljs.NUMBER_RE}]},COMMENTS=hljs.COMMENT();COMMENTS.variants=[{begin:/;/,end:/$/},{begin:/#/,end:/$/}];const VARIABLES={className:"variable",variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)\}/}]},LITERALS={className:"literal",begin:/\bon|off|true|false|yes|no\b/},STRINGS={className:"string",contains:[hljs.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]},ARRAY={begin:/\[/,end:/\]/,contains:[COMMENTS,LITERALS,VARIABLES,STRINGS,NUMBERS,"self"],relevance:0},ANY_KEY=function either(...args){return"("+args.map(x=>source(x)).join("|")+")"}(/[A-Za-z0-9_-]+/,/"(\\"|[^"])*"/,/'[^']*'/);return{name:"TOML, also INI",aliases:["toml"],case_insensitive:!0,illegal:/\S/,contains:[COMMENTS,{className:"section",begin:/\[+/,end:/\]+/},{begin:concat(ANY_KEY,"(\\s*\\.\\s*",ANY_KEY,")*",function lookahead(re){return concat("(?=",re,")")}(/\s*=\s*[^#\s]/)),className:"attr",starts:{end:/$/,contains:[COMMENTS,ARRAY,LITERALS,VARIABLES,STRINGS,NUMBERS]}}]}}}}]);