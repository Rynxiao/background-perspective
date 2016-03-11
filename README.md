# 背景透视滚动

* 案例

github 404页面： <https://github.com/404>

轩枫阁 404案例： <http://xuanfengge.com/demo/201406/404/>


* 解析

1. 图片绝对定位，设置z-index造成透视关系

2. 监听鼠标事件，根据方向改变每张图片的top以及left值，造成移动效果

注：github以及轩枫阁 第2步采用的都是jquery插件shake.js
