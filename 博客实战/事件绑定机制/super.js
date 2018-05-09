var EventUtil = {
    //跨浏览器事件绑定
    addHander: function(element, type, hander) {
        if (element.addEventListener) {
            element.addEventListener(type, hander, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, fn);//ie中this指向window 通过对象冒充解决
        } else {
            element['on' + type] = hander;
        }
    },
    //跨浏览器移除事件
    removeHander: function(element, type, hander) {
        if (element.removeEventListener) {
            element.removeEventListener(type, hander, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, hander);
        } else {
            element['on' + type] = null;
        }
    },
    //跨浏览器获取Event对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //跨浏览器获取Target对象
    getTarget: function(event) {
        return event.target ? event.target : event.srcElement;
    },
    //跨浏览器移除默认事件
    preDefault: function(event) {
        var e = event || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    //跨浏览器的字符编码
    getCharCode: function(event) {
        var e = event || window.event;
        if (typeof e.charCode == 'number') {
            return e.charCode;
        } else {
            return e.keyCode;
        }
    },
    //跨浏览器获取视口大小
    getInner: function() {
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
    },
    //跨浏览器获取Style
    getStyle: function(element, attr) {
        if (typeof window.getComputedStyle != 'undefined') { //W3C
            return window.getComputedStyle(element, null)[attr];
        } else if (typeof element.currentStyle != 'undeinfed') { //IE
            return element.currentStyle[attr];
        }
    },
    //跨浏览器添加link规则
    insertRule: function(sheet, selectorText, cssText, position) {
        if (typeof sheet.insertRule != 'undefined') { //W3C
            sheet.insertRule(selectorText + '{' + cssText + '}', position);
        } else if (typeof sheet.addRule != 'undefined') { //IE
            sheet.addRule(selectorText, cssText, position);
        }
    },
    //跨浏览器移出link规则
    deleteRule:function(sheet, index) {
        if (typeof sheet.deleteRule != 'undefined') { //W3C
            sheet.deleteRule(index);
        } else if (typeof sheet.removeRule != 'undefined') { //IE
            sheet.removeRule(index);
        }
    }
}