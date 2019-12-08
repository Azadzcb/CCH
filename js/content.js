// ------------------------------------------------------------------------
// 获取元素
var home2LiNodes = document.querySelectorAll("#content>.list>.home .home2 >li");
var home1LiNodes = document.querySelectorAll("#content>.list>.home .home1 >li");
var home1 = document.querySelector("#content>.list>.home .home1");
var guanyuUls = document.querySelectorAll("#content>.list>.guanyu .guanyu3 >.item>ul");

var lianxi3 = document.querySelector("#content > .list >.lianxi .lianxi3")
var lianxi3Lis = document.querySelectorAll("#content >.list>.lianxi .lianxi3 ul>li");
var lianxi3Ul = document.querySelector("#content >.list>.lianxi .lianxi3 ul");

// ------------------------------------------------------------------------
// 第一屏3D效果
// home3D ();！！！变量提升
var oldIndex = 0; //上一次索引
var timer3D = 0; //定时
var autoIndex = 0;
// home3D();

function home3D() {
    for (let i = 0; i < home2LiNodes.length; i++) {
        home2LiNodes[i].index = i; //当前索引
        home2LiNodes[i].onclick = function () {
            clearInterval(timer3D); //清除定时器
            // 小圆点
            for (let i = 0; i < home2LiNodes.length; i++) {
                home2LiNodes[i].classList.remove("active");
            }
            this.classList.add("active");

            //  从左往右，当前索引大于上一次索引,rightShow
            if (this.index > oldIndex) {
                // 清除其他
                home1LiNodes[this.index].classList.remove("rightHide")
                home1LiNodes[this.index].classList.remove("leftShow")
                home1LiNodes[this.index].classList.remove("leftHide")

                home1LiNodes[this.index].classList.add("rightShow")


                home1LiNodes[oldIndex].classList.remove("rightHide")
                home1LiNodes[oldIndex].classList.remove("leftShow")
                home1LiNodes[oldIndex].classList.remove("rightShow")

                home1LiNodes[oldIndex].classList.add("leftHide")

            }


            // 从右往左，当前索引小于上一次索引,leftShow
            if (this.index < oldIndex) {
                // 清除其他
                home1LiNodes[this.index].classList.remove("rightHide")
                home1LiNodes[this.index].classList.remove("rightShow")
                home1LiNodes[this.index].classList.remove("leftHide")

                home1LiNodes[this.index].classList.add("leftShow")


                home1LiNodes[oldIndex].classList.remove("leftHide")
                home1LiNodes[oldIndex].classList.remove("leftShow")
                home1LiNodes[oldIndex].classList.remove("rightShow")

                home1LiNodes[oldIndex].classList.add("rightHide")
            }
            oldIndex = this.index;

            // 手动轮播与自动轮播同步
            // autoIndex = this.index;

            // 重新开始轮播
            // move();
        }



    }
    // 从左向右自动轮播
    move();

    function move() {
        clearInterval(timer3D);
        timer3D = setInterval(() => {
            autoIndex++;
            // 无缝轮播
            if (autoIndex == home1LiNodes.length) {
                autoIndex = 0;
            }
            // 小圆点同步
            for (var i = 0; i < home2LiNodes.length; i++) {
                home2LiNodes[i].classList.remove("active");

            }
            home2LiNodes[autoIndex].classList.add("active");

            home1LiNodes[autoIndex].classList.remove("rightHide")
            home1LiNodes[autoIndex].classList.remove("leftShow")
            home1LiNodes[autoIndex].classList.remove("leftHide")

            home1LiNodes[autoIndex].classList.add("rightShow")


            home1LiNodes[oldIndex].classList.remove("rightHide")
            home1LiNodes[oldIndex].classList.remove("leftShow")
            home1LiNodes[oldIndex].classList.remove("rightShow")

            home1LiNodes[oldIndex].classList.add("leftHide")


            //自动轮播与手动轮播同步 
            // 当触发手动轮播时，轮播起始位置应该为自动轮播停止时的位置，所以需要同步位置状态
            oldIndex = autoIndex;
        }, 2500);
    }
    // 鼠标移动到内容区时轮播停止
    home1.onmouseenter = () => {
        clearInterval(timer3D);
    }
    // 鼠标移出内容区后轮播继续
    home1.onmouseleave = () => {
        move();
    }
};
// ------------------------------------------------------------------------
// 第四屏效果/关于页面

picBoom();

