window.onload = function () {
    //获取dom元素
    var arrowEl = document.querySelector("#head .head-main>.arrow");
    var liNodes = document.querySelectorAll("#head .head-main>.nav>.list>li");
    var upNodes = document.querySelectorAll("#head .head-main>.nav>.list>li .up")
    var fistLiNode = liNodes[0];
    var fistUpNode = fistLiNode.querySelector(".up")

    var head = document.querySelector("#head");
    var content = document.querySelector("#content");
    var cLiNodes = document.querySelectorAll("#content .list>li");
    var cList = document.querySelector("#content .list");

    // now同步当前屏的索引
    var now = 0;
    var timer = 0;

//页面缩小时调用
    window.onresize = function(){
        // 调整分辨率时,视口只能出现一屏,每一屏的偏移量需要重新调整
        // contentBind()重新计算内容区大小
        contentBind();
        // 重新调整偏移量
        cList.style.top = -now * (document.documentElement.clientHeight - head.offsetHeight) + "px";
        // 重新调整小箭头偏移量,为导航内容到左边界距离加上导航内容宽度的一半减去小箭头宽度的一半
        arrowEl.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
    }



    //头部交互
    headBind();
    // 内容区交互
    contentBind();



    function headBind() {
        fistUpNode.style.width = "100%";
        // console.log(fistLiNode.offsetLeft);

        //修改定位
        // 小箭头偏移
        arrowEl.style.left = fistLiNode.offsetLeft + fistLiNode.offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
        for (var i = 0; i < liNodes.length; i++) {
            // 转换绑定
            liNodes[i].index = i;
            liNodes[i].onclick = function () {
                //异步执行,此时i为liNodes.length,此时要操作的对象为upNode,this无法指向,所以要新增一个量来传递i的值,也可用闭包解决.
                move(this.index)

            }
        }

        // function move(index) {
        //     for (var i = 0; i < upNodes.length; i++) {
        //         // upNodes[i].style.width = "0";
        //         upNodes[i].style.width = "";
        //     }
        //     now = index;
        //     upNodes[index].style.width = "100%";
        //     // 下标小箭头移动,
        //     arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
        //     // 页面移动(页面高度距离顶部的位置),例如一页20px,距离顶部0,第二页距离顶部-20px,以此类推
        //     cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";
        // }
    };
    // 动画的核心函数
    move(1);
    function move(index) {
        for (var i = 0; i < upNodes.length; i++) {
            // upNodes[i].style.width = "0";
            upNodes[i].style.width = "";
        }
        now = index;
        upNodes[index].style.width = "100%";
        // 下标小箭头移动,
        arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
        // 页面移动(页面高度距离顶部的位置),例如一页20px,距离顶部0,第二页距离顶部-20px,以此类推
        cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";
    };





     //内容区交互
    function contentBind(){
        // 内容区大小为视窗大小减去head高度
        content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
        // console.log(content.style.height);
        for (var i = 0; i < cLiNodes.length; i++) {
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
            
        }
    };

    // 滚轮事件
    //鼠标滚动过程中页面不能切换,结束滚动后,页面再切换,且页面只能切换一次
    if(content.addEventListener) {
        // content.addEventListener("DOMMouseScroll", fn);原代码,鼠标滚动不停页面切换不停
        content.addEventListener("DOMMouseScroll",function(ev){
            ev = ev || event;
            clearTimeout(timer);
            // 事件延时触发
            timer = setTimeout(function(){
                fn(ev)
            },100)
        });
    }
    // content.onmousewheel = fn;原
    content.onmousewheel = function(ev){
        ev = ev || event;

        clearTimeout(timer);
        timer = setTimeout(function(){
            fn(ev)
        },100)
    };
    
    function fn(ev) {
        ev = ev || event;
        
        // 判断滚轮上滑还是下滑
        var dir = "";
        // 兼容性,(IE、Opera、Safari、Firefox、Chrome)中Firefox 使用detail,其余四类使用wheelDelta,火狐小于零为上.
        if (ev.wheelDelta) {
            dir = ev.wheelDelta>0?"up":"down";
        }else if (ev.detail) {
            dir = ev.wheelDelta<0?"up":"down";
        }
        switch (dir) {
            case "up":
                // 往上滑动,当前屏减1,例如当前第二屏,上滑一屏就为第一屏
                // now大于0时才能滑动
                if (now>0) {
                    now--;
                move(now);
                }
                break;
            case "down":
                if (now<cLiNodes.length-1) {
                    now++;
                    move(now);
                }
            default:
                break;
        }
    }
}