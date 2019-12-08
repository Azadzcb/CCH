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
    var dotLis = document.querySelectorAll("#content .dot >li");

    // now同步当前屏的索引
    var now = 0;
    var timer = 0;

    // 上一屏
    var preIndex = 0;
    // 开机动画
    var mask = document.querySelector("#mask");
    var line = document.querySelector("#mask .line");
    var surface = document.querySelectorAll("#mask div");

// 音频
    var music = document.querySelector("#head .head-main>.music");
    var audio = document.querySelector("#head .head-main>.music audio");
    music.onclick = function(){
        if (audio.paused) {
            audio.play();
            music.style.background = "url(/images/musicon.gif)"
        }else{
            audio.pause();
            music.style.background = "url(/images/musicoff.gif)"
        }
    };
// 开机动画
    loadingAn();
    function loadingAn(){
        // 模拟请求实现进度条
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
        var flag = 0;
        for (let i = 0; i < arr.length; i++) {
            var img = new Image();
            img.src = "images/"+arr[i];
            img.onload = function(){
                flag++;
                line.style.width = flag/arr.length*100+"%";
                
            }
        }
        line.addEventListener("transitionend", function(){
            if (flag === arr.length) {
                    for (let i = 0; i < surface.length; i++) {
                        surface[i].style.height = 0+"px"
                    }
                    line.style.display = "none";
                }
        });
        // 动画结束后清除开机动画元素
        surface[0].addEventListener("transitionend",function(){
            mask.remove();
            // 打开音频
            audio.play();
            // 开始首页轮播图
            home3D();
        })
    };
// 出入场动画
    var anArr = [
        // 五个对象
        {
            // 第一屏
            // 入场
            inAn : function(){
                var home1 = document.querySelector("#content>.list>.home .home1");
                var home2 = document.querySelector("#content>.list>.home .home2");
                // 轮播图
                home1.style.transform = "translateY(0px)";
                // 小圆点
                home2.style.transform = "translateY(0px)";
                home1.style.opacity = 1;
                home2.style.opacity = 1;
            },
            // 出场
            outAn : function(){
                var home1 = document.querySelector("#content>.list>.home .home1");
                var home2 = document.querySelector("#content>.list>.home .home2");
                // 轮播图从上向下出现
                home1.style.transform = "translateY(-400px)";
                // 小圆点从下往上出现
                home2.style.transform = "translateY(100px)";
                home1.style.opacity = 0;
                home2.style.opacity = 0;
            }
            
        },
        {
            // 第二屏
            inAn : function(){
                var plane1 = document.querySelector("#content .jianjie .plane1");
                var plane2 = document.querySelector("#content .jianjie .plane2");
                var plane3 = document.querySelector("#content .jianjie .plane3");

                plane1.style.transform = "translate(0px, 0px)";
                plane2.style.transform = "translate(0px, 0px)";
                plane3.style.transform = "translate(0px, 0px)";
            },
        
            outAn : function(){
                var plane1 = document.querySelector("#content .jianjie .plane1");
                var plane2 = document.querySelector("#content .jianjie .plane2");
                var plane3 = document.querySelector("#content .jianjie .plane3");

                plane1.style.transform = "translate(-200px, -200px)";
                plane2.style.transform = "translate(-200px, 200px)";
                plane3.style.transform = "translate(200px, -200px)";
            }
        },
        {
            // 第三屏
            inAn : function(){
                var pencel1 = document.querySelector("#content>.list .pencel1")
                var pencel2 = document.querySelector("#content>.list .pencel2")
                var pencel3 = document.querySelector("#content>.list .pencel3")

                pencel1.style.transform = "translateY(0px)";
                pencel2.style.transform = "translateY(0px)";
                pencel3.style.transform = "translateY(0px)";
            },
            outAn : function(){
                var pencel1 = document.querySelector("#content>.list .pencel1")
                var pencel2 = document.querySelector("#content>.list .pencel2")
                var pencel3 = document.querySelector("#content>.list .pencel3")

                pencel1.style.transform = "translateY(-100px)";
                pencel2.style.transform = "translateY(100px)";
                pencel3.style.transform = "translateY(100px)";
            }
        },
        {
            // 第四屏
            inAn : function(){
                var rect1 = document.querySelector("#content>.list>.guanyu .guanyu3>.item:nth-child(1)")
                var rect2 = document.querySelector("#content>.list>.guanyu .guanyu3>.item:nth-child(2)")

                rect1.style.transform = "rotate(0deg)";
                rect2.style.transform = "rotate(0deg)";
            },
            outAn : function(){
                var rect1 = document.querySelector("#content>.list>.guanyu .guanyu3>.item:nth-child(1)")
                var rect2 = document.querySelector("#content>.list>.guanyu .guanyu3>.item:nth-child(2)")

                rect1.style.transform = "rotate(45deg)";
                rect2.style.transform = "rotate(-45deg)";
            }
        },
        {
            // 第五屏
            inAn : function(){
                var title1 = document.querySelector("#content>.list>.lianxi .lianxi1")
                var title2 = document.querySelector("#content>.list>.lianxi .lianxi2")

                title1.style.transform = "translateX(0px)"
                title2.style.transform = "translateX(0px)"
            },
            outAn : function(){
                var title1 = document.querySelector("#content>.list>.lianxi .lianxi1")
                var title2 = document.querySelector("#content>.list>.lianxi .lianxi2")

                title1.style.transform = "translateX(-200px)"
                title2.style.transform = "translateX(200px)"
            }
        },

    ]
    // 调用
    for (let i = 0; i < anArr.length; i++) {
        anArr[i]["outAn"]();
        
    }
    setTimeout(function(){
        anArr[0].inAn()
    },1000)
    // 测试
    // anArr[4].outAn();
    // setTimeout(function(){
    //     anArr[4].inAn();
    // },3000)




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
                //异步执行,此时i为liNodes.length,此时要操作的对象为upNode,this无法指向,所以要新增一个量来传递i的值,也可用闭包和let解决.

                // 上一屏
                preIndex = now;

                move(this.index);
                now = this.index;

            }
        }
        // 侧边小圆点
        for (var i = 0; i < dotLis.length; i++) {
            // 转换绑定
            dotLis[i].index = i;
            dotLis[i].onclick = function () {
                //异步执行,此时i为liNodes.length,此时要操作的对象为upNode,this无法指向,所以要新增一个量来传递i的值,也可用闭包解决.

                // 上一屏
                preIndex = now;

                move(this.index);
                now = this.index;

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
    // 页面滑动的核心函数
    // move(4);
    function move(index) {
        for (var i = 0; i < upNodes.length; i++) {
            // upNodes[i].style.width = "0";
            upNodes[i].style.width = "";
        }
        upNodes[index].style.width = "100%";
        // 下标小箭头移动,
        arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
        // 页面移动(页面高度距离顶部的位置),例如一页20px,距离顶部0,第二页距离顶部-20px,以此类推
        cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";

        // 侧边小圆点切换
        for (var i = 0; i < dotLis.length; i++) {
            // upNodes[i].style.width = "0";
            dotLis[i].className = "";
        }
        dotLis[index].className = "active";

        // 出入场
        if (anArr[index]&&typeof anArr[index]["inAn"] === "function") {
            anArr[index]["inAn"]();
        }
        if (anArr[preIndex]&&typeof anArr[preIndex]["outAn"] === "function") {
            anArr[preIndex]["outAn"]();
        }

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
        // 上一屏
        preIndex = now;
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