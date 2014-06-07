function Line(curStage,strokeColor,lineStrokeWidth) {
    this.draw = function (initMousePosition) {
        var layer = new Kinetic.Layer(),
        isMouseUp = false,
        curMousePosition,
        line = new Kinetic.Line({
            points: [],
            stroke: strokeColor,
            strokeWidth: lineStrokeWidth
        });

        layer.add(line);
        curStage.add(layer);

        $('#canvas-container').on('mousemove', function (e) {
            curMousePosition = new Point(e.pageX, e.pageY);
        });
        $('body').on('mouseup', function () {
            isMouseUp = true;
        })

        var anim = new Kinetic.Animation(function (frame) {
            var time = frame.time,
                timeDiff = frame.timeDiff,
                frameRate = frame.frameRate;
            line.setPoints([initMousePosition.x, initMousePosition.y, curMousePosition.x, curMousePosition.y]);
            if (isMouseUp) {
                anim.stop();
            }
        }, layer);

        anim.start();
    }
}