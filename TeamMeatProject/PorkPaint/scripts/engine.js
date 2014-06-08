/// <reference path="_references.js" />

var Engine = function () {

    var toolType = 'rect';
    var fillColor = 'white';
    var outlineColor = 'black';
    var outlineWidth = 1;

    var toolbox = document.getElementById('toolbox')
    var toolboxWidth = toolbox.clientWidth;
    var toolboxMarginRight = toolbox.style.marginRight;
    var borderWidth = toolbox.style.borderRightWidth;
    var totalOffset = toolboxWidth + borderWidth + toolboxMarginRight; 

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