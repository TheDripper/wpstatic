!function(n){n(document).ready(function(){function e(n,r,o){var i,a,s,c=null,l=0;o||(o={});var u=function(){l=!1===o.leading?0:Date.now(),c=null,s=n.apply(i,a),c||(i=a=null)};return function(){var e=Date.now();l||!1!==o.leading||(l=e);var t=r-(e-l);return i=this,a=arguments,t<=0||r<t?(c&&(clearTimeout(c),c=null),l=e,s=n.apply(i,a),c||(i=a=null)):c||!1===o.trailing||(c=setTimeout(u,t)),s}}if(n("#toTop").length&&n("#toTop").click(function(){n("html, body").animate({scrollTop:0},200)}),n("#infiniteNews").length&&n("#infiniteNews").infiniteScroll({path:".nextpostslink",append:".blogpreview",scrollThreshold:1800,status:".page-load-status"}),n(".iso").length){var o=n(".iso").isotope({itemSelector:".p",layoutMode:"masonry",masonry:{gutter:30}});o.imagesLoaded().progress(function(){o.isotope("layout")});var t=o.data("masonry");o.infiniteScroll({path:".next",append:".p",outlayer:t,history:!1,prefill:!0}),o.on("append.infiniteScroll",function(e,t,n,r){o.isotope("appended",r),o.isotope("layout")}),n(document).on("click",".iDrop",function(){n(this).toggleClass("dropped")}),n(document).on("click",".cat",function(){if(n(this).parent().hasClass("dropped")){var e=n(this).html();n(this).attr("data-cat");n(this).parent().find(".ted").html(e),n(".cat").removeClass("selected"),n(this).addClass("selected")}}),n(document).on("click",function(e){0==n(e.target).hasClass("ted")&&0==n(e.target).hasClass("iDrop")&&n(".iDrop").removeClass("dropped")}),n(window).resize(function(){e(o.isotope("layout"))}),n(window).scroll(function(){e(o.isotope("layout"))})}})}(jQuery),function(t){function e(e){jQuery(e.target).hasClass("toggle")&&jQuery(this).parent().toggleClass("active")}function n(){t(".bb-carto-map iframe").each(function(){var e=t(this).contents().height();t(this).height(e)})}t(document).on("change","#dep",function(){var e=t(this).val();console.log(e),t("html,body").animate({scrollTop:t("#"+e).offset().top},400)}),jQuery(document).ready(function(){t(".involved").click(function(e){e.preventDefault(),t("html,body").animate({scrollTop:t("#newsletter").offset().top},700)}),jQuery(".toggle").on("click",e),jQuery("#homecarousel").slick({autoplay:!1,dots:!0,fade:!1,speed:2e3,autoplaySpeed:3e3,accessibility:!0,arrows:!0,nextArrow:'<i class="slick-next fa fa-chevron-right"></i>',prevArrow:'<i class="slick-prev fa fa-chevron-left"></i>',customPaging:function(e,t){return'<button class="button" aria-label="Slider button"></button>'}}),t("body").smoothScroll({delegateSelector:"a"})}),jQuery(window).load(function(){t("#layout").data("layout");n()}),jQuery(window).resize(function(){1200<screen.width&&t("body").removeClass("fullscreen-menu"),n()})}(jQuery),function(c){submenuHasBackButton=!1,c(document).ready(function(){c(".hamburger").click(function(e){c("body").toggleClass("fullscreen-menu")}),c(".sub-menu").parent().hover(function(){var e=c(this).find("ul");c(e).offset().left+e.width()>c(window).width()&&c(e).addClass("reverse")}),c(".sub-menu").each(function(e,t){var n=c(t).closest("li"),r=n.children("a").attr("href"),o=n.attr("class").replace("menu-item-has-children","menu-item-has-children-link"),i=n.html();if(/http/i.test(r)){var a="";submenuHasBackButton&&(a='<li class="fullscreen-only menu-item menu-item-back"><a href="#">Back</a></li>');var s='<li class="fullscreen-only '+o+'">'+i+"</li>";c(t).prepend(a+s)}}),c("#header nav .menu-item-has-children > a").on("tap",function(e){c("body").hasClass("fullscreen-menu")&&(e.preventDefault(),c(this).closest("ul").hasClass("sub-menu")?(c(this).hasClass("openparent")?(c(this).siblings(".sub-menu").slideUp(),c(this).removeClass("openparent")):(c(this).siblings(".sub-menu").slideDown(),c(this).addClass("openparent")),c(".menu-item-has-children > a").not(this).removeClass("openparent"),c(this).closest("ul").closest("li").children("a").addClass("openparent")):(c(this).hasClass("openparent")?(c(this).siblings(".sub-menu").slideUp(),c(this).removeClass("openparent")):(c(this).siblings(".sub-menu").slideDown(),c(this).addClass("openparent")),c(".menu-item-has-children > a").not(this).parent("li").children(".sub-menu").slideUp(),c(".menu-item-has-children > a").not(this).removeClass("openparent")))}),c("#header nav .menu-item-back > a").click(function(e){e.preventDefault(),$ancestorMenus=c(this).parents("ul"),$parentMenu=c($ancestorMenus[0]),$parentMenu.toggleClass("open")})})}(jQuery),function(l){"use strict";function r(e,t){if(!(this instanceof r)){var n=new r(e,t);return n.open(),n}this.id=r.id++,this.setup(e,t),this.chainCallbacks(r._callbackChain)}if(void 0!==l){var o=[],i=function(t){return o=l.grep(o,function(e){return e!==t&&0<e.$instance.closest("body").length})},n={keyup:"onKeyUp",resize:"onResize"},a=function(e){l.each(r.opened().reverse(),function(){return e.isDefaultPrevented()||!1!==this[n[e.type]](e)?void 0:(e.preventDefault(),e.stopPropagation(),!1)})},s=function(e){if(e!==r._globalHandlerInstalled){r._globalHandlerInstalled=e;var t=l.map(n,function(e,t){return t+"."+r.prototype.namespace}).join(" ");l(window)[e?"on":"off"](t,a)}};r.prototype={constructor:r,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:l.noop,beforeContent:l.noop,beforeClose:l.noop,afterOpen:l.noop,afterContent:l.noop,afterClose:l.noop,onKeyUp:l.noop,onResize:l.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(e,t){"object"!=typeof e||e instanceof l!=0||t||(t=e,e=void 0);var n=l.extend(this,t,{target:e}),r=n.resetCss?n.namespace+"-reset":n.namespace,o=l(n.background||['<div class="'+r+"-loading "+r+'">','<div class="'+r+'-content">','<span class="'+r+"-close-icon "+n.namespace+'-close">',n.closeIcon,"</span>",'<div class="'+n.namespace+'-inner">'+n.loading+"</div>","</div>","</div>"].join("")),i="."+n.namespace+"-close"+(n.otherClose?","+n.otherClose:"");return n.$instance=o.clone().addClass(n.variant),n.$instance.on(n.closeTrigger+"."+n.namespace,function(e){var t=l(e.target);("background"===n.closeOnClick&&t.is("."+n.namespace)||"anywhere"===n.closeOnClick||t.closest(i).length)&&(e.preventDefault(),n.close())}),this},getContent:function(){if(!1!==this.persist&&this.$content)return this.$content;var t=this,e=this.constructor.contentFilters,n=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},r=n(t.targetAttr),o=t.target||r||"",i=e[t.type];if(!i&&o in e&&(i=e[o],o=t.target&&r),o=o||n("href")||"",!i)for(var a in e)t[a]&&(i=e[a],o=t[a]);if(!i){var s=o;if(o=null,l.each(t.contentFilters,function(){return(i=e[this]).test&&(o=i.test(s)),!o&&i.regex&&s.match&&s.match(i.regex)&&(o=s),!o}),!o)return"console"in window&&window.console.error("Featherlight: no content filter found "+(s?' for "'+s+'"':" (no target specified)")),!1}return i.process.call(t,o)},setContent:function(e){var t=this;return(e.is("iframe")||0<l("iframe",e).length)&&t.$instance.addClass(t.namespace+"-iframe"),t.$instance.removeClass(t.namespace+"-loading"),t.$instance.find("."+t.namespace+"-inner").not(e).slice(1).remove().end().replaceWith(l.contains(t.$instance[0],e[0])?"":e),t.$content=e.addClass(t.namespace+"-inner"),t},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||!1===n.beforeOpen(t))){t&&t.preventDefault();var e=n.getContent();if(e)return o.push(n),s(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),l.when(e).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),l.Deferred().reject().promise()},close:function(e){var t=this,n=l.Deferred();return!1===t.beforeClose(e)?n.reject():(0===i(t).length&&s(!1),t.$instance.fadeOut(t.closeSpeed,function(){t.$instance.detach(),t.afterClose(e),n.resolve()})),n.promise()},chainCallbacks:function(e){for(var t in e)this[t]=l.proxy(e[t],this,l.proxy(this[t],this))}},l.extend(r,{id:0,autoBind:"[data-featherlight]",defaults:r.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(e){return e instanceof l&&e},process:function(e){return!1!==this.persist?l(e):l(e).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,process:function(e){var t=l.Deferred(),n=new Image,r=l('<img src="'+e+'" alt="" class="'+this.namespace+'-image" />');return n.onload=function(){r.naturalWidth=n.width,r.naturalHeight=n.height,t.resolve(r)},n.onerror=function(){t.reject(r)},n.src=e,t.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(e){return l(e)}},ajax:{regex:/./,process:function(e){var n=l.Deferred(),r=l("<div></div>").load(e,function(e,t){"error"!==t&&n.resolve(r.contents()),n.fail()});return n.promise()}},iframe:{process:function(e){var t=new l.Deferred,n=l("<iframe/>").hide().attr("src",e).css(function(e,t){var n={},r=new RegExp("^"+t+"([A-Z])(.*)");for(var o in e){var i=o.match(r);i&&(n[(i[1]+i[2].replace(/([A-Z])/g,"-$1")).toLowerCase()]=e[o])}return n}(this,"iframe")).on("load",function(){t.resolve(n.show())}).appendTo(this.$instance.find("."+this.namespace+"-content"));return t.promise()}},text:{process:function(e){return l("<div>",{text:e})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(e,t){var r=this,o=new RegExp("^data-"+t+"-(.*)"),i={};return e&&e.attributes&&l.each(e.attributes,function(){var e=this.name.match(o);if(e){var t=this.value,n=l.camelCase(e[1]);if(0<=l.inArray(n,r.functionAttributes))t=new Function(t);else try{t=l.parseJSON(t)}catch(e){}i[n]=t}}),i},extend:function(e,t){var n=function(){this.constructor=e};return n.prototype=this.prototype,e.prototype=new n,e.__super__=this.prototype,l.extend(e,this,t),e.defaults=e.prototype,e},attach:function(r,o,i){var a=this;"object"!=typeof o||o instanceof l!=0||i||(i=o,o=void 0);var s,e=(i=l.extend({},i)).namespace||a.defaults.namespace,c=l.extend({},a.defaults,a.readElementConfig(r[0],e),i);return r.on(c.openTrigger+"."+c.namespace,c.filter,function(e){var t=l.extend({$source:r,$currentTarget:l(this)},a.readElementConfig(r[0],c.namespace),a.readElementConfig(this,c.namespace),i),n=s||l(this).data("featherlight-persisted")||new a(o,t);"shared"===n.persist?s=n:!1!==n.persist&&l(this).data("featherlight-persisted",n),n.open(e)}),r},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return i(),l.grep(o,function(e){return e instanceof t})},close:function(){var e=this.current();return e?e.close():void 0},_onReady:function(){var e=this;e.autoBind&&(e.attach(l(document),{filter:e.autoBind}),l(e.autoBind).filter("[data-featherlight-filter]").each(function(){e.attach(l(this))}))},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&this.$instance.find("."+this.namespace+"-close:first").click(),!1):e(t)},onResize:function(e,t){if(this.$content.naturalWidth){var n=this.$content.naturalWidth,r=this.$content.naturalHeight;this.$content.css("width","").css("height","");var o=Math.max(n/parseInt(this.$content.parent().css("width"),10),r/parseInt(this.$content.parent().css("height"),10));1<o&&this.$content.css("width",n/o+"px").css("height",r/o+"px")}return e(t)},afterContent:function(e,t){var n=e(t);return this.onResize(t),n}}}),l.featherlight=r,l.fn.featherlight=function(e,t){return r.attach(this,e,t)},l(document).ready(function(){r._onReady()})}else"console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery.")}(jQuery),function(e,a){function s(){var e=h.elements;return"string"==typeof e?e.split(" "):e}function c(e){var t=p[e[i]];return t||(t={},d++,e[i]=d,p[d]=t),t}function l(e,t,n){return t||(t=a),f?t.createElement(e):(n||(n=c(t)),(t=n.cache[e]?n.cache[e].cloneNode():o.test(e)?(n.cache[e]=n.createElem(e)).cloneNode():n.createElem(e)).canHaveChildren&&!r.test(e)?n.frag.appendChild(t):t)}function t(e){e||(e=a);var t,n,r=c(e);if(h.shivCSS&&!u&&!r.hasCSS){var o,i=e;o=i.createElement("p"),i=i.getElementsByTagName("head")[0]||i.documentElement,o.innerHTML="x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>",o=i.insertBefore(o.lastChild,i.firstChild),r.hasCSS=!!o}return f||(t=e,(n=r).cache||(n.cache={},n.createElem=t.createElement,n.createFrag=t.createDocumentFragment,n.frag=n.createFrag()),t.createElement=function(e){return h.shivMethods?l(e,t,n):n.createElem(e)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+s().join().replace(/[\w\-]+/g,function(e){return n.createElem(e),n.frag.createElement(e),'c("'+e+'")'})+");return n}")(h,n.frag)),e}var u,f,n=e.html5||{},r=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,o=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,i="_html5shiv",d=0,p={};!function(){try{var e,t=a.createElement("a");if(t.innerHTML="<xyz></xyz>",u="hidden"in t,!(e=1==t.childNodes.length)){a.createElement("a");var n=a.createDocumentFragment();e=void 0===n.cloneNode||void 0===n.createDocumentFragment||void 0===n.createElement}f=e}catch(e){f=u=!0}}();var h={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==n.shivCSS,supportsUnknownElements:f,shivMethods:!1!==n.shivMethods,type:"default",shivDocument:t,createElement:l,createDocumentFragment:function(e,t){if(e||(e=a),f)return e.createDocumentFragment();for(var n=(t=t||c(e)).frag.cloneNode(),r=0,o=s(),i=o.length;r<i;r++)n.createElement(o[r]);return n}};e.html5=h,t(a)}(this,document),window.Modernizr=function(e,f,i){function n(e){h.cssText=e}function a(e,t){return typeof e===t}function o(e,t){return!!~(""+e).indexOf(t)}function s(e,t){for(var n in e){var r=e[n];if(!o(r,"-")&&h[r]!==i)return"pfx"!=t||r}return!1}function t(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+y.join(r+" ")+r).split(" ");return a(t,"string")||a(t,"undefined")?s(o,t):function(e,t,n){for(var r in e){var o=t[e[r]];if(o!==i)return!1===n?e[r]:a(o,"function")?o.bind(n||t):o}return!1}(o=(e+" "+b.join(r+" ")+r).split(" "),t,n)}var r,c,l={},d=f.documentElement,p="modernizr",u=f.createElement(p),h=u.style,m=":)",g=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),v="Webkit Moz O ms",y=v.split(" "),b=v.toLowerCase().split(" "),C={},w=[],E=w.slice,x=function(e,t,n,r){var o,i,a,s,c=f.createElement("div"),l=f.body,u=l||f.createElement("body");if(parseInt(n,10))for(;n--;)(a=f.createElement("div")).id=r?r[n]:p+(n+1),c.appendChild(a);return o=["&#173;",'<style id="s',p,'">',e,"</style>"].join(""),c.id=p,(l?c:u).innerHTML+=o,u.appendChild(c),l||(u.style.background="",u.style.overflow="hidden",s=d.style.overflow,d.style.overflow="hidden",d.appendChild(u)),i=t(c,e),l?c.parentNode.removeChild(c):(u.parentNode.removeChild(u),d.style.overflow=s),!!i},k={}.hasOwnProperty;for(var j in c=a(k,"undefined")||a(k.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return k.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(r){var o=this;if("function"!=typeof o)throw new TypeError;var i=E.call(arguments,1),a=function(){if(this instanceof a){var e=function(){};e.prototype=o.prototype;var t=new e,n=o.apply(t,i.concat(E.call(arguments)));return Object(n)===n?n:t}return o.apply(r,i.concat(E.call(arguments)))};return a}),C.flexbox=function(){return t("flexWrap")},C.rgba=function(){return n("background-color:rgba(150,255,150,.5)"),o(h.backgroundColor,"rgba")},C.backgroundsize=function(){return t("backgroundSize")},C.borderradius=function(){return t("borderRadius")},C.opacity=function(){return e="opacity:.55",n(g.join(e+";")+(t||"")),/^0.55$/.test(h.opacity);var e,t},C.cssanimations=function(){return t("animationName")},C.cssgradients=function(){var e="background-image:";return n((e+"-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));"+e)+g.join("linear-gradient(left top,#9f9, white);"+e)).slice(0,-e.length)),o(h.backgroundImage,"gradient")},C.csstransforms=function(){return!!t("transform")},C.csstransforms3d=function(){var n=!!t("perspective");return n&&"webkitPerspective"in d.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e,t){n=9===e.offsetLeft&&3===e.offsetHeight}),n},C.csstransitions=function(){return t("transition")},C.fontface=function(){var i;return x('@font-face {font-family:"font";src:url("https://")}',function(e,t){var n=f.getElementById("smodernizr"),r=n.sheet||n.styleSheet,o=r?r.cssRules&&r.cssRules[0]?r.cssRules[0].cssText:r.cssText||"":"";i=/src/i.test(o)&&0===o.indexOf(t.split(" ")[0])}),i},C.generatedcontent=function(){var t;return x(["#",p,"{font:0/0 a}#",p,':after{content:"',m,'";visibility:hidden;font:3px/1 a}'].join(""),function(e){t=3<=e.offsetHeight}),t},C)c(C,j)&&(r=j.toLowerCase(),l[r]=C[j](),w.push((l[r]?"":"no-")+r));return l.addTest=function(e,t){if("object"==typeof e)for(var n in e)c(e,n)&&l.addTest(n,e[n]);else{if(e=e.toLowerCase(),l[e]!==i)return l;t="function"==typeof t?t():t,d.className+=" "+(t?"":"no-")+e,l[e]=t}return l},n(""),u=null,function(e,c){function l(){var e=h.elements;return"string"==typeof e?e.split(" "):e}function u(e){var t=s[e[r]];return t||(t={},a++,e[r]=a,s[a]=t),t}function f(e,t,n){return t||(t=c),p?t.createElement(e):(n||(n=u(t)),!(r=n.cache[e]?n.cache[e].cloneNode():i.test(e)?(n.cache[e]=n.createElem(e)).cloneNode():n.createElem(e)).canHaveChildren||o.test(e)||r.tagUrn?r:n.frag.appendChild(r));var r}function t(e){e||(e=c);var t,n,r,o,i,a,s=u(e);return h.shivCSS&&!d&&!s.hasCSS&&(s.hasCSS=(o="article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}",i=(r=e).createElement("p"),a=r.getElementsByTagName("head")[0]||r.documentElement,i.innerHTML="x<style>"+o+"</style>",!!a.insertBefore(i.lastChild,a.firstChild))),p||(t=e,(n=s).cache||(n.cache={},n.createElem=t.createElement,n.createFrag=t.createDocumentFragment,n.frag=n.createFrag()),t.createElement=function(e){return h.shivMethods?f(e,t,n):n.createElem(e)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/[\w\-]+/g,function(e){return n.createElem(e),n.frag.createElement(e),'c("'+e+'")'})+");return n}")(h,n.frag)),e}var d,p,n=e.html5||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,i=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,r="_html5shiv",a=0,s={};!function(){try{var e=c.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,p=1==e.childNodes.length||function(){c.createElement("a");var e=c.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){p=d=!0}}();var h={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==n.shivCSS,supportsUnknownElements:p,shivMethods:!1!==n.shivMethods,type:"default",shivDocument:t,createElement:f,createDocumentFragment:function(e,t){if(e||(e=c),p)return e.createDocumentFragment();for(var n=(t=t||u(e)).frag.cloneNode(),r=0,o=l(),i=o.length;r<i;r++)n.createElement(o[r]);return n}};e.html5=h,t(c)}(this,f),l._version="2.8.3",l._prefixes=g,l._domPrefixes=b,l._cssomPrefixes=y,l.testProp=function(e){return s([e])},l.testAllProps=t,l.testStyles=x,d.className=d.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+w.join(" "),l}(0,this.document),function(e,d,s){function f(e){return"[object Function]"==o.call(e)}function p(e){return"string"==typeof e}function h(){}function m(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function g(){var e=C.shift();w=1,e?e.t?y(function(){("c"==e.t?v.injectCss:v.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),g()):w=0}function t(e,t,n,r,o){return w=0,t=t||"j",p(e)?function(n,r,e,t,o,i,a){function s(e){if(!l&&m(c.readyState)&&(f.r=l=1,!w&&g(),c.onload=c.onreadystatechange=null,e))for(var t in"img"!=n&&y(function(){x.removeChild(c)},50),S[r])S[r].hasOwnProperty(t)&&S[r][t].onload()}a=a||v.errorTimeout;var c=d.createElement(n),l=0,u=0,f={t:e,s:r,e:o,a:i,x:a};1===S[r]&&(u=1,S[r]=[]),"object"==n?c.data=r:(c.src=r,c.type=n),c.width=c.height="0",c.onerror=c.onload=c.onreadystatechange=function(){s.call(this,u)},C.splice(t,0,f),"img"!=n&&(u||2===S[r]?(x.insertBefore(c,E?null:b),y(s,a)):S[r].push(c))}("c"==t?l:a,e,t,this.i++,n,r,o):(C.splice(this.i++,0,e),1==C.length&&g()),this}function c(){var e=v;return e.loader={load:t,i:0},e}var n,v,r=d.documentElement,y=e.setTimeout,b=d.getElementsByTagName("script")[0],o={}.toString,C=[],w=0,i="MozAppearance"in r.style,E=i&&!!d.createRange().compareNode,x=E?r:b.parentNode,a=(r=e.opera&&"[object Opera]"==o.call(e.opera),r=!!d.attachEvent&&!r,i?"object":r?"script":"img"),l=r?"script":a,k=Array.isArray||function(e){return"[object Array]"==o.call(e)},j=[],S={},T={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};(v=function(e){function u(e,t,n,r,o){var i=function(e){e=e.split("!");var t,n,r,o=j.length,i=e.pop(),a=e.length;for(i={url:i,origUrl:i,prefixes:e},n=0;n<a;n++)r=e[n].split("="),(t=T[r.shift()])&&(i=t(i,r));for(n=0;n<o;n++)i=j[n](i);return i}(e),a=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(t&&(t=f(t)?t:t[e]||t[r]||t[e.split("/").pop().split("?")[0]]),i.instead?i.instead(e,t,n,r,o):(S[i.url]?i.noexec=!0:S[i.url]=1,n.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":s,i.noexec,i.attrs,i.timeout),(f(t)||f(a))&&n.load(function(){c(),t&&t(i.origUrl,o,r),a&&a(i.origUrl,o,r),S[i.url]=2})))}function t(e,t){function n(n,e){if(n){if(p(n))e||(s=function(){var e=[].slice.call(arguments);c.apply(this,e),l()}),u(n,s,t,0,i);else if(Object(n)===n)for(o in r=function(){var e,t=0;for(e in n)n.hasOwnProperty(e)&&t++;return t}(),n)n.hasOwnProperty(o)&&(!e&&!--r&&(f(s)?s=function(){var e=[].slice.call(arguments);c.apply(this,e),l()}:s[o]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),l()}}(c[o])),u(n[o],s,t,o,i))}else!e&&l()}var r,o,i=!!e.test,a=e.load||e.both,s=e.callback||h,c=s,l=e.complete||h;n(i?e.yep:e.nope,!!a),a&&n(a)}var n,r,o=this.yepnope.loader;if(p(e))u(e,0,o,0);else if(k(e))for(n=0;n<e.length;n++)p(r=e[n])?u(r,0,o,0):k(r)?v(r):Object(r)===r&&t(r,o);else Object(e)===e&&t(e,o)}).addPrefix=function(e,t){T[e]=t},v.addFilter=function(e){j.push(e)},v.errorTimeout=1e4,null==d.readyState&&d.addEventListener&&(d.readyState="loading",d.addEventListener("DOMContentLoaded",n=function(){d.removeEventListener("DOMContentLoaded",n,0),d.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=g,e.yepnope.injectJs=function(e,t,n,r,o,i){var a,s,c=d.createElement("script");r=r||v.errorTimeout;for(s in c.src=e,n)c.setAttribute(s,n[s]);t=i?g:t||h,c.onreadystatechange=c.onload=function(){!a&&m(c.readyState)&&(a=1,t(),c.onload=c.onreadystatechange=null)},y(function(){a||t(a=1)},r),o?c.onload():b.parentNode.insertBefore(c,b)},e.yepnope.injectCss=function(e,t,n,r,o,i){var a;r=d.createElement("link"),t=i?g:t||h;for(a in r.href=e,r.rel="stylesheet",r.type="text/css",n)r.setAttribute(a,n[a]);o||(b.parentNode.insertBefore(r,b),y(t,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("csscalc",function(){var e=document.createElement("div");return e.style.cssText="width:"+Modernizr._prefixes.join("calc(10px);width:"),!!e.style.length}),Modernizr.addTest("cssfilters",function(){var e=document.createElement("div");return e.style.cssText=Modernizr._prefixes.join("filter:blur(2px); "),!!e.style.length&&(void 0===document.documentMode||9<document.documentMode)}),Modernizr.addTest("svgfilters",function(){var e=!1;try{e=void 0!==typeof SVGFEColorMatrixElement&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(e){}return e});