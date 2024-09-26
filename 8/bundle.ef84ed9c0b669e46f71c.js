(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",s=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),s&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),s&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,s,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);s&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},y={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,o=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",_={};_[$]=v;var g=function(e){return e instanceof S},b=function e(t,n,s){var i;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();_[r]&&(i=r),n&&(_[r]=n,i=r);var o=t.split("-");if(!i&&o.length>1)return e(o[0])}else{var a=t.name;_[a]=t,i=a}return!s&&i&&($=i),i||!s&&$},C=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new S(n)},M=y;M.l=b,M.i=g,M.w=function(e,t){return C(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(e,t){var n=C(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return C(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<C(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!M.u(t)||t,h=M.p(e),f=function(e,t){var s=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(o)},p=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,y=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case a:var _=this.$locale().weekStart||0,g=(v<_?v+7:v)-_;return f(c?y-g:y+(6-g),m);case o:case d:return p($+"Hours",0);case r:return p($+"Minutes",1);case i:return p($+"Seconds",2);case s:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var a,c=M.p(e),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],p=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[f](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,c){var d,h=this;n=Number(n);var f=M.p(c),p=function(e){var t=C(h);return M.w(t.date(t.date()+Math.round(e*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var v=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return s.replace(p,(function(e,t){return t||v[e]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var f,p=M.p(d),v=C(n),m=(v.utcOffset()-this.utcOffset())*e,y=this-v,$=M.m(this,v);return $=(f={},f[u]=$/12,f[l]=$,f[c]=$/3,f[a]=(y-m)/6048e5,f[o]=(y-m)/864e5,f[r]=y/t,f[i]=y/e,f[s]=y/1e3,f)[p]||y,h?$:M.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return _[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=b(e,t,!0);return s&&(n.$L=s),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),E=S.prototype;return C.prototype=E,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(e){E[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),C.extend=function(e,t){return e.$i||(e(t,S,C),e.$i=!0),C},C.locale=b,C.isDayjs=g,C.unix=function(e){return C(1e3*e)},C.en=_[$],C.Ls=_,C.p={},C}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(e){return e instanceof $},h=function(e,t,n){return new $(e,n,t.$l)},f=function(e){return t.p(e)+"s"},p=function(e){return e<0},v=function(e){return p(e)?Math.ceil(e):Math.floor(e)},m=function(e){return Math.abs(e)},y=function(e,t){return e?p(e)?{negative:!0,format:""+m(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},$=function(){function p(e,t,n){var s=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return h(e*u[f(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){s.$d[f(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var i=e.match(c);if(i){var r=i.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*u[n]}),0)},m.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=v(e/a),e%=a,this.$d.months=v(e/l),e%=l,this.$d.days=v(e/r),e%=r,this.$d.hours=v(e/i),e%=i,this.$d.minutes=v(e/s),e%=s,this.$d.seconds=v(e/n),e%=n,this.$d.milliseconds=e},m.toISOString=function(){var e=y(this.$d.years,"Y"),t=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=y(n,"D"),i=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=y(o,"S"),l=e.negative||t.negative||s.negative||i.negative||r.negative||a.negative,c=i.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+e.format+t.format+s.format+c+i.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},m.toJSON=function(){return this.toISOString()},m.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(e,t){return t||String(s[e])}))},m.as=function(e){return this.$ms/u[f(e)]},m.get=function(e){var t=this.$ms,n=f(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?v(t/u[n]):this.$d[n],0===t?0:t},m.add=function(e,t,n){var s;return s=t?e*u[f(t)]:d(e)?e.$ms:h(e,this).$ms,h(this.$ms+s*(n?-1:1),this)},m.subtract=function(e,t){return this.add(e,t,!0)},m.locale=function(e){var t=this.clone();return t.$l=e,t},m.clone=function(){return h(this.$ms,this)},m.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}();return function(n,s,i){e=i,t=i().$utils(),i.duration=function(e,t){var n=i.locale();return h(e,{$l:n},t)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(e,t){return d(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},s.prototype.subtract=function(e,t){return d(e)&&(e=e.asMilliseconds()),o.bind(this)(e,t)}}}()},212:function(e){e.exports=function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}()},412:function(e){e.exports=function(){"use strict";return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var h=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(f);else{var p=i(f,s);s.byIndex=a,t.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=s(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=s(e,i),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={id:s,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";function e(e,t,n="beforeend"){if(!(e instanceof _))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function t(e,t){if(!(e instanceof _&&t instanceof _))throw new Error("Can replace only components");const n=e.element,s=t.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function s(e){if(null!==e){if(!(e instanceof _))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}var i=n(379),r=n.n(i),o=n(795),a=n.n(o),l=n(569),c=n.n(l),u=n(565),d=n.n(u),h=n(216),f=n.n(h),p=n(589),v=n.n(p),m=n(10),y={};y.styleTagTransform=v(),y.setAttributes=d(),y.insert=c().bind(null,"head"),y.domAPI=a(),y.insertStyleElement=f(),r()(m.Z,y),m.Z&&m.Z.locals&&m.Z.locals;const $="shake";class _{#e=null;constructor(){if(new.target===_)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add($),setTimeout((()=>{this.element.classList.remove($),e?.()}),600)}}const g="DD/MM/YY HH:mm",b={type:"flight",destination:{name:""},dateFrom:"",dateTo:"",basePrice:0,offers:[],isFavorite:!1},C="everything",M="future",S="present",E="past",w={DAY:{type:"day",isChecked:!0,isDisabled:!1},EVENT:{type:"event",isChecked:!1,isDisabled:!0},TIME:{type:"time",isChecked:!1,isDisabled:!1},PRICE:{type:"price",isChecked:!1,isDisabled:!1},OFFERS:{type:"offers",isChecked:!1,isDisabled:!0}};var D=n(484),k=n.n(D),A=n(646),T=n.n(A),F=n(212),O=n.n(F),x=n(412),L=n.n(x);function H(e,t){return e?k()(e).format(t):""}function Y(e){return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():e}function B(e,t){return e.find((e=>e.type===t)).offers}function I(e,t){return e.find((e=>e.id===t))}function P(e,t){return e.map((e=>e.id===t.id?t:e))}function j(e,t){return null===e&&null===t?0:null===e?1:null===t?-1:null}function N(e,t){const n=k()(e.dateTo).diff(k()(e.dateFrom)),s=k()(t.dateTo).diff(k()(t.dateFrom));return j(e.duration,t.duration)??s-n}function Z(e,t){const n=e.basePrice,s=t.basePrice;return j(e.price,t.price)??s-n}k().extend(T()),k().extend(O()),k().extend(L());const q={[C]:e=>e,[M]:e=>e.filter((e=>function(e){const t=k()();return k()(e).isAfter(t)}(e.dateFrom))),[S]:e=>e.filter((e=>function(e,t){const n=k()();return k()(e).isSameOrBefore(n)&&k()(t).isSameOrAfter(n)}(e.dateFrom,e.dateTo))),[E]:e=>e.filter((e=>function(e){const t=k()();return k()(e).isBefore(t)}(e.dateTo)))};class W extends _{#t=null;constructor({onSortTypeChange:e}){super(),this.#t=e,this.element.addEventListener("click",this.#n)}get template(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      ${Object.values(w).map((e=>{return`<div class="trip-sort__item trip-sort__item--${(t=e).type}">\n        <input\n        id="sort-${t.type}"\n        class="trip-sort__input visually-hidden"\n        type="radio" name="trip-sort"\n        value="sort-${t.type}"\n        ${t.isChecked?"checked":""}\n        ${t.isDisabled?"disabled":""}\n      >\n      <label class="trip-sort__btn" for="sort-${t.type}" data-sort-type="${t.type}">${t.type}</label>\n    </div>`;var t})).join("")}\n    </form>`}#n=e=>{"LABEL"===e.target.tagName&&this.#t(e.target.dataset.sortType)}}class U extends _{get template(){return'<ul class="trip-events__list"></ul>'}}class z extends _{get template(){return'<p class="trip-events__msg">Click New Event to create your first point</p>'}}class J extends _{#s=null;#i=null;#r=[];#o=[];#a=[];#l=!1;#c=null;#u=null;constructor({event:e,allDestinations:t,allOffers:n,onCloseFormClick:s,onFormSubmit:i}){super(),this.#s=e,this.#o=t,this.#a=n,this.#l=!this.#s.id,this.#i=this.#l?b.destination:I(this.#o,this.#s.destination),this.#r=B(this.#a,this.#s.type),this.#c=s,this.#u=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d),this.element.querySelector("form").addEventListener("submit",this.#h)}get template(){return function(e,t,n,s,i,r){const{type:o,offers:a,basePrice:l,dateFrom:c,dateTo:u}=e,d=function(e,t){return`\n      ${e.map((e=>e.type)).map((e=>{const n=e.toLowerCase();return`\n        <div class="event__type-item">\n          <input\n            id="event-type-${n}-1"\n            class="event__type-input visually-hidden"\n            type="radio"\n            name="event-type"\n            value="${n}"\n            ${t===n?"checked":""}\n          >\n          <label\n            class="event__type-label event__type-label--${n}"\n            for="event-type-${n}-1"\n          >\n          ${Y(e)}\n          </label>\n        </div>\n        `})).join("")}\n    `}(i,o),h=function(e,t){return 0===e.length?"":`\n      <section class="event__section event__section--offers">\n        <h3 class="event__section-title event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n        ${e.map((e=>`\n        <div class="event__offer-selector">\n          <input\n            class="event__offer-checkbox visually-hidden"\n            id="event-offer-${e.id}-1"\n            type="checkbox"\n            name="event-offer-${e.id}"\n            ${t.includes(e.id)?"checked":""}\n          >\n          <label\n            class="event__offer-label"\n            for="event-offer-${e.id}-1"\n          >\n            <span class="event__offer-title">${e.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${e.price}</span>\n          </label>\n        </div>`)).join("")}\n        </div>\n      </section>\n    `}(n,a),f=function(e){if(0===e.name.length)return"";const{pictures:t,description:n}=e;return`<section class="event__section event__section--destination">\n      <h3 class="event__section-title event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${n}</p>\n      ${t.length>0?`<div class="event__photos-container">\n              <div class="event__photos-tape">\n                ${t.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n              </div>\n            </div>`:""}\n    </section>`}(t),p=`\n        ${s.map((e=>`\n        <option value="${e.name}"></option>\n      `)).join("")}\n    `;return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${d}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n            ${o}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${t.name}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${p}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${H(c,g)}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${H(u,g)}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${l}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">\n            ${r?"Cancel":"Delete"}\n          </button>\n          ${r?"":'\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        '}\n        </header>\n        <section class="event__details">\n          ${h}\n          ${f}\n        </section>\n      </form>\n    </li>`}(this.#s,this.#i,this.#r,this.#o,this.#a,this.#l)}#d=e=>{e.preventDefault(),this.#c(e)};#h=e=>{e.preventDefault(),this.#u(this.#s)}}class R extends _{#s=null;#i=null;#r=null;#o=[];#a=[];#f=null;#p=null;constructor({event:e,allDestinations:t,allOffers:n,onOpenFormClick:s,onFavoriteClick:i}){super(),this.#s=e,this.#o=t,this.#a=n,this.#i=I(this.#o,this.#s.destination),this.#r=B(this.#a,this.#s.type),this.#f=s,this.#p=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#v)}get template(){return function(e,t,n){const{type:s,dateFrom:i,dateTo:r,basePrice:o,isFavorite:a}=e,l=n.filter((t=>e.offers.includes(t.id)));return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${H(i,"YYYY-MM-DD")}">${H(i,"MMM D")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${Y(s)} ${t.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${i}">${H(i,"HH:mm")}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${r}">${H(r,"HH:mm")}</time>\n          </p>\n          <p class="event__duration">${function(e,t){const n=k()(e),s=k()(t).diff(n),i=k().duration(s).days(),r=k().duration(s).hours(),o=k().duration(s).minutes();let a="";return i>0&&(a+=`${String(i).padStart(2,"0")}D `),(r>0||i>0)&&(a+=`${String(r).padStart(2,"0")}H `),a+=`${String(o).padStart(2,"0")}M`,a.trim()}(i,r)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${o}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${l.map((e=>`<li class="event__offer">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </li>`)).join("")}\n        </ul>\n        <button class="event__favorite-btn ${a?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.#s,this.#i,this.#r)}#d=e=>{e.preventDefault(),this.#f(e)};#v=e=>{e.preventDefault(),this.#p()}}const V="DEFAULT",X="EDITING";class G{#m=null;#y=null;#$=null;#_=null;#g=null;#s=null;#b=null;#C=null;#M=V;constructor({eventsListComponent:e,onDataChange:t,onModeChange:n}){this.#$=e,this.#m=t,this.#y=n}init(n,i,r){this.#s=n,this.#b=i,this.#C=r;const o=this.#_,a=this.#g;this.#_=new R({event:this.#s,allDestinations:this.#b,allOffers:this.#C,onOpenFormClick:()=>this.#S(),onFavoriteClick:this.#p}),this.#g=new J({event:this.#s,allDestinations:this.#b,allOffers:this.#C,onCloseFormClick:()=>this.#E(),onFormSubmit:this.#u}),null!==o&&null!==a?(this.#M===V&&t(this.#_,o),this.#M===X&&t(this.#g,a),s(o),s(a)):e(this.#_,this.#$.element)}destroy(){s(this.#_),s(this.#g)}resetView(){this.#M!==V&&this.#E()}#S(){t(this.#g,this.#_),document.addEventListener("keydown",this.#w),this.#y(),this.#M=X}#E(){t(this.#_,this.#g),document.removeEventListener("keydown",this.#w),this.#M=V}#w=e=>{"Escape"===e.key&&(e.preventDefault(),this.#E())};#u=e=>{this.#m(e),this.#E()};#p=()=>{this.#m({...this.#s,isFavorite:!this.#s.isFavorite})}}const K=[{id:1,name:"Amsterdam",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"Тест"}]},{id:2,name:"Geneva",description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"Тест"}]},{id:3,name:"Chamonix",description:"Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"Тест"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"Тест"}]}],Q=[{id:1,type:"flight",destination:1,dateFrom:"2024-06-15T15:00:00.000Z",dateTo:"2024-06-15T18:00:00.000Z",basePrice:1e3,offers:[1,2],isFavorite:!0},{id:2,type:"bus",destination:2,dateFrom:"2024-06-15T13:00:00.000Z",dateTo:"2024-06-15T17:00:00.000Z",basePrice:500,offers:[1],isFavorite:!1}],ee=[{type:"flight",offers:[{id:1,title:"Add luggage",price:50},{id:2,title:"Switch to comfort",price:80},{id:3,title:"Add meal",price:15}]},{type:"bus",offers:[{id:1,title:"Choose seats",price:5},{id:2,title:"Add meal",price:15}]}],te=document.querySelector(".trip-main"),ne=document.querySelector(".trip-controls__filters"),se=document.querySelector(".trip-events"),ie=new class{#D=function(){return Q}();#b=function(){return K}();#C=function(){return ee}();get events(){return this.#D}get destinations(){return this.#b}get offers(){return this.#C}},re=new class{#k=null;#A=new z;#$=new U;#T=null;#F=null;#D=[];#b=[];#C=[];#O=new Map;#x=w.DAY;#L=[];constructor({eventsContainer:e,eventsModel:t}){this.#T=e,this.#F=t}init(){this.#D=[...this.#F.events],this.#b=[...this.#F.destinations],this.#C=[...this.#F.offers],this.#L=[...this.#F.events],this.#H()}#y=()=>{this.#O.forEach((e=>e.resetView()))};#Y=e=>{this.#D=P(this.#D,e),this.#L=P(this.#L,e),this.#O.get(e.id).init(e,this.#b,this.#C)};#B(e){switch(e){case w.TIME:this.#D.sort(N);break;case w.PRICE:this.#D.sort(Z);break;default:this.#D=[...this.#L]}this.#x=e}#t=e=>{this.#x!==e&&(this.#B(e),this.#I(),this.#P())};#j(){this.#k=new W({onSortTypeChange:this.#t}),e(this.#k,this.#T)}#N(){e(this.#A,this.#T)}#I(){this.#O.forEach((e=>e.destroy())),this.#O.clear()}#P(){e(this.#$,this.#T),this.#D.forEach((e=>{this.#Z(e,this.#b,this.#C)}))}#Z(e,t,n){const s=new G({eventsListComponent:this.#$,onDataChange:this.#Y,onModeChange:this.#y});s.init(e,t,n),this.#O.set(e.id,s)}#H(){0!==this.#D.length?(this.#j(),this.#P()):this.#N()}}({eventsContainer:se,eventsModel:ie});e(new class extends _{get template(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}},te,"afterbegin"),e(new class extends _{#q=[];constructor(){super(),this.#q=Object.entries(q).map((([e])=>({type:e})))}get template(){return`<form class="trip-filters" action="#" method="get">\n\n      ${this.#q.map(((e,t)=>function(e,t){const{type:n}=e;return`<div class="trip-filters__filter">\n        <input\n          id="filter-${n}"\n          class="trip-filters__filter-input visually-hidden"\n          type="radio"\n          name="trip-filter"\n          value="${n}"\n          ${t?"checked":""}\n        >\n        <label\n          class="trip-filters__filter-label"\n          for="filter-${n}"\n        >\n        ${n}\n        </label>\n      </div\n    >`}(e,0===t))).join("")}\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}},ne),re.init()})()})();
//# sourceMappingURL=bundle.ef84ed9c0b669e46f71c.js.map