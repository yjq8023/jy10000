(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{"558":function(e,n,o){"use strict";o.r(n);var t=o(9),c=o(19),s=o(378),r=o(130),a=o(101),i=o(377),l=o(107);Object(s.b)(i),n.default=function Home(){var e=Object(c.useState)({"schema":{},"form":{}}),n=Object(t.a)(e,2),o=n[0],i=n[1];Object(c.useEffect)((function(){var e=function onMessage(e){var n={};try{n=e.data?JSON.parse(e.data):{},console.log("移动端预览收到数据"),console.log(e),i(n)}catch(e){}};return window.addEventListener("message",e),function(){window.removeEventListener("message",e)}}),[]);var u=Object(s.c)();return Object(l.jsxs)(a.i,{"className":"dev-home","style":{"padding":"0 0px","backgroundColor":"#F5F6FB"},"children":[Object(l.jsx)(s.a,{"form":u,"formProps":{"componentProps":{}},"schema":o.schema,"isItemToItem":!0}),Object(l.jsxs)(a.i,{"children":[Object(l.jsx)(r.a,{"onClick":function onSubmit(){var e;null===(e=u.current)||void 0===e||e.submit((function(e){console.log("表单提交数据"),console.log(e)}))},"children":"测试提交"}),"   ",Object(l.jsx)(r.a,{"onClick":function handleReset(){var e;null===(e=u.current)||void 0===e||e.reset()},"children":"测试重置"})]})]})}}}]);