LineDrawer.prototype.drawLine = function () {
    var self = this;
    LineDrawer.prototype.draw.call(self);
    var anim = new Kinetic.Animation(function (frame) {
        var time = frame.time,
            timeDiff = frame.timeDiff,
            frameRate = frame.frameRate,
            initX = self.initMousePosition.x | 0,
            initY = self.initMousePosition.y | 0,
            currentX = self.curMousePosition.x | 0,
            currentY = self.curMousePosition.y | 0;

        self.shape.setDrawFunc(function (context) {
            context.beginPath();
            context.moveTo(initX, initY);
            context.lineTo(currentX, currentY);
            context.closePath();
            context.fillStrokeShape(this);
        });
        if (self.isMouseUp) {
            anim.stop();
        }
    }, self.layer);

    anim.start();
}
