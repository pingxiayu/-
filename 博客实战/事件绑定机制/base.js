//前台调用
var $ = function() {
    return new Base();
}
//封装库
function Base() {
    this.elements = [];
}

//获取id节点
Base.prototype.getId = function(id) {
    this.elements.push(document.getElementById(id));
    return this;
}
//获取元素节点类数组对象
Base.prototype.getTagName = function(tag) {
    var tags = document.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        this.elements.push(tags[i]);
    }
    return this;
};
//获取class节点类数组对象
Base.prototype.getClass = function(className, prefix, data, num) {
    var node = null;
    if (arguments.length > 2) { //限定区域修改内部节点仅为id和class
        if (prefix == '.') { //当为id选择器时
            node = document.getElementById(data);
        } else { //当为class选择器时
            node = document.getElementsByClassName(data)[num];
        }

    } else {
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            this.elements.push(all[i]);
        }
    }
    return this;
}
//获取某一个节点

Base.prototype.getElement = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//设置css
Base.prototype.css = function(attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) { //获取外部样式
            if (typeof window.getComputedStyle !== 'undefined') { //w3c
                return window.getComputedStyle(this.elements[i], null)[attr];
            } else if (typeof this.elements[i].currentStyle != 'undefined') { //ie
                return this.elements[i].currentStyle[attr];
            }
        }
        //内联或行内样式
        this.elements[i].style[attr] = value;
    }
    return this;
}
//添加class
Base.prototype.addClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) { //排除重复类选择器
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}
//删除class
Base.prototype.removeClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        }
    }
    return this;
}
//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position) { //num表示link的索引
    var sheet = document.styleSheets[num];
    if (typeof sheet.insertRule != 'undefined') {
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') {
        sheet.addRule(selectorText + cssText + position);
    }
    return this;
}
//移除link或style
Base.prototype.removeRule = function(num, index) {
    var sheet = document.styleSheets[num];
    if (typeof sheet.deleteRule != 'undefined') {
        sheet.deleteRule(index);
    } else if (sheet.removeRule != 'undefined') {
        sheet.removeRule(index);
    }
    return this;
}
//设置html
Base.prototype.html = function(str) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) { //获取文本值
            return this.elements[i].innerText;
        }
        this.elements[i].innerHTML = str; //设置文本值
    }
    return this;
}
//设置click事件
Base.prototype.click = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}
//设置oncontextmenu事件

Base.prototype.conTextMune = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].oncontextmenu = fn;
    }
    return this;
}
//设置鼠标移入移除事件
Base.prototype.hover = function(over, out) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//设置显示
Base.prototype.show = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}
//设置隐藏
Base.prototype.hide = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
    return this;
}
//拖拽功能

Base.prototype.drag = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onmousedown = function(e) {
            if (e.button == 0) {
                var _this = this;
                var diffX = e.clientX - _this.offsetLeft;
                var diffY = e.clientY - _this.offsetTop;

                document.onmousemove = function(e) {
                    _this.style.left = e.clientX - diffX + 'px';
                    _this.style.top = e.clientY - diffY + 'px';
                }
            }
            document.onmouseup = function() {
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }
    }
    return this;
}