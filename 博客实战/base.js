//前台调用
var $ = function(args) {
    return new Base(args);
}
//封装库
function Base(args) {
    //创建一个数组，来保存获取的节点和节点数组
    this.elements = [];

    if (typeof args == 'string') {
        //css模拟
        if (args.indexOf(' ') != -1) {
            var elements = args.split(' '); //把节点拆开分别保存到数组里
            var childElements = []; //存放临时节点对象的数组，解决被覆盖的问题
            var node = []; //用来存放父节点用的
            for (var i = 0; i < elements.length; i++) {
                if (node.length == 0) node.push(document); //如果默认没有父节点，就把document放入
                switch (elements[i].charAt(0)) {
                    case '#':
                        childElements = []; //清理掉临时节点，以便父节点失效，子节点有效
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements; //保存父节点，因为childElements要清理，所以需要创建node数组
                        break;
                    case '.':
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getClass(elements[i].substring(1), node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default:
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getTagName(elements[i], node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        } else {
            //find模拟
            switch (args.charAt(0)) {
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }
    } else if (typeof args == 'object') {
        if (args != undefined) { //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
            this.elements[0] = args;
        }
    }
}

//获取id节点
Base.prototype.getId = function(id) {
    return document.getElementById(id);
}
//获取元素节点类数组对象
Base.prototype.getTagName = function(tag, parentNode) {
    var temps = [];
    var node = null;
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i]);
    }
    return temps;
};
//获取class节点类数组对象
Base.prototype.getClass = function(className, parentNode) {
    var temps = [];
    var node = null;
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            temps.push(all[i]);
        }
    }

    return temps;
}
//设置某一节点下的子节点
Base.prototype.find = function(str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case '#':
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps = this.getClass(str.substring(1), this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
                break;
            default:
                var temps = this.getTagName(str, this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}
//获取某一个节点 并且返回base对象

Base.prototype.eq = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//返回某一个节点，并且返回这个节点对象；
Base.prototype.getElement = function(num) {
    return this.elements[num];
}

//设置css
Base.prototype.css = function(attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) { //获取外部样式
            return getStyle(this.elements[i], attr);
        }
        //内联或行内样式
        this.elements[i].style[attr] = value;
    }
    return this;
}

//添加class
Base.prototype.addClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!hasClass(this.elements[i], className)) { //排除重复类选择器
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}
//删除class
Base.prototype.removeClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (hasClass(this.elements[i], className)) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        }
    }
    return this;
}
//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position) { //num表示link的索引
    var sheet = document.styleSheets[num];
    insertRule(sheet, selectorText, cssText, position);
    return this;
}
//移除link或style
Base.prototype.removeRule = function(num, index) {
    var sheet = document.styleSheets[num];
    deleteRule(sheet, index);
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
        addHander(this.elements[i], 'mouseover', over);
        addHander(this.elements[i], 'mouseout', out);
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

Base.prototype.Drag = function() {
    var tags = arguments;
    for (var i = 0; i < this.elements.length; i++) {
        addHander(this.elements[i], 'mousedown', function(e) {
            if (e.button == 0) {
                var _this = this;
                var diffX = e.clientX - _this.offsetLeft;
                var diffY = e.clientY - _this.offsetTop;
                var flag = false;
                for (var i = 0; i < tags.length; i++) {
                    if (e.target == tags[i]) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    addHander(document, 'mousemove', move);
                    addHander(document, 'mouseup', up);
                }

                function move(e) {
                    _this.style.left = e.clientX - diffX + 'px';
                    _this.style.top = e.clientY - diffY + 'px';
                }

                function up() {
                    removeHander(document, 'mousemove', move)
                    this.onmouseup = null;
                }
            }
        });


    }
    return this;
}

//动画效果
Base.prototype.animate = function(obj) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
            obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
            obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';


        var start = obj['start'] != undefined ? obj['start'] :
            attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 :
            parseInt(getStyle(element, attr));

        var t = obj['t'] != undefined ? obj['t'] : 10; //可选，默认10毫秒执行一次
        var step = obj['step'] != undefined ? obj['step'] : 20; //可选，每次运行10像素

        var alter = obj['alter'];
        var target = obj['target'];
        var mul = obj['mul'];

        var speed = obj['speed'] != undefined ? obj['speed'] : 6; //可选，默认缓冲速度为6
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer'; //可选，0表示匀速，1表示缓冲，默认缓冲


        if (alter != undefined && target == undefined) {
            target = alter + start;
        } else if (alter == undefined && target == undefined && mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
        }



        if (start > target) step = -step;

        if (attr == 'opacity') {
            element.style.opacity = parseInt(start) / 100;
        } else {
            element.style[attr] = start + 'px';
        }

        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }
        clearInterval(element.timer);
        element.timer = setInterval(function() {
            var flag = true; //表示所有动画都执行完毕了
            for (var i in mul) {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];

                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
                        (target - parseInt(getStyle(element, attr))) / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }



                if (attr == 'opacity') {
                    if (step == 0) {
                        setOpacity();
                    } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
                        setOpacity();
                    } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
                        setOpacity();
                    } else {
                        var temp = parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = parseInt(temp + step) / 100;
                    }
                    if(target!=parseInt(parseFloat(getStyle(element,attr)))*100){
                        flag=true;
                    }

                } else {
                    if (step == 0) {
                        setTarget();
                    } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                        setTarget();
                    } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    if (target != parseInt(getStyle(element, attr))) {
                        flag = false;
                    }
                }
                //document.getElementById('aaa').innerHTML += step + '<br />';
            }
            if (flag) {
                clearInterval(element.timer);
                if (boj.fn) { //列队动画调用函数
                    obj.fn();
                }
            }
        }, t);

        function setTarget() {
            element.style[attr] = target + 'px';
        }

        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
        }

    }
    return this;
};