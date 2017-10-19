/*
 jquery.selectBoxIt - v3.8.1 - 2013-10-17
 http://www.selectboxit.com
 Copyright (c) 2013 Greg Franko; Licensed MIT*/
(function(d){d(window.jQuery,window,document)})(function(d,p,x,y){d.widget("selectBox.selectBoxIt",{VERSION:"3.8.1",options:{showEffect:"none",showEffectOptions:{},showEffectSpeed:"medium",hideEffect:"none",hideEffectOptions:{},hideEffectSpeed:"medium",showFirstOption:!0,defaultText:"",defaultIcon:"",downArrowIcon:"",theme:"default",keydownOpen:!0,isMobile:function(){return/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(navigator.userAgent||navigator.vendor||p.opera)},"native":!1,
aggressiveChange:!1,selectWhenHidden:!0,viewport:d(p),similarSearch:!1,copyAttributes:["title","rel"],copyClasses:"button",nativeMousedown:!1,customShowHideEvent:!1,autoWidth:!0,html:!0,populate:"",dynamicPositioning:!0,hideCurrent:!1},getThemes:function(){var a=d(this.element).attr("data-theme")||"c";return{bootstrap:{focus:"active",hover:"",enabled:"enabled",disabled:"disabled",arrow:"caret",button:"btn",list:"dropdown-menu",container:"bootstrap",open:"open"},jqueryui:{focus:"ui-state-focus",hover:"ui-state-hover",
enabled:"ui-state-enabled",disabled:"ui-state-disabled",arrow:"ui-icon ui-icon-triangle-1-s",button:"ui-widget ui-state-default",list:"ui-widget ui-widget-content",container:"jqueryui",open:"selectboxit-open"},jquerymobile:{focus:"ui-btn-down-"+a,hover:"ui-btn-hover-"+a,enabled:"ui-enabled",disabled:"ui-disabled",arrow:"ui-icon ui-icon-arrow-d ui-icon-shadow",button:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+a,list:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+
a,container:"jquerymobile",open:"selectboxit-open"},"default":{focus:"selectboxit-focus",hover:"selectboxit-hover",enabled:"selectboxit-enabled",disabled:"selectboxit-disabled",arrow:"selectboxit-default-arrow",button:"selectboxit-btn",list:"selectboxit-list",container:"selectboxit-container",open:"selectboxit-open"}}},isDeferred:function(a){return d.isPlainObject(a)&&a.promise&&a.done},_create:function(a){var b=this.options.populate,c=this.options.theme;if(this.element.is("select"))return this.widgetProto=
d.Widget.prototype,this.originalElem=this.element[0],this.selectBox=this.element,this.options.populate&&this.add&&!a&&this.add(b),this.selectItems=this.element.find("option"),this.firstSelectItem=this.selectItems.slice(0,1),this.documentHeight=d(x).height(),this.theme=d.isPlainObject(c)?d.extend({},this.getThemes()["default"],c):this.getThemes()[c]?this.getThemes()[c]:this.getThemes()["default"],this.currentFocus=0,this.blur=!0,this.textArray=[],this.currentIndex=0,this.currentText="",this.flipped=
!1,a||(this.selectBoxStyles=this.selectBox.attr("style")),this._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(this.theme)._eventHandlers(),this.originalElem.disabled&&this.disable&&this.disable(),this._ariaAccessibility&&this._ariaAccessibility(),this.isMobile=this.options.isMobile(),this._mobile&&this._mobile(),this.options["native"]&&this._applyNativeSelect(),this.triggerEvent("create"),this},_createDropdownButton:function(){var a=this.originalElemId=
this.originalElem.id||"",b=this.originalElemValue=this.originalElem.value||"",c=this.originalElemName=this.originalElem.name||"",h=this.options.copyClasses,f=this.selectBox.attr("class")||"";this.dropdownText=d("<span/>",{id:a&&a+"SelectBoxItText","class":"selectboxit-text",unselectable:"on",text:this.firstSelectItem.text()}).attr("data-val",b);this.dropdownImageContainer=d("<span/>",{"class":"selectboxit-option-icon-container"});this.dropdownImage=d("<i/>",{id:a&&a+"SelectBoxItDefaultIcon","class":"selectboxit-default-icon",
unselectable:"on"});this.dropdown=d("<span/>",{id:a&&a+"SelectBoxIt","class":"selectboxit "+("button"===h?f:"")+" "+(this.selectBox.prop("disabled")?this.theme.disabled:this.theme.enabled),name:c,tabindex:this.selectBox.attr("tabindex")||"0",unselectable:"on"}).append(this.dropdownImageContainer.append(this.dropdownImage)).append(this.dropdownText);this.dropdownContainer=d("<span/>",{id:a&&a+"SelectBoxItContainer","class":"selectboxit-container "+this.theme.container+" "+("container"===h?f:"")}).append(this.dropdown);
return this},_createUnorderedList:function(){var a=this,b,c,h,f,g,e,l,m="",q=a.originalElemId||"";q=d("<ul/>",{id:q&&q+"SelectBoxItOptions","class":"selectboxit-options",tabindex:-1});var v,w,u,r,n,t;a.options.showFirstOption||(a.selectItems.first().attr("disabled","disabled"),a.selectItems=a.selectBox.find("option").slice(1));a.selectItems.each(function(k){n=d(this);h=c="";b=n.prop("disabled");f=n.attr("data-icon")||"";e=(g=n.attr("data-iconurl")||"")?"selectboxit-option-icon-url":"";l=g?"style=\"background-image:url('"+
g+"');\"":"";v=n.attr("data-selectedtext");r=(w=n.attr("data-text"))?w:n.text();t=n.parent();t.is("optgroup")&&(c="selectboxit-optgroup-option",0===n.index()&&(h='<span class="selectboxit-optgroup-header '+t.first().attr("class")+'"data-disabled="true">'+t.first().attr("label")+"</span>"));n.attr("value",this.value);m+=h+'<li data-id="'+k+'" data-val="'+this.value+'" data-disabled="'+b+'" class="'+c+" selectboxit-option "+(d(this).attr("class")||"")+'"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon '+
f+" "+(e||a.theme.container)+'"'+l+"></i></span>"+(a.options.html?r:a.htmlEscape(r))+"</a></li>";u=n.attr("data-search");a.textArray[k]=b?"":u?u:r;this.selected&&(a._setText(a.dropdownText,v||r),a.currentFocus=k)});if(a.options.defaultText||a.selectBox.attr("data-text")){var p=a.options.defaultText||a.selectBox.attr("data-text");a._setText(a.dropdownText,p);a.options.defaultText=p}q.append(m);a.list=q;a.dropdownContainer.append(a.list);a.listItems=a.list.children("li");a.listAnchors=a.list.find("a");
a.listItems.first().addClass("selectboxit-option-first");a.listItems.last().addClass("selectboxit-option-last");a.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(a.theme.disabled);a.dropdownImage.addClass(a.selectBox.attr("data-icon")||a.options.defaultIcon||a.listItems.eq(a.currentFocus).find("i").attr("class"));a.dropdownImage.attr("style",a.listItems.eq(a.currentFocus).find("i").attr("style"));return a},_replaceSelectBox:function(){var a=this.originalElem.id||"",b=this.selectBox.attr("data-size");
b=this.listSize=b===y?"auto":"0"===b?"auto":+b;this.selectBox.css("display","none").after(this.dropdownContainer);this.dropdownContainer.appendTo("body").addClass("selectboxit-rendering");this.dropdown.height();this.downArrow=d("<i/>",{id:a&&a+"SelectBoxItArrow","class":"selectboxit-arrow",unselectable:"on"});this.downArrowContainer=d("<span/>",{id:a&&a+"SelectBoxItArrowContainer","class":"selectboxit-arrow-container",unselectable:"on"}).append(this.downArrow);this.dropdown.append(this.downArrowContainer);
this.listItems.removeClass("selectboxit-selected").eq(this.currentFocus).addClass("selectboxit-selected");a=this.downArrowContainer.outerWidth(!0);var c=this.dropdownImage.outerWidth(!0);this.options.autoWidth&&(this.dropdown.css({width:"auto"}).css({width:this.list.outerWidth(!0)+a+c}),this.list.css({"min-width":this.dropdown.width()}));this.dropdownText.css({"max-width":this.dropdownContainer.outerWidth(!0)-(a+c)});this.selectBox.after(this.dropdownContainer);this.dropdownContainer.removeClass("selectboxit-rendering");
"number"===d.type(b)&&(this.maxHeight=this.listAnchors.outerHeight(!0)*b);return this},_scrollToView:function(a){var b=this.listItems.eq(this.currentFocus),c=this.list.scrollTop(),d=b.height();b=b.position().top;var f=Math.abs(b),g=this.list.height();"search"===a?g-b<d?this.list.scrollTop(c+(b-(g-d))):-1>b&&this.list.scrollTop(b-d):"up"===a?-1>b&&this.list.scrollTop(c-f):"down"===a&&g-b<d&&this.list.scrollTop(c+(f-g+d));return this},_callbackSupport:function(a){d.isFunction(a)&&a.call(this,this.dropdown);
return this},_setText:function(a,b){this.options.html?a.html(b):a.text(b);return this},open:function(a){var b=this,c=b.options.showEffect,d=b.options.showEffectSpeed,f=b.options.showEffectOptions,g=b.options["native"],e=b.isMobile;if(!b.listItems.length||b.dropdown.hasClass(b.theme.disabled))return b;if(!g&&!e&&!this.list.is(":visible")){b.triggerEvent("open");b._dynamicPositioning&&b.options.dynamicPositioning&&b._dynamicPositioning();if("none"===c)b.list.show();else if("show"===c||"slideDown"===
c||"fadeIn"===c)b.list[c](d);else b.list.show(c,f,d);b.list.promise().done(function(){b._scrollToView("search");b.triggerEvent("opened")})}b._callbackSupport(a);return b},close:function(a){var b=this,c=b.options.hideEffect,d=b.options.hideEffectSpeed,f=b.options.hideEffectOptions,g=b.isMobile;if(!b.options["native"]&&!g&&b.list.is(":visible")){b.triggerEvent("close");if("none"===c)b.list.hide();else if("hide"===c||"slideUp"===c||"fadeOut"===c)b.list[c](d);else b.list.hide(c,f,d);b.list.promise().done(function(){b.triggerEvent("closed")})}b._callbackSupport(a);
return b},toggle:function(){var a=this.list.is(":visible");a?this.close():a||this.open()},_keyMappings:{38:"up",40:"down",13:"enter",8:"backspace",9:"tab",32:"space",27:"esc"},_keydownMethods:function(){var a=this,b=a.list.is(":visible")||!a.options.keydownOpen;return{down:function(){a.moveDown&&b&&a.moveDown()},up:function(){a.moveUp&&b&&a.moveUp()},enter:function(){var b=a.listItems.eq(a.currentFocus);a._update(b);"true"!==b.attr("data-preventclose")&&a.close();a.triggerEvent("enter")},tab:function(){a.triggerEvent("tab-blur");
a.close()},backspace:function(){a.triggerEvent("backspace")},esc:function(){a.close()}}},_eventHandlers:function(){var a=this,b=a.options.nativeMousedown,c=a.options.customShowHideEvent,h,f,g=a.focusClass,e=a.hoverClass,l=a.openClass;this.dropdown.on({"click.selectBoxIt":function(){a.dropdown.trigger("focus",!0);a.originalElem.disabled||(a.triggerEvent("click"),b||c||a.toggle())},"mousedown.selectBoxIt":function(){d(this).data("mdown",!0);a.triggerEvent("mousedown");b&&!c&&a.toggle()},"mouseup.selectBoxIt":function(){a.triggerEvent("mouseup")},
"blur.selectBoxIt":function(){a.blur&&(a.triggerEvent("blur"),a.close(),d(this).removeClass(g))},"focus.selectBoxIt":function(b,c){var h=d(this).data("mdown");d(this).removeData("mdown");h||c||setTimeout(function(){a.triggerEvent("tab-focus")},0);c||(d(this).hasClass(a.theme.disabled)||d(this).addClass(g),a.triggerEvent("focus"))},"keydown.selectBoxIt":function(b){var c=a._keyMappings[b.keyCode],d=a._keydownMethods()[c];d&&(d(),!a.options.keydownOpen||"up"!==c&&"down"!==c||a.open());d&&"tab"!==c&&
b.preventDefault()},"keypress.selectBoxIt":function(b){var c=a._keyMappings[b.charCode||b.keyCode],d=String.fromCharCode(b.charCode||b.keyCode);a.search&&(!c||c&&"space"===c)&&a.search(d,!0,!0);"space"===c&&b.preventDefault()},"mouseenter.selectBoxIt":function(){a.triggerEvent("mouseenter")},"mouseleave.selectBoxIt":function(){a.triggerEvent("mouseleave")}});a.list.on({"mouseover.selectBoxIt":function(){a.blur=!1},"mouseout.selectBoxIt":function(){a.blur=!0},"focusin.selectBoxIt":function(){a.dropdown.trigger("focus",
!0)}});a.list.on({"mousedown.selectBoxIt":function(){a._update(d(this));a.triggerEvent("option-click");"false"===d(this).attr("data-disabled")&&"true"!==d(this).attr("data-preventclose")&&a.close();setTimeout(function(){a.dropdown.trigger("focus",!0)},0)},"focusin.selectBoxIt":function(){a.listItems.not(d(this)).removeAttr("data-active");d(this).attr("data-active","");var b=a.list.is(":hidden");(a.options.searchWhenHidden&&b||a.options.aggressiveChange||b&&a.options.selectWhenHidden)&&a._update(d(this));
d(this).addClass(g)},"mouseup.selectBoxIt":function(){b&&!c&&(a._update(d(this)),a.triggerEvent("option-mouseup"),"false"===d(this).attr("data-disabled")&&"true"!==d(this).attr("data-preventclose")&&a.close())},"mouseenter.selectBoxIt":function(){"false"===d(this).attr("data-disabled")&&(a.listItems.removeAttr("data-active"),d(this).addClass(g).attr("data-active",""),a.listItems.not(d(this)).removeClass(g),d(this).addClass(g),a.currentFocus=+d(this).attr("data-id"))},"mouseleave.selectBoxIt":function(){"false"===
d(this).attr("data-disabled")&&(a.listItems.not(d(this)).removeClass(g).removeAttr("data-active"),d(this).addClass(g),a.currentFocus=+d(this).attr("data-id"))},"blur.selectBoxIt":function(){d(this).removeClass(g)}},".selectboxit-option");a.list.on({"click.selectBoxIt":function(a){a.preventDefault()}},"a");a.selectBox.on({"change.selectBoxIt, internal-change.selectBoxIt":function(b,c){if(!c){var d=a.list.find('li[data-val="'+a.originalElem.value+'"]');d.length&&(a.listItems.eq(a.currentFocus).removeClass(a.focusClass),
a.currentFocus=+d.attr("data-id"))}d=a.listItems.eq(a.currentFocus);var g=d.attr("data-selectedtext");f=(h=d.attr("data-text"))?h:d.find("a").text();a._setText(a.dropdownText,g||f);a.dropdownText.attr("data-val",a.originalElem.value);d.find("i").attr("class")&&(a.dropdownImage.attr("class",d.find("i").attr("class")).addClass("selectboxit-default-icon"),a.dropdownImage.attr("style",d.find("i").attr("style")));a.triggerEvent("changed")},"disable.selectBoxIt":function(){a.dropdown.addClass(a.theme.disabled)},
"enable.selectBoxIt":function(){a.dropdown.removeClass(a.theme.disabled)},"open.selectBoxIt":function(){var b=a.list.find("li[data-val='"+a.dropdownText.attr("data-val")+"']");b.length||(b=a.listItems.not("[data-disabled=true]").first());a.currentFocus=+b.attr("data-id");b=a.listItems.eq(a.currentFocus);a.dropdown.addClass(l).removeClass(e).addClass(g);a.listItems.removeClass(a.selectedClass).removeAttr("data-active").not(b).removeClass(g);b.addClass(a.selectedClass).addClass(g);a.options.hideCurrent&&
(a.listItems.show(),b.hide())},"close.selectBoxIt":function(){a.dropdown.removeClass(l)},"blur.selectBoxIt":function(){a.dropdown.removeClass(g)},"mouseenter.selectBoxIt":function(){d(this).hasClass(a.theme.disabled)||a.dropdown.addClass(e)},"mouseleave.selectBoxIt":function(){a.dropdown.removeClass(e)},destroy:function(a){a.preventDefault();a.stopPropagation()}});return a},_update:function(a){var b,c=this.options.defaultText||this.selectBox.attr("data-text"),d=this.listItems.eq(this.currentFocus);
"false"===a.attr("data-disabled")&&(this.listItems.eq(this.currentFocus).attr("data-selectedtext"),(b=d.attr("data-text"))||d.text(),(c&&this.options.html?this.dropdownText.html()===c:this.dropdownText.text()===c)&&this.selectBox.val()===a.attr("data-val")?this.triggerEvent("change"):(this.selectBox.val(a.attr("data-val")),this.currentFocus=+a.attr("data-id"),this.originalElem.value!==this.dropdownText.attr("data-val")&&this.triggerEvent("change")))},_addClasses:function(a){this.focusClass=a.focus;
this.hoverClass=a.hover;var b=a.button,c=a.list,d=a.arrow,f=a.container;this.openClass=a.open;this.selectedClass="selectboxit-selected";this.downArrow.addClass(this.selectBox.attr("data-downarrow")||this.options.downArrowIcon||d);this.dropdownContainer.addClass(f);this.dropdown.addClass(b);this.list.addClass(c);return this},refresh:function(a,b){this._destroySelectBoxIt()._create(!0);b||this.triggerEvent("refresh");this._callbackSupport(a);return this},htmlEscape:function(a){return String(a).replace(/&/g,
"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},triggerEvent:function(a){this.selectBox.trigger(a,{selectbox:this.selectBox,selectboxOption:this.selectItems.eq(this.options.showFirstOption?this.currentFocus:0<=this.currentFocus-1?this.currentFocus:0),dropdown:this.dropdown,dropdownOption:this.listItems.eq(this.currentFocus)});return this},_copyAttributes:function(){this._addSelectBoxAttributes&&this._addSelectBoxAttributes();return this},_realOuterWidth:function(a){if(a.is(":visible"))return a.outerWidth(!0);
a=a.clone();a.css({visibility:"hidden",display:"block",position:"absolute"}).appendTo("body");var b=a.outerWidth(!0);a.remove();return b}});var e=d.selectBox.selectBoxIt.prototype;e._ariaAccessibility=function(){var a=this,b=d("label[for='"+a.originalElem.id+"']");a.dropdownContainer.attr({role:"combobox","aria-autocomplete":"list","aria-haspopup":"true","aria-expanded":"false","aria-owns":a.list[0].id});a.dropdownText.attr({"aria-live":"polite"});a.dropdown.on({"disable.selectBoxIt":function(){a.dropdownContainer.attr("aria-disabled",
"true")},"enable.selectBoxIt":function(){a.dropdownContainer.attr("aria-disabled","false")}});b.length&&a.dropdownContainer.attr("aria-labelledby",b[0].id);a.list.attr({role:"listbox","aria-hidden":"true"});a.listItems.attr({role:"option"});a.selectBox.on({"open.selectBoxIt":function(){a.list.attr("aria-hidden","false");a.dropdownContainer.attr("aria-expanded","true")},"close.selectBoxIt":function(){a.list.attr("aria-hidden","true");a.dropdownContainer.attr("aria-expanded","false")}});return a};e._addSelectBoxAttributes=
function(){var a=this;a._addAttributes(a.selectBox.prop("attributes"),a.dropdown);a.selectItems.each(function(b){a._addAttributes(d(this).prop("attributes"),a.listItems.eq(b))});return a};e._addAttributes=function(a,b){var c=this.options.copyAttributes;a.length&&d.each(a,function(a,f){var h=f.name.toLowerCase(),e=f.value;"null"===e||-1===d.inArray(h,c)&&-1===h.indexOf("data")||b.attr(h,e)});return this};e.destroy=function(a){this._destroySelectBoxIt();this.widgetProto.destroy.call(this);this._callbackSupport(a);
return this};e._destroySelectBoxIt=function(){this.dropdown.off(".selectBoxIt");d.contains(this.dropdownContainer[0],this.originalElem)&&this.dropdownContainer.before(this.selectBox);this.dropdownContainer.remove();this.selectBox.removeAttr("style").attr("style",this.selectBoxStyles);this.triggerEvent("destroy");return this};e.disable=function(a){this.options.disabled||(this.close(),this.selectBox.attr("disabled","disabled"),this.dropdown.removeAttr("tabindex").removeClass(this.theme.enabled).addClass(this.theme.disabled),
this.setOption("disabled",!0),this.triggerEvent("disable"));this._callbackSupport(a);return this};e.disableOption=function(a,b){if("number"===d.type(a)){this.close();var c=this.selectBox.find("option").eq(a);this.triggerEvent("disable-option");c.attr("disabled","disabled");this.listItems.eq(a).attr("data-disabled","true").addClass(this.theme.disabled);if(this.currentFocus===a){c=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;var h=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
c?this.moveDown():h?this.moveUp():this.disable()}}this._callbackSupport(b);return this};e._isDisabled=function(a){this.originalElem.disabled&&this.disable();return this};e._dynamicPositioning=function(){if("number"===d.type(this.listSize))this.list.css("max-height",this.maxHeight||"none");else{var a=this.dropdown.offset().top,b=this.list.data("max-height")||this.list.outerHeight(),c=this.dropdown.outerHeight(),h=this.options.viewport,f=h.height();h=d.isWindow(h.get(0))?h.scrollTop():h.offset().top;
var e=!(a+c+b<=f+h);this.list.data("max-height")||this.list.data("max-height",this.list.outerHeight());e?this.dropdown.offset().top-h>=b?(this.list.css("max-height",b),this.list.css("top",this.dropdown.position().top-this.list.outerHeight())):(a=Math.abs(a+c+b-(f+h)),f=Math.abs(this.dropdown.offset().top-h-b),a<f?(this.list.css("max-height",b-a-c/2),this.list.css("top","auto")):(this.list.css("max-height",b-f-c/2),this.list.css("top",this.dropdown.position().top-this.list.outerHeight()))):(this.list.css("max-height",
b),this.list.css("top","auto"))}return this};e.enable=function(a){this.options.disabled&&(this.triggerEvent("enable"),this.selectBox.removeAttr("disabled"),this.dropdown.attr("tabindex",0).removeClass(this.theme.disabled).addClass(this.theme.enabled),this.setOption("disabled",!1),this._callbackSupport(a));return this};e.enableOption=function(a,b){if("number"===d.type(a)){var c=this.selectBox.find("option").eq(a);this.triggerEvent("enable-option");c.removeAttr("disabled");this.listItems.eq(a).attr("data-disabled",
"false").removeClass(this.theme.disabled)}this._callbackSupport(b);return this};e.moveDown=function(a){this.currentFocus+=1;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,c=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;if(this.currentFocus===this.listItems.length)--this.currentFocus;else{if(b&&c){this.listItems.eq(this.currentFocus-1).blur();this.moveDown();return}b&&!c?--this.currentFocus:(this.listItems.eq(this.currentFocus-
1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("down"),this.triggerEvent("moveDown"))}this._callbackSupport(a);return this};e.moveUp=function(a){--this.currentFocus;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,c=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;if(-1===this.currentFocus)this.currentFocus+=1;else{if(b&&c){this.listItems.eq(this.currentFocus+1).blur();this.moveUp();return}b&&!c?this.currentFocus+=
1:(this.listItems.eq(this.currentFocus+1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("up"),this.triggerEvent("moveUp"))}this._callbackSupport(a);return this};e._setCurrentSearchOption=function(a){(this.options.aggressiveChange||this.options.selectWhenHidden||this.listItems.eq(a).is(":visible"))&&!0!==this.listItems.eq(a).data("disabled")&&(this.listItems.eq(this.currentFocus).blur(),this.currentFocus=this.currentIndex=a,this.listItems.eq(this.currentFocus).focusin(),this._scrollToView("search"),
this.triggerEvent("search"));return this};e._searchAlgorithm=function(a,b){var c=!1,d,f,e=this.textArray,k=this.currentText;var l=a;for(f=e.length;l<f;l+=1){var m=e[l];for(d=0;d<f;d+=1)-1!==e[d].search(b)&&(c=!0,d=f);c||(k=this.currentText=this.currentText.charAt(this.currentText.length-1).replace(/[|()\[{.+*?$\\]/g,"\\$0"));b=new RegExp(k,"gi");if(3>k.length){if(b=new RegExp(k.charAt(0),"gi"),-1!==m.charAt(0).search(b)){this._setCurrentSearchOption(l);if(m.substring(0,k.length).toLowerCase()!==k.toLowerCase()||
this.options.similarSearch)this.currentIndex+=1;return!1}}else if(-1!==m.search(b))return this._setCurrentSearchOption(l),!1;if(m.toLowerCase()===this.currentText.toLowerCase())return this._setCurrentSearchOption(l),this.currentText="",!1}return!0};e.search=function(a,b,c){this.currentText=c?this.currentText+a.replace(/[|()\[{.+*?$\\]/g,"\\$0"):a.replace(/[|()\[{.+*?$\\]/g,"\\$0");this._searchAlgorithm(this.currentIndex,new RegExp(this.currentText,"gi"))&&this._searchAlgorithm(0,this.currentText);
this._callbackSupport(b);return this};e._updateMobileText=function(){var a=this.selectBox.find("option").filter(":selected");var b=(b=a.attr("data-text"))?b:a.text();this._setText(this.dropdownText,b);this.list.find('li[data-val="'+a.val()+'"]').find("i").attr("class")&&this.dropdownImage.attr("class",this.list.find('li[data-val="'+a.val()+'"]').find("i").attr("class")).addClass("selectboxit-default-icon")};e._applyNativeSelect=function(){this.dropdownContainer.append(this.selectBox);this.dropdown.attr("tabindex",
"-1");this.selectBox.css({display:"block",visibility:"visible",width:this._realOuterWidth(this.dropdown),height:this.dropdown.outerHeight(),opacity:"0",position:"absolute",top:"0",left:"0",cursor:"pointer","z-index":"999999",margin:this.dropdown.css("margin"),padding:"0","-webkit-appearance":"menulist-button"});this.originalElem.disabled&&this.triggerEvent("disable");return this};e._mobileEvents=function(){var a=this;a.selectBox.on({"changed.selectBoxIt":function(){a.hasChanged=!0;a._updateMobileText();
a.triggerEvent("option-click")},"mousedown.selectBoxIt":function(){a.hasChanged||!a.options.defaultText||a.originalElem.disabled||(a._updateMobileText(),a.triggerEvent("option-click"))},"enable.selectBoxIt":function(){a.selectBox.removeClass("selectboxit-rendering")},"disable.selectBoxIt":function(){a.selectBox.addClass("selectboxit-rendering")}})};e._mobile=function(a){this.isMobile&&(this._applyNativeSelect(),this._mobileEvents());return this};e.selectOption=function(a,b){var c=d.type(a);"number"===
c?this.selectBox.val(this.selectItems.eq(a).val()).change():"string"===c&&this.selectBox.val(a).change();this._callbackSupport(b);return this};e.setOption=function(a,b,c){var h=this;"string"===d.type(a)&&(h.options[a]=b);h.refresh(function(){h._callbackSupport(c)},!0);return h};e.setOptions=function(a,b){var c=this;d.isPlainObject(a)&&(c.options=d.extend({},c.options,a));c.refresh(function(){c._callbackSupport(b)},!0);return c};e.wait=function(a,b){this.widgetProto._delay.call(this,b,a);return this};
e.add=function(a,b){this._populate(a,function(a){var c=this,e=d.type(a),g=0,k,l=[],m=(k=c._isJSON(a))&&c._parseJSON(a);if(a&&("array"===e||k&&m.data&&"array"===d.type(m.data))||"object"===e&&a.data&&"array"===d.type(a.data)){c._isJSON(a)&&(a=m);a.data&&(a=a.data);for(k=a.length;g<=k-1;g+=1)e=a[g],d.isPlainObject(e)?l.push(d("<option/>",e)):"string"===d.type(e)&&l.push(d("<option/>",{text:e,value:e}));c.selectBox.append(l)}else a&&"string"===e&&!c._isJSON(a)?c.selectBox.append(a):a&&"object"===e?c.selectBox.append(d("<option/>",
a)):a&&c._isJSON(a)&&d.isPlainObject(c._parseJSON(a))&&c.selectBox.append(d("<option/>",c._parseJSON(a)));c.dropdown?c.refresh(function(){c._callbackSupport(b)},!0):c._callbackSupport(b);return c})};e._parseJSON=function(a){return JSON&&JSON.parse&&JSON.parse(a)||d.parseJSON(a)};e._isJSON=function(a){try{return this._parseJSON(a),!0}catch(b){return!1}};e._populate=function(a,b){var c=this;a=d.isFunction(a)?a.call():a;c.isDeferred(a)?a.done(function(a){b.call(c,a)}):b.call(c,a);return c};e.remove=
function(a,b){var c=this,e=d.type(a),f=0,g,k="";if("array"===e){for(g=a.length;f<=g-1;f+=1)e=a[f],"number"===d.type(e)&&(k=k.length?k+(", option:eq("+e+")"):k+("option:eq("+e+")"));c.selectBox.find(k).remove()}else"number"===e?c.selectBox.find("option").eq(a).remove():c.selectBox.find("option").remove();c.dropdown?c.refresh(function(){c._callbackSupport(b)},!0):c._callbackSupport(b);return c}});