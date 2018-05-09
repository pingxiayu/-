//跨浏览器事件绑定
function addHander(element, type, hander) {
    if (element.addEventListener) {
        element.addEventListener(type, hander, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn); //ie中this指向window 通过对象冒充解决
    } else {
        element['on' + type] = hander;
    }
}
//跨浏览器移除事件
function removeHander(element, type, hander) {
    if (element.removeEventListener) {
        element.removeEventListener(type, hander, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, hander);
    } else {
        element['on' + type] = null;
    }
}
//跨浏览器获取Event对象
function getEvent(event) {
    return event ? event : window.event;
}
//跨浏览器获取Target对象
function getTarget(event) {
    return event.target ? event.target : event.srcElement;
}
//跨浏览器移除默认事件
function preDefault(event) {
    var e = event || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
//跨浏览器的字符编码
function getCharCode(event) {
    var e = event || window.event;
    if (typeof e.charCode == 'number') {
        return e.charCode;
    } else {
        return e.keyCode;
    }
}
//跨浏览器获取视口大小
function getInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}
//跨浏览器获取Style
/*function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {//W3C
        value = window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undeinfed') {//IE
        value = element.currentStyle[attr];
    }
    return value;
}*/
function getStyle(element, attr) {
  
    if (typeof window.getComputedStyle != 'undefined') {//W3C
       return window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undeinfed') {//IE
       return element.currentStyle[attr];
    }
}
//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
    if (typeof sheet.insertRule != 'undefined') { //W3C
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') { //IE
        sheet.addRule(selectorText, cssText, position);
    }
}
//跨浏览器移出link规则
function deleteRule(sheet, index) {
    if (typeof sheet.deleteRule != 'undefined') { //W3C
        sheet.deleteRule(index);
    } else if (typeof sheet.removeRule != 'undefined') { //IE
        sheet.removeRule(index);
    }
}
//判断class是否存在
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
addHander.fixEvent = function (event) {
    event.target = event.srcElement;
    return event;
}
function scroll() {
        if (window.pageYOffset != null){
//            支持IE9 +
            return{
                left:window.pageXOffset,
                top:window.pageYOffset
            }
        }else if (document.compatMode == 'CSS1Compat'){
//            声明了DTD

            return{
                left:document.documentElement.scrollLeft,
                top:document.documentElement.scrollTop
            }
        }

        return{
            left:document.body.scrollLeft,
            top:document.body.scrollTop
        }
}
//滚动条清零
function scrollTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
//跨浏览获取滚动条位置
function getScroll(){
    return{
        top:docuemnt.documentElement.scrollTop||document.body.scrollTop,
        left:docuemnt.documentElement.scrollLeft||document.body.scrollLeft
    }
}