Shape.prototype.drawRectangle = function () {
    var self = this;
    Shape.prototype.draw.call(self);
    var anim = new Kinetic.Animation(function (frame) {
        var time = frame.time,
            timeDiff = frame.timeDiff,
            frameRate = frame.frameRate,
            thirdPoint,
            initX = self.initMousePosition.x | 0,
            initY = self.initMousePosition.y | 0,
            currentX = self.curMousePosition.x | 0,
            currentY = self.curMousePosition.y | 0;
        if (initX < currentX) {
            debugger;
            var difference = currentX - initX;
            thirdPoint = initX + (currentX - initX) / 2;
        }
        else {
            thirdPoint = currentX + (initX - currentX) / 2;
        }
        self.shape.setDrawFunc(function (context) {
            context.beginPath();
            context.moveTo(initX, initY);
            context.lineTo(initX, currentY);
            context.lineTo(currentX, currentY);
            context.lineTo(currentX, initY);
            context.lineTo(initX, initY);
            context.closePath();
            context.fillStrokeShape(this);
        });

        if (self.isMouseUp) {
            anim.stop();
        }
    }, self.layer);

    anim.start();
}
