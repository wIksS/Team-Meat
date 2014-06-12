/// <reference path="_references.js" />

var Engine = function () {
    var toolType = 'circle';
    var fillColor = 'yellowgreen';
    var outlineColor = 'blue';
    var outlineWidth = 5;

    var setColorTo = 'stroke';

    var shapes = [];

    var toolbox = document.getElementById('toolbox')
    var totalOffsetX = toolbox.offsetWidth -490;
    var totalOffSetY = 27;

    // ***************************
    // Should move to index.js and pass to Engine as parameter
    var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 780,
        height: 400
    });
    // **************************


    $('#canvas-container').on('mousedown', function (e) {
        var layer = new Kinetic.Layer();
        var figureProp = eng.getProperties();

        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;
        var initMousePosition = new Point(x | 0,y|0);

        var shape = new Kinetic.Shape();
        shapes.push(shape);
        switch (figureProp.tool) {
            case 'dragAndDrop': addDragAndDrop(shapes,true);return;
                break;
        }

        addDragAndDrop(shapes, false);

        layer.add(shape);

        addRemoveEvent(shape, layer);

        var newFigure = new Shape(stage, shape,figureProp.stroke, figureProp.fill, figureProp.strokeWidth, initMousePosition, layer, totalOffsetX,totalOffSetY );
      
        switch (figureProp.tool) {
            case 'rect': newFigure.drawRectangle();
                break;
            case 'circle': newFigure.drawCircle();
                break;
            case 'line': newFigure.drawLine();
                break;
            case 'isoTriangle': newFigure.drawIsoscelesTriangle();
                break;
            case 'rightTriangle': newFigure.drawRightTriangle();
                break;
        }
    });

    function addRemoveEvent(shape,layer) {
        shape.on('click', function () {
            console.log(toolType);
            if (toolType == 'remove') {
                layer.remove(shape);
            }
        });
    }

    function addDragAndDrop(shapes, isDrag) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].setDraggable(isDrag);
        }
    }

    return {
        setShape: function (type) {
            toolType = type;
            console.log(type);
        },
        setFillColor: function (color) {
            fillColor = color;
            console.log('fill: ' + color)
        },
        setOutlineColor: function (color) {
            outlineColor = color;
            console.log('stroke: ' + color)
        },
        setOutlineWidth: function (width) {
            outlineWidth = width;
        },
        setColorFocus: function (colorToSetOnPaletteClick) {
            setColorTo = colorToSetOnPaletteClick;
            console.log(colorToSetOnPaletteClick);
        },
        getColorFocus: function () {
            return setColorTo;
        },
        getProperties: function () {
            return {
                tool: toolType,
                fill: fillColor,
                stroke: outlineColor,
                strokeWidth: outlineWidth
            }
        },
        getCanvasOffset: function () {
            return totalOffset;
        }
    }
}

var eng = new Engine(); // REFACTOR!