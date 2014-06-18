LineDrawer.prototype.drawWebPencil = function () {
    var self = this,
        points = [];
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
            context.lineJoin = context.lineCap = 'round';
            points.push({ x: currentX, y: currentY });
            context.beginPath();
            context.moveTo(initX, initY);

            for (var i = 0, len = points.length; i < len; i++) {
                context.lineTo(points[i].x, points[i].y);
                var nearPoint = points[i - 5];
                if (nearPoint) {
                    context.moveTo(nearPoint.x, nearPoint.y);
                    context.lineTo(points[i].x, points[i].y);
                }
            }
            context.fillStrokeShape(this);
        });
        if (self.isMouseUp) {
            anim.stop();
        }

    }, self.layer)

    anim.start();
}