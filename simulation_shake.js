var WINDOW_WIDTH = $(window).width(),
    WINDOW_HEIGHT = $(window).height(),

    REFERENCE_POINT = {                // 默认参照点
        x : WINDOW_WIDTH / 2,
        y : WINDOW_HEIGHT/ 2
    },

    distance_scale = {                // 移动比例
        x_distance_scale : 0,
        y_distence_scale : 0
    };

var layers = $('.js-plaxify');
var layer_offset = [];

layers.each(function(i, layer) {           // 保存默认的每张图片的偏移值
    var offset = {
        top : parseInt($(layer).css('top')),
        left : parseInt($(layer).css('left'))
    }
    layer_offset.push(offset);
});

function shake($plaxDom, index) {            // 每次鼠标移动，改变相应图片的偏移值
    var xrange = $plaxDom.data('xrange') || 0;
    var yrange = $plaxDom.data('yrange') || 0;
    var invert = $plaxDom.data('invert') || false;

    var offset_top_scale = invert ? -distance_scale.y_distence_scale : distance_scale.y_distence_scale;
    var offset_left_scale = invert ? -distance_scale.x_distance_scale : distance_scale.x_distance_scale;

    var top =  layer_offset[index].top + offset_top_scale * yrange;
    var left =  layer_offset[index].left + offset_left_scale * xrange;

    $plaxDom.css({
        'top' : top + 'px',
        'left' : left + 'px'
    });
}

function throttle(fn, delay) {
    var allowSample = true;

    return function(e) {
        if (allowSample) {
            allowSample = false;
            setTimeout(function() {
                allowSample = true;
            }, delay);
            fn(e);
        }
    };
}

document.addEventListener('mousemove', throttle(function(e) {
    distance_scale.x_distance_scale = (e.pageX - REFERENCE_POINT.x) / (WINDOW_WIDTH / 1.2);
    distance_scale.y_distence_scale = (e.pageY - REFERENCE_POINT.y) / (WINDOW_HEIGHT / 1.2);
    layers.each(function(index, layer) {
        shake($(layer), index);
    });
}), 100);
