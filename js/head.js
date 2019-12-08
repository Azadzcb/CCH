// window.onload = function () {
//     //获取dom元素
//     var arrowEl = document.querySelector("#head .head-main>.arrow");
//     var liNodes = document.querySelectorAll("#head .head-main>.nav>.list>li");
//     var upNodes = document.querySelectorAll("#head .head-main>.nav>.list>li .up")
//     var fistLiNode = liNodes[0];
//     var fistUpNode = fistLiNode.querySelector(".up")





//     fistUpNode.style.width = "100%";
//     // console.log(fistLiNode.offsetLeft);

//     //修改定位
//     arrowEl.style.left = fistLiNode.offsetLeft + fistLiNode.offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";


//     for (var i = 0; i < liNodes.length; i++) {
//         // 转换绑定
//         liNodes[i].index = i;
//         liNodes[i].onclick = function () {
//             //异步执行,此时i为liNodes.length,此时要操作的对象为upNode,this无法指向,所以要新增一个量来传递i的值,也可用闭包解决.
//             for (var i = 0; i < upNodes.length; i++) {
//                 // upNodes[i].style.width = "0";
//                 upNodes[i].style.width = "";
//             }
//             upNodes[this.index].style.width = "100%";
//             arrowEl.style.left = liNodes[this.index].offsetLeft + liNodes[this.index].offsetWidth / 2 - arrowEl.offsetWidth / 2 + "px";
//         }

//     }
// }