/// <reference path="_references.js" />

var Engine = function () {

    var toolType = 'rect';
    var fillColor = 'red';
    var outlineColor = 'black';
    var outlineWidth = 10;

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

    $('body').on('mousedown', function (e) {
        var figureProp = eng.getProperties();
        var newFigure;
        switch (figureProp.tool) {
            case 'rect': newFigure = new Rectangle(stage, figureProp.stroke, figureProp.fill, figureProp.strokeWidth); break;
            case 'circle': newFigure = new Circle(stage, figureProp.stroke, figureProp.fill, figureProp.strokeWidth); break;
            case 'line': newFigure = new Line(stage, figureProp.stroke, figureProp.strokeWidth); break;
            case 'isoTriangle': newFigure = new IsoscelesTriangle(stage, figureProp.stroke, figureProp.fill, figureProp.strokeWidth); break;
            case 'rightTriangle': newFigure = new RightTriangle(stage, figureProp.stroke, figureProp.fill, figureProp.strokeWidth); break;
        }

        var initMousePosition = new Point(e.pageX - eng.getCanvasOffset(), e.pageY);
        newFigure.draw(initMousePosition, layer);
    });

    return {
        setShape: function (type) {
            toolType = type;
            console.log(type);
        },
        setFillColor: function (color) {
            fillColor = color;
        },
        setOutlineColor: function (color) {
            outlineColor = color;
        },
        setOutlineWidth: function (width) {
            outlineWidth = width;
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

    // TODO: return vertical offset (toolbox width + margins + etc...)
}

var eng = new Engine();