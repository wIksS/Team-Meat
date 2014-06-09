function Line(curStage,strokeColor,lineStrokeWidth) {
    this.draw = function (initMousePosition, layer,marginLeft,marginTop) {
        var isMouseUp = false,
        curMousePosition = new Point(initMousePosition.x, initMousePosition.y),
        initMousePosition = initMousePosition,
        line = new Kinetic.Line({
            points: [],
            stroke: strokeColor,
            strokeWidth: lineStrokeWidth
        });

        layer.add(line);
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
            line.setPoints([initX, initY, currentX, currentControlY]);
            if (isMouseUp) {
                anim.stop();
            }
        }, layer);

        anim.start();
    }
}