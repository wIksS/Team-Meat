function Shape(curStage,shape, strokeColor, fillColor, lineStrokeWidth,initMousePosition, layer, marginLeft, marginTop) {
    this.curStage = curStage;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineStrokeWidth = lineStrokeWidth;
    this.initMousePosition = initMousePosition;
    this.layer = layer;
    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
    this.shape = shape;
}
Shape.prototype.draw = function (shape) {
    var self = this;
    self.isMouseUp = false;
    self.curMousePosition = new Point(self.initMousePosition.x, self.initMousePosition.y);
    self.initMousePosition = self.initMousePosition;
    //self.shape = new Kinetic.Shape({
    //    stroke: self.strokeColor,
    //    strokeWidth: self.lineStrokeWidth,
    //    fill: self.fillColor,
    //});

    self.shape.setStroke(self.strokeColor);
    self.shape.setStrokeWidth(self.lineStrokeWidth);
    self.shape.setFill(self.fillColor);

    self.layer.add(self.shape);
    self.curStage.add(self.layer);

    $('#canvas-container').on('mousemove', function (e) {
        self.curMousePosition = new Point((e.pageX | 0) - self.marginLeft | 0, e.pageY);
    });
    $('body').on('mouseup', function () {
        self.isMouseUp = true;
    })
}