function picBoom() {
    for (var i = 0; i < guanyuUls.length; i++) {
        change(guanyuUls[i]);
    }

    function change(Ul) {
        var src = Ul.dataset.src;
        var w = Ul.offsetWidth / 2;
        var h = Ul.offsetHeight / 2;
        for (var i = 0; i < 4; i++) {
            var liNode = document.createElement("li");
            liNode.style.width = w + "px";
            liNode.style.height = h + "px";
            var imgNode = document.createElement("img");
            // 1.left:0 top:0  2.left:-w top:0  3.left:0 top:-h  4.left:-w top:-h
            imgNode.style.left = -(i % 2) * w + "px";
            imgNode.style.top = -Math.floor(i / 2) * h + "px";

            imgNode.src = src;
            liNode.appendChild(imgNode);
            Ul.appendChild(liNode);
        }

        // var imgNodes = document.querySelectorAll("#content>.list>.guanyu .guanyu3 >.item>ul>li>img")
        // 鼠标移动事件
        Ul.onmouseenter = function () {
            // 1.left:0 top:h  2.left:-2w top:0  3.left:w top:-h  4.left:-w top:-2h
            var imgNodes = this.querySelectorAll("li>img")
            imgNodes[0].style.top = h + "px";
            imgNodes[1].style.left = -2 * w + "px";
            imgNodes[2].style.left = w + "px";
            imgNodes[3].style.top = -2 * h + "px";

        }
        Ul.onmouseleave = function () {
            var imgNodes = this.querySelectorAll("li>img")
            imgNodes[0].style.top = 0 + "px";
            imgNodes[1].style.left = -w + "px";
            imgNodes[2].style.left = 0 + "px";
            imgNodes[3].style.top = -h + "px";

        }

    }
};

// ------------------------------------------------------------------------
// 第五屏气泡效果
bubbling();

function bubbling() {
    var oc = null; //canvas
    var time1 = 0;
    var time2 = 0;

    for (var i = 0; i < lianxi3Lis.length; i++) {
        lianxi3Lis[i].onmouseenter = function () {
            for (var i = 0; i < lianxi3Lis.length; i++) {
                lianxi3Lis[i].style.opacity = .2;
            }
            this.style.opacity = 1;
            addCanvas();
            oc.style.left = this.offsetLeft + "px";
        }

    }
    // 添加Canvas
    function addCanvas() {
        if (!oc) {
            oc = document.createElement("canvas");
            oc.width = lianxi3Lis[0].offsetWidth;
            oc.height = lianxi3Lis[0].offsetHeight * 2 / 3;

            lianxi3.onmouseleave = function () {
                for (var i = 0; i < lianxi3Lis.length; i++) {
                    lianxi3Lis[i].style.opacity = 1;
                }
                removeCanvas();
            }

            lianxi3.appendChild(oc);
            QiPao();
        }
    };
    // 气泡函数
    function QiPao() {
        if (oc.getContext) {
            var ctx = oc.getContext("2d");
            var arr = [];
            //将数组中的圆绘制到画布上
            time1 = setInterval(() => {
                ctx.clearRect(0, 0, oc.width, oc.height);
                // 动画
                for (var i = 0; i < arr.length; i++) {
                    arr[i].deg += 10;
                    arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step * 2;
                    arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step;

                    if (arr[i].y <= 50) {
                        arr.splice(i, 1)
                    }
                }
                // 绘制
                for (var i = 0; i < arr.length; i++) {
                    ctx.save();
                    ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ")";
                    ctx.beginPath();
                    ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.restore();
                }
            }, 1000 / 60);
            //往arr中注入随机圆的信息
            time2 = setInterval(() => {
                var r = Math.random() * 6 + 2;
                var x = Math.random() * oc.width;
                var y = oc.height - r;
                var red = Math.round(Math.random() * 255);
                var green = Math.round(Math.random() * 255);
                var blue = Math.round(Math.random() * 255);
                var alp = 1;

                var deg = 0;
                var startX = x;
                var startY = y;
                //曲线的运动形式
                var step = Math.random() * 20 + 10;
                arr.push({
                    x: x,
                    y: y,
                    r: r,
                    red: red,
                    green: green,
                    blue: blue,
                    alp: alp,
                    deg: deg,
                    startX: startX,
                    startY: startY,
                    step: step
                })
            }, 50);
        }
    };
    // 清除Canvas
    function removeCanvas() {
        oc.remove();
        oc = null;
        clearInterval(time1);
        clearInterval(time2);
    }
};