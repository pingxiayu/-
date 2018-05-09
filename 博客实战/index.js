addHander(window, 'DOMContentLoaded', function() {
    //刷新时滚动条复原
    window.onbeforeunload=function(){
        scrollTop();
    }
    //个人中心 下拉菜单
    var member = $('.member');
    member.hover(function() {
        member.css('background', 'url(images/arrow2.png) no-repeat 75px center').css('color', '#818181');
        $('.member_ul').css('height', '250px');
        //alert(this);//divElement
        //alert( $().getClass('member'));//obj
    }, function() {
        member.css('background', "url(images/arrow.png) no-repeat 75px center").css('color', 'black');;
        $('.member_ul').css('height', '0');
    });

    //登录框
    var login = $('#logins');
    //取消表单右键菜单
    /*login.conTextMune(function() {
        return false;
    });*/
    $('.login').click(function() {
        login.show();
    });
    $('.close').click(function() {
        login.hide();
    });
    $('.cancelbtn').click(function() {
        login.hide();
    });
    //注册框
    var register = $('#Register');
    $('.register').click(function() {
        register.show();
    });
    $('.r_close').click(function() {
        register.hide();
    });
    $('.r_cancelbtn').click(function() {
        register.hide();
    });
    //拖拽
    $('#log').Drag($('#imgCtn').getElement(0), $('#MyImg').getElement(0));
    $('#regs').Drag($('#hh H2').getElement(0));
    //分享栏位置居中
    //$('share').css('top',(getInner().height-parseInt(getStyle($('share'),'height')))/2);
    //分装库实现 分享栏随动
    /*addHander(window,'scroll',function(){
        $('share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('share'),'height')))/2);
    });*/
    //封装库实现队列动画 假设:类名 test top:0 width:100px height:100px; position:absolute;
    /*$('.test').hover(function(){
        $('.test').animate({
            attr:'w',
            target:200
            fn:funtion(){
                $('.test').animate({
                    attr:'h',
                    target:200
                });
            }
        });
    },function(){
        $('.test').animate({
            attr:'h',
            target:0
            fn:funtion(){
                $(.test).animate({
                    attr:'w',
                    target:0
                });
            }
        });
    });*/
    //封装库实现同步动画
    /*$('.tset').click(function(){
        $('.test').animate({
            t:30,
            step:10,
            mul:{
                width:300,
                height:300,
                0:30,
                fontSize:50
            }
        });
    });
    //分享栏 使用封装库
    /*$('#share').hover(function(){
        $(this).animate({
            attr:'x',
            target:0
        });
    },function(){
        $(this).animate({
            attr:'x',
            target:-211
        });
    });*/

    //分享栏 使用transition
    $('#share').hover(function(){
        $(this).css('left',0+'px');
    },function(){
        $(this).css('left',-212+'px');
    });
});
//假冒的loading 后面可以用ajax实现
addHander(window,'load',function(){
    setTimeout(function(){
        $('#max').css('display','block');
        $('.loader-ring').css('display','none');
        $('body').css('overflow','auto');
    }, 2000);
});