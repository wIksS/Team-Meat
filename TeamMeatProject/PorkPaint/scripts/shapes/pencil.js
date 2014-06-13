//Creates shapes by drawing a line that follows mouse path while mouse is clicked
Shape.prototype.drawPencil = function () {
    var self = this,
        points = [];
    Shape.prototype.draw.call(self);  
    var anim = new Kinetic.Animation(function (frame) {
        var time = frame.time,
            timeDiff = frame.timeDiff,
            frameRate = frame.frameRate,
            initX = self.initMousePosition.x | 0,
            initY = self.initMousePosition.y | 0,
            currentX = self.curMousePosition.x | 0,
            currentY = self.curMousePosition.y | 0;
          
        self.shape.setDrawFunc(function (context) {
            points.push({ x: currentX, y: currentY });            
            context.beginPath();
            context.moveTo(initX, initY);
            for (var i = 0, len = points.length; i < len; i++) {
                context.lineTo(points[i].x, points[i].y);
            }
            //context.closePath();
            //context.stroke();
            context.fillStrokeShape(this);
        });
        if (self.isMouseUp) {
            anim.stop();
        }

    }, self.layer)

    anim.start();
}