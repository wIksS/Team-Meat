function Line(curStage,strokeColor,lineStrokeWidth) {
    this.draw = function (initMousePosition, layer,marginLeft,marginTop) {
        var isMouseUp = false,
        curMousePosition = new Point(initMousePosition.x, initMousePosition.y),
        initMousePosition = initMousePosition,
        shape = new Kinetic.Shape({
            stroke: strokeColor,
            strokeWidth: lineStrokeWidth,
        });

        layer.add(shape);
        curStage.add(layer);

        $('#canvas-container').on('mousemove', function (e) {
            curMousePosition = new Point((e.pageX | 0) - marginLeft | 0, e.pageY);
        });
        $('body').on('mouseup', function () {
            isMouseUp = true;
        })

        var anim = new Kinetic.Animation(function (frame) {
            var time = frame.time,
                timeDiff = frame.timeDiff,
                frameRate = frame.frameRate,
                initX = initMousePosition.x | 0,
                initY = initMousePosition.y | 0,
                currentX = curMousePosition.x | 0,
                currentY = curMousePosition.y | 0;
            shape.setDrawFunc(function (context) {
                context.beginPath();
                context.moveTo(initX, initY);
                context.lineTo(currentX, currentY);
                context.closePath();
                context.fillStrokeShape(this);
            });
            if (isMouseUp) {
                anim.stop();
            }
        }, layer);

        anim.start();
    }
}