function RightTriangle(curStage, strokeColor, fillColor, lineStrokeWidth) {
    this.draw = function (initMousePosition) {
        var layer = new Kinetic.Layer(),
        isMouseUp = false,
        curMousePosition = new Point(initMousePosition.x, initMousePosition.y),
        initMousePosition = initMousePosition,
        line = new Kinetic.Shape({
            stroke: strokeColor,
            strokeWidth: lineStrokeWidth,
            fill: fillColor,
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
            line.setDrawFunc(function (context) {
                context.beginPath();
                context.moveTo(initX, initY);
                context.lineTo(initX,currentY);
                context.lineTo(currentX, currentY);
                context.lineTo(initX,initY);
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