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

    var nwo = 0;

//页面缩小时调用
    window.onresize = function(){
        contentBind();
        cList.style.top = -nwo * (document.documentElement.clientHeight - head.offsetHeight) + "px";
    }



    //头部交互
    headBind();

    function headBind() {
        fistUpNode.style.width = "100%";
        // console.log(fistLiNode.offsetLeft);

        //修改定位
        arrowEl.style.left = fistLiNode.offsetLeft + fistLiNode.offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
        for (var i = 0; i < liNodes.length; i++) {
            // 转换绑定
            liNodes[i].index = i;
            liNodes[i].onclick = function () {
                //异步执行,此时i为liNodes.length,此时要操作的对象为upNode,this无法指向,所以要新增一个量来传递i的值,也可用闭包解决.
                move(this.index)

            }
        }

        function move(index) {
            for (var i = 0; i < upNodes.length; i++) {
                // upNodes[i].style.width = "0";
                upNodes[i].style.width = "";
            }
            nwo = index;
            upNodes[index].style.width = "100%";
            arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
            cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";
        }
    };



     //内容区交互
     contentBind();
    function contentBind(){
        content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
        // console.log(content.style.height);
        for (var i = 0; i < cLiNodes.length; i++) {
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
            
        }
    };
}