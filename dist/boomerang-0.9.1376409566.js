BOOMR_start=(new Date).getTime();!function(w){if(w.parent!==w&&document.getElementById("boomr-if-as")&&document.getElementById("boomr-if-as").nodeName.toLowerCase()==="script"){w=w.parent}var impl,boomr,k,d=w.document;if(w.BOOMR===undefined){w.BOOMR={}}BOOMR=w.BOOMR;if(BOOMR.version){return}BOOMR.version="0.9.1376409566";BOOMR.window=w;impl={beacon_url:"",site_domain:w.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase(),user_ip:"",onloadfired:false,handlers_attached:false,events:{page_ready:[],page_unload:[],dom_loaded:[],visibility_changed:[],before_beacon:[],click:[]},vars:{},disabled_plugins:{},onclick_handler:function(ev){var target;if(!ev){ev=w.event}if(ev.target){target=ev.target}else if(ev.srcElement){target=ev.srcElement}if(target.nodeType===3){target=target.parentNode}if(target&&target.nodeName.toUpperCase()==="OBJECT"&&target.type==="application/x-shockwave-flash"){return}impl.fireEvent("click",target)},fireEvent:function(e_name,data){var i,h,e;if(!this.events.hasOwnProperty(e_name)){return false}e=this.events[e_name];for(i=0;i<e.length;i++){h=e[i];h[0].call(h[2],data,h[1])}return true}};boomr={t_start:BOOMR_start,t_end:null,utils:{objectToString:function(o,separator){var value=[],k;if(!o||typeof o!=="object"){return o}if(separator===undefined){separator="\n	"}for(k in o){if(Object.prototype.hasOwnProperty.call(o,k)){value.push(encodeURIComponent(k)+"="+encodeURIComponent(o[k]))}}return value.join(separator)},getCookie:function(name){if(!name){return null}name=" "+name+"=";var i,cookies;cookies=" "+d.cookie+";";if((i=cookies.indexOf(name))>=0){i+=name.length;cookies=cookies.substring(i,cookies.indexOf(";",i));return cookies}return null},setCookie:function(name,subcookies,max_age){var value,nameval,c,exp;if(!name||!impl.site_domain){return false}value=this.objectToString(subcookies,"&");nameval=name+"="+value;c=[nameval,"path=/","domain="+impl.site_domain];if(max_age){exp=new Date;exp.setTime(exp.getTime()+max_age*1e3);exp=exp.toGMTString();c.push("expires="+exp)}if(nameval.length<4e3){d.cookie=c.join("; ");return value===this.getCookie(name)}return false},getSubCookies:function(cookie){var cookies_a,i,l,kv,cookies={};if(!cookie){return null}cookies_a=cookie.split("&");if(cookies_a.length===0){return null}for(i=0,l=cookies_a.length;i<l;i++){kv=cookies_a[i].split("=");kv.push("");cookies[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1])}return cookies},removeCookie:function(name){return this.setCookie(name,{},0)},pluginConfig:function(o,config,plugin_name,properties){var i,props=0;if(!config||!config[plugin_name]){return false}for(i=0;i<properties.length;i++){if(config[plugin_name][properties[i]]!==undefined){o[properties[i]]=config[plugin_name][properties[i]];props++}}return props>0},addListener:function(el,type,fn){if(el.addEventListener){el.addEventListener(type,fn,false)}else{el.attachEvent("on"+type,fn)}},removeListener:function(el,type,fn){if(el.removeEventListener){el.removeEventListener(type,fn,false)}else{el.detachEvent("on"+type,fn)}}},init:function(config){var i,k,properties=["beacon_url","site_domain","user_ip"];if(!config){config={}}for(i=0;i<properties.length;i++){if(config[properties[i]]!==undefined){impl[properties[i]]=config[properties[i]]}}if(config.log!==undefined){this.log=config.log}if(!this.log){this.log=function(){}}for(k in this.plugins){if(this.plugins.hasOwnProperty(k)){if(config[k]&&config[k].hasOwnProperty("enabled")&&config[k].enabled===false){impl.disabled_plugins[k]=1;continue}else if(impl.disabled_plugins[k]){delete impl.disabled_plugins[k]}if(typeof this.plugins[k].init==="function"){this.plugins[k].init(config)}}}if(impl.handlers_attached){return this}if(!impl.onloadfired&&(config.autorun===undefined||config.autorun!==false)){if(d.readyState&&d.readyState==="complete"){this.setImmediate(BOOMR.page_ready,null,null,BOOMR)}else{if(w.onpagehide||w.onpagehide===null){boomr.utils.addListener(w,"pageshow",BOOMR.page_ready)}else{boomr.utils.addListener(w,"load",BOOMR.page_ready)}}}boomr.utils.addListener(w,"DOMContentLoaded",function(){impl.fireEvent("dom_loaded")});!function(){var fire_visible=function(){impl.fireEvent("visibility_changed")};if(d.webkitVisibilityState){boomr.utils.addListener(d,"webkitvisibilitychange",fire_visible)}else if(d.msVisibilityState){boomr.utils.addListener(d,"msvisibilitychange",fire_visible)}else if(d.visibilityState){boomr.utils.addListener(d,"visibilitychange",fire_visible)}boomr.utils.addListener(d,"mouseup",impl.onclick_handler);if(!w.onpagehide&&w.onpagehide!==null){boomr.utils.addListener(w,"unload",function(){BOOMR.window=w=null})}}();impl.handlers_attached=true;return this},page_ready:function(){if(impl.onloadfired){return this}impl.fireEvent("page_ready");impl.onloadfired=true;return this},setImmediate:function(fn,data,cb_data,cb_scope){var cb=function(){fn.call(cb_scope||null,data,cb_data||{});cb=null};if(w.setImmediate){w.setImmediate(cb)}else if(w.msSetImmediate){w.msSetImmediate(cb)}else if(w.webkitSetImmediate){w.webkitSetImmediate(cb)}else if(w.mozSetImmediate){w.mozSetImmediate(cb)}else{setTimeout(cb,10)}},subscribe:function(e_name,fn,cb_data,cb_scope){var i,h,e,unload_handler;if(!impl.events.hasOwnProperty(e_name)){return this}e=impl.events[e_name];for(i=0;i<e.length;i++){h=e[i];if(h[0]===fn&&h[1]===cb_data&&h[2]===cb_scope){return this}}e.push([fn,cb_data||{},cb_scope||null]);if(e_name==="page_ready"&&impl.onloadfired){this.setImmediate(fn,null,cb_data,cb_scope)}if(e_name==="page_unload"){unload_handler=function(ev){if(fn){fn.call(cb_scope,ev||w.event,cb_data)}};if(w.onpagehide||w.onpagehide===null){boomr.utils.addListener(w,"pagehide",unload_handler)}else{boomr.utils.addListener(w,"unload",unload_handler)}boomr.utils.addListener(w,"beforeunload",unload_handler)}return this},addVar:function(name,value){if(typeof name==="string"){impl.vars[name]=value}else if(typeof name==="object"){var o=name,k;for(k in o){if(o.hasOwnProperty(k)){impl.vars[k]=o[k]}}}return this},removeVar:function(arg0){var i,params;if(!arguments.length){return this}if(arguments.length===1&&Object.prototype.toString.apply(arg0)==="[object Array]"){params=arg0}else{params=arguments}for(i=0;i<params.length;i++){if(impl.vars.hasOwnProperty(params[i])){delete impl.vars[params[i]]}}return this},sendBeacon:function(){var k,url,img,nparams=0;for(k in this.plugins){if(this.plugins.hasOwnProperty(k)){if(impl.disabled_plugins[k]){continue}if(!this.plugins[k].is_complete()){return this}}}impl.vars.v=BOOMR.version;impl.vars.u=d.URL.replace(/#.*/,"");if(w!==window){impl.vars["if"]=""}impl.fireEvent("before_beacon",impl.vars);if(!impl.beacon_url){return this}url=[];for(k in impl.vars){if(impl.vars.hasOwnProperty(k)){nparams++;url.push(encodeURIComponent(k)+"="+(impl.vars[k]===undefined||impl.vars[k]===null?"":encodeURIComponent(impl.vars[k])))}}url=impl.beacon_url+(impl.beacon_url.indexOf("?")>-1?"&":"?")+url.join("&");BOOMR.debug("Sending url: "+url.replace(/&/g,"\n	"));if(nparams){img=new Image;img.src=url}return this}};delete BOOMR_start;!function(){var make_logger=function(l){return function(m,s){this.log(m,l,"boomerang"+(s?"."+s:""));return this}};boomr.debug=make_logger("debug");boomr.info=make_logger("info");boomr.warn=make_logger("warn");boomr.error=make_logger("error")}();if(w.YAHOO&&w.YAHOO.widget&&w.YAHOO.widget.Logger){boomr.log=w.YAHOO.log}else if(w.Y&&w.Y.log){boomr.log=w.Y.log}else if(typeof console==="object"&&console.log!==undefined){boomr.log=function(m,l,s){console.log(s+": ["+l+"] "+m)}}for(k in boomr){if(boomr.hasOwnProperty(k)){BOOMR[k]=boomr[k]}}BOOMR.plugins=BOOMR.plugins||{}}(window);!function(w){var d=w.document,impl;BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};impl={initialized:false,complete:false,timers:{},cookie:"RT",cookie_exp:600,strict_referrer:true,navigationType:0,navigationStart:undefined,responseStart:undefined,t_start:undefined,t_fb_approx:undefined,r:undefined,r2:undefined,setCookie:function(how,url){var t_end,t_start,subcookies;if(!this.cookie){return this}subcookies=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie))||{};if(how==="ul"){subcookies.r=d.URL.replace(/#.*/,"")}if(how==="cl"){if(url){subcookies.nu=url}else if(subcookies.nu){delete subcookies.nu}}if(url===false){delete subcookies.nu}t_start=(new Date).getTime();if(how){subcookies[how]=t_start}BOOMR.debug("Setting cookie "+BOOMR.utils.objectToString(subcookies),"rt");if(!BOOMR.utils.setCookie(this.cookie,subcookies,this.cookie_exp)){BOOMR.error("cannot set start cookie","rt");return this}t_end=(new Date).getTime();if(t_end-t_start>50){BOOMR.utils.removeCookie(this.cookie);BOOMR.error("took more than 50ms to set cookie... aborting: "+t_start+" -> "+t_end,"rt")}return this},initFromCookie:function(){var subcookies;if(!this.cookie){return}subcookies=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie));if(!subcookies){return}subcookies.s=Math.max(+subcookies.ul||0,+subcookies.cl||0);BOOMR.debug("Read from cookie "+BOOMR.utils.objectToString(subcookies),"rt");if(subcookies.s&&subcookies.r){this.r=subcookies.r;BOOMR.debug(this.r+" =?= "+this.r2,"rt");BOOMR.debug(subcookies.s+" <? "+(+subcookies.cl+15),"rt");BOOMR.debug(subcookies.nu+" =?= "+d.URL.replace(/#.*/,""),"rt");if(!this.strict_referrer||this.r===this.r2||subcookies.s<+subcookies.cl+15&&subcookies.nu===d.URL.replace(/#.*/,"")){this.t_start=subcookies.s;if(+subcookies.hd>subcookies.s){this.t_fb_approx=parseInt(subcookies.hd,10)}}else{this.t_start=this.t_fb_approx=undefined}}},checkPreRender:function(){if(!(d.webkitVisibilityState&&d.webkitVisibilityState==="prerender")&&!(d.msVisibilityState&&d.msVisibilityState===3)){return false}BOOMR.plugins.RT.startTimer("t_load",this.navigationStart);BOOMR.plugins.RT.endTimer("t_load");BOOMR.plugins.RT.startTimer("t_prerender",this.navigationStart);BOOMR.plugins.RT.startTimer("t_postrender");BOOMR.subscribe("visibility_changed",BOOMR.plugins.RT.done,null,BOOMR.plugins.RT);return true},initNavTiming:function(){var ti,p,source;if(this.navigationStart){return}p=w.performance||w.msPerformance||w.webkitPerformance||w.mozPerformance;if(p&&p.navigation){this.navigationType=p.navigation.type}if(p&&p.timing){ti=p.timing}else if(w.chrome&&w.chrome.csi&&w.chrome.csi().startE){ti={navigationStart:w.chrome.csi().startE};source="csi"}else if(w.gtbExternal&&w.gtbExternal.startE()){ti={navigationStart:w.gtbExternal.startE()};source="gtb"}if(ti){BOOMR.addVar("rt.start",source||"navigation");this.navigationStart=ti.navigationStart||ti.fetchStart||undefined;this.responseStart=ti.responseStart||undefined;if(navigator.userAgent.match(/Firefox\/[78]\./)){this.navigationStart=ti.unloadEventStart||ti.fetchStart||undefined}}else{BOOMR.warn("This browser doesn't support the WebTiming API","rt")}return},page_unload:function(edata){BOOMR.debug("Unload called with "+BOOMR.utils.objectToString(edata),"rt");this.setCookie(edata.type==="beforeunload"?"ul":"hd")},onclick:function(etarget){if(!etarget){return}BOOMR.debug("Click called with "+etarget.nodeName,"rt");while(etarget&&etarget.nodeName.toUpperCase()!=="A"){etarget=etarget.parentNode}if(etarget&&etarget.nodeName.toUpperCase()==="A"){BOOMR.debug("passing through","rt");this.setCookie("cl",etarget.href)}},domloaded:function(){BOOMR.plugins.RT.endTimer("t_domloaded")}};BOOMR.plugins.RT={init:function(config){BOOMR.debug("init RT","rt");if(w!==BOOMR.window){w=BOOMR.window;d=w.document}BOOMR.utils.pluginConfig(impl,config,"RT",["cookie","cookie_exp","strict_referrer"]);impl.initFromCookie();if(impl.initialized){return this}impl.complete=false;impl.timers={};BOOMR.subscribe("page_ready",this.done,null,this);BOOMR.subscribe("dom_loaded",impl.domloaded,null,impl);BOOMR.subscribe("page_unload",impl.page_unload,null,impl);BOOMR.subscribe("click",impl.onclick,null,impl);if(BOOMR.t_start){this.startTimer("boomerang",BOOMR.t_start);this.endTimer("boomerang",BOOMR.t_end);this.endTimer("boomr_fb",BOOMR.t_start)}impl.r=impl.r2=d.referrer.replace(/#.*/,"");impl.initialized=true;return this},startTimer:function(timer_name,time_value){if(timer_name){if(timer_name==="t_page"){this.endTimer("t_resp",time_value)}impl.timers[timer_name]={start:typeof time_value==="number"?time_value:(new Date).getTime()};impl.complete=false}return this},endTimer:function(timer_name,time_value){if(timer_name){impl.timers[timer_name]=impl.timers[timer_name]||{};if(impl.timers[timer_name].end===undefined){impl.timers[timer_name].end=typeof time_value==="number"?time_value:(new Date).getTime()}}return this},setTimer:function(timer_name,time_delta){if(timer_name){impl.timers[timer_name]={delta:time_delta}}return this},done:function(){BOOMR.debug("Called done","rt");var t_start,t_done=(new Date).getTime(),basic_timers={t_done:1,t_resp:1,t_page:1},ntimers=0,t_name,timer,t_other=[];impl.complete=false;impl.initFromCookie();impl.initNavTiming();if(impl.checkPreRender()){return this}if(impl.responseStart){this.endTimer("t_resp",impl.responseStart);if(impl.timers.t_load){this.setTimer("t_page",impl.timers.t_load.end-impl.responseStart)}else{this.setTimer("t_page",t_done-impl.responseStart)}}else if(impl.timers.hasOwnProperty("t_page")){this.endTimer("t_page")}else if(impl.t_fb_approx){this.endTimer("t_resp",impl.t_fb_approx);this.setTimer("t_page",t_done-impl.t_fb_approx)}if(impl.timers.hasOwnProperty("t_postrender")){this.endTimer("t_postrender");this.endTimer("t_prerender")}if(impl.navigationStart){t_start=impl.navigationStart}else if(impl.t_start&&impl.navigationType!==2){t_start=impl.t_start;BOOMR.addVar("rt.start","cookie")}else{BOOMR.addVar("rt.start","none");t_start=undefined}this.endTimer("t_done",t_done);BOOMR.removeVar("t_done","t_page","t_resp","r","r2","rt.tstart","rt.bstart","rt.end","t_postrender","t_prerender","t_load");BOOMR.addVar("rt.tstart",t_start);BOOMR.addVar("rt.bstart",BOOMR.t_start);BOOMR.addVar("rt.end",impl.timers.t_done.end);for(t_name in impl.timers){if(impl.timers.hasOwnProperty(t_name)){timer=impl.timers[t_name];if(typeof timer.delta!=="number"){if(typeof timer.start!=="number"){timer.start=t_start}timer.delta=timer.end-timer.start}if(isNaN(timer.delta)){continue}if(basic_timers.hasOwnProperty(t_name)){BOOMR.addVar(t_name,timer.delta)}else{t_other.push(t_name+"|"+timer.delta)}ntimers++}}if(ntimers){BOOMR.addVar("r",impl.r);if(impl.r2!==impl.r){BOOMR.addVar("r2",impl.r2)}if(t_other.length){BOOMR.addVar("t_other",t_other.join(","))}}impl.timers={};impl.complete=true;BOOMR.sendBeacon();return this},is_complete:function(){return impl.complete}}}(window);!function(d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;function done(){complete=true}function iscomplete(){return complete}function count(){var tags=[];tags.push("scripts|"+d.getElementsByTagName("script").length);tags.push("scriptssrc|"+d.querySelectorAll("script[src]").length);tags.push("stylesheets|"+d.querySelectorAll("link[rel=stylesheet]").length);var imgsNumber=d.getElementsByTagName("img").length;tags.push("imgs|"+imgsNumber);tags.push("loadedimgs|"+(imgsNumber-d.querySelectorAll("img[data-frz-src]").length));BOOMR.addVar("optimized",!!window.fstrz);BOOMR.addVar("domstats",tags.join(","));complete=true;BOOMR.sendBeacon()}BOOMR.plugins.Domstats={init:function(){if(!d.querySelectorAll){done()}else{BOOMR.subscribe("page_ready",count)}return this},is_complete:iscomplete}}(document);!function(w){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete,jserrors=0;function done(){BOOMR.addVar("jserrors",jserrors);complete=true;BOOMR.sendBeacon()}function iscomplete(){return complete}function newError(){jserrors++}BOOMR.plugins.JsErrors={init:function(){BOOMR.utils.addListener(window,"error",newError);BOOMR.subscribe("page_ready",done);return this},is_complete:iscomplete}}(window);!function(w,d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete,name="t_ttfc";function done(){complete=true;BOOMR.sendBeacon()}function iscomplete(){return complete}function clicked(){BOOMR.utils.setCookie(name,{value:(new Date).getTime()-w.BOOMR_lstart});BOOMR.utils.removeListener(d,"mousedown",clicked)}BOOMR.plugins.TTFC={init:function(){var ttfc=BOOMR.utils.getCookie(name);if(ttfc){ttfc=BOOMR.utils.getSubCookies(ttfc)}else{ttfc={value:0}}if(ttfc.value){BOOMR.plugins.RT.setTimer(name,parseInt(ttfc.value));BOOMR.utils.removeCookie(name)}if(w.BOOMR_lstart){BOOMR.utils.addListener(d,"mousedown",clicked)}done();return this},is_complete:iscomplete}}(this,document);!function(w,d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;function iscomplete(){return complete}function ready(){BOOMR.plugins.RT.startTimer("t_page",w.BOOMR_lstart);complete=true;BOOMR.sendBeacon()}BOOMR.plugins.Legacy={init:function(){BOOMR.subscribe("page_ready",ready);return this},is_complete:iscomplete}}(this,document);var config;if(window.boomr_beacon_url){config={beacon_url:window.boomr_beacon_url}}else if(window.BOOMR_GLOBAL_CONFIG){config=window.BOOMR_GLOBAL_CONFIG}if(config!==undefined){BOOMR.init(config)}BOOMR.t_end=(new Date).getTime();