/// <reference path="_references.js" />

var Engine = function () {
    var toolType = 'circle';
    var fillColor = 'yellowgreen';
    var outlineColor = 'blue';
    var outlineWidth = 10;

    var setColorTo = 'stroke';

    var toolbox = document.getElementById('toolbox')
    var totalOffset = toolbox.offsetWidth;

    // ***************************
    // Should move to index.js and pass to Engine as parameter
    var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 1600,
        height: 800
    });
    // **************************

    var layer = new Kinetic.Layer();

    $('#canvas-container').on('mousedown', function (e) {
        var figureProp = eng.getProperties();
        var initMousePosition = new Point(e.pageX - totalOffset, e.pageY);

        var shape = new Kinetic.Shape();
        var newFigure = new Shape(stage, shape,figureProp.stroke, figureProp.fill, figureProp.strokeWidth, initMousePosition, layer, totalOffset + 15);

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