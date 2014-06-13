/// <reference path="_references.js" />

var Engine = function () {
    var toolType = 'circle';
    var fillColor = 'yellowgreen';
    var outlineColor = 'blue';
    var outlineWidth = 5;
    var tubeColor= 'black';

    var setColorTo = 'stroke';

    var shapes = [];
   // var lines = [];

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
        var initMousePosition = new Point(x | 0, y | 0);

        var shape = new Kinetic.Shape();
        shapes.push(shape);
        switch (figureProp.tool) {
            case 'dragAndDrop': addDragAndDrop(shapes,true);return;
                break;
        }

        addDragAndDrop(shapes, false);

        layer.add(shape);

        addRemoveEvent(shape, layer);

        addTube(shape, layer);

        var newFigure = new Shape(stage, shape, figureProp.stroke, figureProp.fill, figureProp.strokeWidth, initMousePosition, layer, totalOffsetX, totalOffSetY),
             newLine = new LineDrawer(stage, shape, figureProp.stroke, figureProp.fill, figureProp.strokeWidth, initMousePosition, layer, totalOffsetX, totalOffSetY);
        
        switch (figureProp.tool) {
            case 'pencil': newLine.drawPencil();
                break;
            case 'rect': newFigure.drawRectangle();
                break;
            case 'circle': newFigure.drawCircle();
                break;
            case 'line': newLine.drawLine();
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

    function addTube(shape, layer) {
        shape.on('click', function (){
            if (toolType == 'tube') {
                this.fill(tubeColor);
                layer.draw();
            }
        });
    }

    function sevaStageToIMG()
    {
        console.log('saving stage');
        stage.toDataURL({
            callback: function(dataUrl) {
                var download = document.createElement('a');
                download.setAttribute('href', dataUrl);
                download.setAttribute('download', 'Image.png');
                download.click();
            }
        });
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
        setTubeColor: function (color) {
            tubeColor = color;
            console.log("Set tube color to " + color);
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
        },
        saveStage: function () {
            
           return sevaStageToIMG();
        }
    }
}

var eng = new Engine(); // REFACTOR!