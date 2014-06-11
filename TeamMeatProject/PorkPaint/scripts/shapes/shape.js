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
    var self = this,
        mousePosition = self.curStage.getPointerPosition();
    self.isMouseUp = false;
    self.curMousePosition = new Point(self.initMousePosition.x, self.initMousePosition.y);
    self.initMousePosition = self.initMousePosition;

    self.shape.setStroke(self.strokeColor);
    self.shape.setStrokeWidth(self.lineStrokeWidth);
    self.shape.setFill(self.fillColor);

    self.curStage.add(self.layer);

    $('#canvas-container').on('mousemove', function (e) {
        x = e.pageX - this.offsetLeft;//- this.offset().left;
        y = e.pageY - this.offsetTop;// - this.offset().top;
        self.curMousePosition = new Point(x | 0 ,y | 0);
    });
    $('body').on('mouseup', function () {
        self.isMouseUp = true;
    })
}