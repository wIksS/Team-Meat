function Triangle(curStage, strokeColor, lineStrokeWidth) {
    this.draw = function (initMousePosition) {
        var layer = new Kinetic.Layer(),
        isMouseUp = false,
        curMousePosition = new Point(initMousePosition.x, initMousePosition.y),
        initMousePosition = initMousePosition,
        line = new Kinetic.Line({
            points: [],
            stroke: strokeColor,
            strokeWidth: lineStrokeWidth,
            fill: 'red',
            drawBorder: true
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
                frameRate = frame.frameRate,
                thirdPoint,
                initX = initMousePosition.x | 0,
                initY = initMousePosition.y | 0,
                currentX = curMousePosition.x | 0,
                currentY = curMousePosition.y | 0;
            if (initX < currentX) {
                debugger;
                var difference = currentX - initX;
                thirdPoint = initX + (currentX - initX) / 2;
            }
            else {
                thirdPoint = currentX + (initX - currentX) / 2;
            }

            line.setPoints([initX, currentY, currentX, currentY, thirdPoint, initY, initX, currentY]);
            if (isMouseUp) {
                anim.stop();
            }
        }, layer);

        anim.start();
    }
}