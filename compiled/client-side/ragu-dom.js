!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function c(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.RaguComponent=t.defaultComponentLoader=void 0;const i=n(1),r=n(2),s=n(3),c=n(4);t.defaultComponentLoader=new i.ComponentLoader({dependencyContext:new r.DependencyContext(new s.ScriptLoader),jsonpGateway:new c.JsonpGateway(document)});t.RaguComponent=class{constructor(e,n=t.defaultComponentLoader){this.element=e,this.componentLoader=n}fetchComponent(e){return o(this,void 0,void 0,(function*(){const t=this.element.querySelector("script[data-ragu-ssr]");t?yield this.fetchComponentFromSSRScript(t):yield this.fetchComponentFromServer(e)}))}fetchComponentFromServer(e){this.disconnectComponent(),this.componentLoader.load(e).then(e=>{this.component=e,this.element.dispatchEvent(new CustomEvent("ragu:fetched",{detail:this.component})),this.component.html&&(this.element.innerHTML=this.component.html),this.render()}).catch(e=>{this.element.dispatchEvent(new CustomEvent("ragu:fetch-fail",{detail:e}))})}disconnectComponent(){var e,t;this.component&&(null===(t=(e=this.component).disconnect)||void 0===t||t.call(e,this.element))}fetchComponentFromSSRScript(e){return o(this,void 0,void 0,(function*(){const t=JSON.parse(e.textContent||"{}");e.remove(),this.component=yield this.componentLoader.hydrationFactory(t),yield this.render()}))}render(){var e;null===(e=this.component)||void 0===e||e.render(this.element).then(()=>{this.element.dispatchEvent(new CustomEvent("ragu:hydrated",{detail:this.component}))})}}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function c(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentLoader=void 0;t.ComponentLoader=class{constructor(e){this.context=e}load(e){return o(this,void 0,void 0,(function*(){const t=yield this.context.jsonpGateway.fetchJsonp(e);return yield this.hydrationFactory(t)}))}hydrationFactory(e){return o(this,void 0,void 0,(function*(){e.styles&&e.styles.length&&(yield this.context.dependencyContext.loadStyles(e.styles));const t=this.context;return Object.assign(Object.assign({},e),{disconnect(e){var t;return o(this,void 0,void 0,(function*(){const n=this.component;yield this.hydratePromise,null===(t=null==n?void 0:n.disconnect)||void 0===t||t.call(n,e)}))},runtimeComponent(e){return o(this,void 0,void 0,(function*(){const t=e.default||e;return t.resolve?yield e.resolve():t}))},getRenderFunction(){var e,t;return void 0===this.html?null===(e=this.component)||void 0===e?void 0:e.render:null===(t=this.component)||void 0===t?void 0:t.hydrate},render(n){return o(this,void 0,void 0,(function*(){const o=e.dependencies||[];yield t.dependencyContext.loadAll(o),yield t.dependencyContext.load({dependency:e.client});const i=window[e.resolverFunction];this.component=yield this.runtimeComponent(i);const r=this.getRenderFunction();this.hydratePromise=null==r?void 0:r(n,this.props,this.state),yield this.hydratePromise}))}})}))}}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function c(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.DependencyContext=void 0;class i{constructor(e,t,n){this.scriptLoader=e,this.dependency=t,this.globalVariable=n,this.globalVariable&&void 0!==window[this.globalVariable]?this.resolvePromise=Promise.resolve():this.resolvePromise=this.scriptLoader.load(this.dependency)}resolve(){return this.resolvePromise}resolves(e){return e.globalVariable&&e.globalVariable===this.globalVariable||e.dependency===this.dependency}}t.DependencyContext=class{constructor(e){this.scriptLoader=e,this.dependencies=[]}load(e){return this.getOrCreateDependency(e).resolve()}loadAll(e){return o(this,void 0,void 0,(function*(){for(let t of this.groupDependencies(e))yield this.loadDependencyGroup(t)}))}loadStyles(e){return o(this,void 0,void 0,(function*(){yield Promise.all(e.map(e=>this.loadStyle(e)))}))}loadStyle(e){const t=document.createElement("link");return t.setAttribute("href",e),t.setAttribute("rel","stylesheet"),new Promise(n=>{document.head.querySelector(`link[href="${e}"]`)?n():(t.onload=()=>n(),t.onerror=()=>n(),document.head.appendChild(t))})}loadDependencyGroup(e){return Promise.all(e.map(e=>this.load(e)))}groupDependencies(e){const t={};for(let n of e){const e=n.order||0;t[e]=t[e]||[],t[e].push(n)}const n=Object.keys(t).sort(),o=[];for(let e of n)o.push(t[parseInt(e)]);return Object.values(t)}getOrCreateDependency(e){const t=this.dependencies.find(t=>t.resolves(e));if(t)return t;const n=new i(this.scriptLoader,e.dependency,e.globalVariable);return this.dependencies.push(n),n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ScriptLoader=void 0;t.ScriptLoader=class{load(e){const t=document.createElement("script");t.src=e;const n=new Promise((e,n)=>{t.onload=()=>e(),t.onerror=n});return document.head.appendChild(t),n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JsonpGateway=void 0;class o{constructor(e,t){this.document=e,this.url=t,this.id=`${Date.now()}_${Math.ceil(1e7*Math.random())}`,this.script=this.createScript()}createScript(){const e=this.document.createElement("script");return e.src=this.getScriptSRC(),e.id=this.getScriptID(),e}fetch(){const e=new Promise((e,t)=>{window[this.getCallbackFunctionName()]=t=>{this.cleanup(),e(t)},this.script.onerror=e=>{this.cleanup(),t(e)}});return this.document.head.appendChild(this.script),e}cleanup(){delete window[this.getCallbackFunctionName()],this.script.remove()}getScriptSRC(){const e=new URL(this.url);return e.searchParams.append("callback",this.getCallbackFunctionName()),e.toString()}getCallbackFunctionName(){return`${o.callbackFunctionPrefix}${this.id}`}getScriptID(){return`${o.scriptIdPrefix}${this.id}`}}o.scriptIdPrefix="ragu_jsonp_script_",o.callbackFunctionPrefix="raguJSONP_";t.JsonpGateway=class{constructor(e){this.document=e}fetchJsonp(e){return new o(this.document,e).fetch()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(6).registerRaguComponent()},function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||o(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),i(n(0),t),i(n(7),t),i(n(1),t),i(n(2),t),i(n(4),t),i(n(3),t)},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function c(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.registerRaguComponent=void 0;const i=n(0);t.registerRaguComponent=e=>{class t extends HTMLElement{constructor(){super(),this.firstFetchPerformed=!1,this.component=new i.RaguComponent(this,e)}static get observedAttributes(){return["src"]}attributeChangedCallback(){return o(this,void 0,void 0,(function*(){this.firstFetchPerformed&&(yield this.setRaguComponent())}))}connectedCallback(){return o(this,void 0,void 0,(function*(){yield this.waitToFullParse(),this.firstFetchPerformed=!0,yield this.setRaguComponent()}))}setRaguComponent(){return o(this,void 0,void 0,(function*(){const e=this.getAttribute("src");e&&(yield this.component.fetchComponent(e))}))}waitToFullParse(){return o(this,void 0,void 0,(function*(){yield new Promise(e=>{setTimeout(()=>e())})}))}disconnectedCallback(){this.component.disconnectComponent()}}window.customElements.define("ragu-component",t)}}]);