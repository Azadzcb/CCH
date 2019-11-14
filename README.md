# CCH
### 分辨率1200~2000
+ 流体布局&固定布局

+ 格式化样式
    - 去除滚动条html,body {height: 100%; overflow: hidden;}
    ```
        html,body {height: 100%; overflow: hidden;}
        html,body,h1,h2,h3,h4,h5,h6,p,ul,li {
            margin: 0;
            padding: 0;
            font: 14px "微软雅黑";
        }
        a {
            text-decoration: none;
            display: block;
        }
        li {
            list-style: none;
        }
    ```
    - 清除浮动样式
    ```
         .clearfix {*zoom: 1;}
        .clearfix:after {content: ""; display: block; clear: both;}
    ```
+ 顶宽的div中的中文会自动换行,英文不能自动换行
    - 原因：英文字母之间没有空格的话，它会默认认为这是一个英文单词，所以单词就一次输出不换行
```
    /*禁止文字自动换行*/
    white-space: nowrap

    /*达到宽度自动换行,截断单词,对FF无效*/
    word-break:break-all

    /*a行末端宽度不够显示整个单词，它会自动把整个单词放到下一行b行 ，而不会在a行把单词截断。若b行整行都不够一个单词宽，则将单词截断以对齐,对FF、IE有效*/
    word-wrap:break-word
```

+ 循环清除宽度样式最好重置为空，指定为0会有问题
```
    for (var i = 0; i < upNodes.length; i++) {
                    // upNodes[i].style.width = "0";
                    upNodes[i].style.width = "";
                }
```
+ 事件频繁触发时只执行一次（连续触发时间在100毫秒之内无效）
```
    clearTimeout(timer);
        timer = setTimeout(function(){
            fn(ev)
        },100)
```
+ 内容区要动态控制
+ 背景偏移百分比：背景区域尺寸减去背景图尺寸
+ 变量i 与元素.index属性的同步（异步执行）
+ 变量作用域问题
+ 两个面贴在一块，文字在上背景在下，初始化时，为了先展示背景，可以将文字翻转180度并且隐藏，翻转时将有文字的那边翻转360度（0度方向不对），背景那面相同反向转180度
    - 背景隐藏
    ```
        backface-visibility: hidden
    ```
