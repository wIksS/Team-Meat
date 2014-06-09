function Circle(curStage, strokeColor, fillColor, lineStrokeWidth) {
    this.draw = function (initMousePosition, layer, marginLeft, marginTop) {
        var isMouseUp = false,
           curMousePosition = new Point(initMousePosition.x, initMousePosition.y),
           initMousePosition = initMousePosition,
           shape = new Kinetic.Shape({
               stroke: strokeColor,
               strokeWidth: lineStrokeWidth,
               fill: fillColor,
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
                xDifference,
                initX = initMousePosition.x | 0,
                initY = initMousePosition.y | 0,
                currentX = curMousePosition.x | 0,
                currentY = curMousePosition.y | 0,
                yDifference;
            if (initX < currentX) {
                xDifference = currentX - initX;
            }
            else {
                xDifference = initX - currentX;
            }
            if (initY < currentY) {
                yDifference = currentY - initY;
            }
            else {
                yDifference = initY - currentY;
            }

            var w = xDifference;
            var h = yDifference;
            var x = initX;
            var y = initY;
            var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2,       // y-middle
            middleXMinusControlX = xm - ox,
            middleYMinusControlY = ym - oy,
            middleXPlusControlX = xm + ox,
            middleYPlusControlY = ym + oy;

            if (initX > currentX) {
                xm = x - w / 2;
                xe = x - w;
                middleXMinusControlX = xm + ox;
                middleXPlusControlX = xm - ox;
            }
            if (initY > currentY) {
                ym = y - h / 2;
                ye = y - h;
                middleYMinusControlY = ym + oy;
                middleYPlusControlY = ym - oy;
            }
            shape.setDrawFunc(function (context) {
                context.beginPath();
                context.moveTo(x, ym);
                context.bezierCurveTo(x, middleYMinusControlY, middleXMinusControlX, y, xm, y);
                context.bezierCurveTo(middleXPlusControlX, y, xe, middleYMinusControlY, xe, ym);
                context.bezierCurveTo(xe, middleYPlusControlY, middleXPlusControlX, ye, xm, ye);
                context.bezierCurveTo(middleXMinusControlX, ye, x, middleYPlusControlY, x, ym);
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
