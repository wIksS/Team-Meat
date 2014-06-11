/// <reference path="_references.js" />
// TODO: Modulize the toolbox
var paper = Raphael('toolbox', 780, 145); // TODO: Pass toolbox as parameter

// --------- Controls attributes
var controlName;
var maxControlsPerRow = 16;
var elementsDrawnInCurrentRowCounter = 0;
var controlsDefaultMargin = 10;
var currentControlX = controlsDefaultMargin;
var currentControlY = controlsDefaultMargin;

var controlsDefaultSize = 30;
var controlsDefaultBackgroundColor = 'lightgray';
var controlsDefaultSelectedBackgroundColor = 'darkgray';
var controlsDefaultBorderColor = '#333';
var controlsDefaultBorderWidth = 1;

// ----------------------  Inner pictures attributes
var innerPicturesBackgroundColor = 'none';
var innerPicturesBorderColor = 'black';
var innerPicturesBorderWidth = 2;

// SHAPE CONTROLS *************************************************************
// Rectangle control
createShapeControl('rectControl', 'rect', drawRectInnerPicture);

// Line control
createShapeControl('lineControl', 'line', drawLineInnerPicture);

// Circle control
createShapeControl('circleControl', 'circle', drawCircleInnerPicture);

// Triangle control
createShapeControl('isoTriangleControl', 'isoTriangle', drawIsoTriangleInnerPicture);

// Right triangle control
createShapeControl('rightTriangleControl', 'rightTriangle', drawRightTriangleInnerPicture);

// Remove control
createShapeControl('removeControl', 'remove', drawRemoveInnerPicture);

// Drag and Drop control
createShapeControl('dragAndDropControl', 'dragAndDrop', drawDragAndDropInnerPicture);

// Tube control
createShapeControl('tubeControl', 'tube', drawTubeInnerPicture);
// SHAPE CONTROLS *************************************************************

drawHorizontalSeparator(); // <------------- separator between shape controls and fill/stroke controls

// FILL AND STROKE CONTROLS *************************************************************
controlName = 'strokeColor';
createControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
    stroke: eng.getProperties().stroke,
    'stroke-width': 3
}).node.id = 'strokeInnerPicture';
$('#strokeColor').on('click', function () {
    eng.setColorFocus('stroke');
    $('#strokeColor').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#fillColor').attr({
        fill: controlsDefaultBackgroundColor
    });
});

// --------------- FILL CONTROL START --------------------
controlName = 'fillColor';
createControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
    fill: eng.getProperties().fill
}).node.id = 'fillColorInner';
$('#fillColor').on('click', function () {
    eng.setColorFocus('fill');
    $('#fillColor').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#strokeColor').attr({
        fill: controlsDefaultBackgroundColor
    });
});
$('#fillColorInner').on('click', function () {
    eng.setColorFocus('fill');
    $('#fillColor').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#strokeColor').attr({
        fill: controlsDefaultBackgroundColor
    });
});
// --------------- FILL CONTROL END --------------------

drawHorizontalSeparator(); // <------------- separator between fill/stroke controls and colors controls

// COLORS CONTORLS *************************************************************
// ADD COLORS HERE. // Colors controls don't have inner pictures //


//  Iнput type color

var body = document.querySelector('body');
var input = document.createElement('input');
input.setAttribute("type", "color");
input.setAttribute("id", "setColor");
body.appendChild(input).style.visibility = "hidden";

var input = document.querySelector('#setColor');
createControl(currentControlX, currentControlY, 'colorSelector', drawRectInnerPicture).attr({
    fill: input.value
}).node.id = 'colorSelectorInner';

var getColorFromInput = input.value;

attachColorSelectEvent('colorSelector', getColorFromInput);
attachColorSelectEvent('colorSelectorInner', getColorFromInput);

//--------------
var colorPalette = [
    { name: 'black', value: '#000' },
    { name: 'white', value: '#FFF' },
    { name: 'gray', value: '#a0a0a0' },
    { name: 'yellow', value: '#fef200' },
    { name: 'yellowOrange', value: '#fcb712' },
    { name: 'orange', value: '#f68a1e' },
    { name: 'orangeRed', value: '#f05922' },
    { name: 'red', value: '#ec1a23' },
    { name: 'redViolet', value: '#b52266' },
    { name: 'violet', value: '#652b8f' },
    { name: 'violetBlue', value: '#524ea2' },
    { name: 'blue', value: '#0076b2' },
    { name: 'blueGreen', value: '#6cc7be' },
    { name: 'green', value: '#00a44e' },
    { name: 'greenYellow', value: '#add036' },
];

drawColorPalette(colorPalette);

function drawColorPalette(colorPalette) {
    for (var i = 0; i < colorPalette.length; i++) {

        var colorName = colorPalette[i].name + 'Color';
        var colorValue = colorPalette[i].value;

        createControl(currentControlX, currentControlY, colorName).attr({
            fill: colorValue
        });
        attachColorSelectEvent(colorName, colorValue);
    }
}



// FUNCTIONS ********************************************* //
// Creates a new shape control
function createShapeControl(name, shape, drawInnerPictureFunc) {
    controlName = name;
    createControl(currentControlX, currentControlY, controlName, drawInnerPictureFunc);
    $('#' + controlName).on('click', function () {
        eng.setShape(shape);
    });
}

// Draws a new control box and its inner picture if applicable
function createControl(x, y, controlId, drawInnerPictureFunc) {
    var control = drawControlBox(x, y);
    control.node.id = controlId;

    if (drawInnerPictureFunc) {
        var innerPicture = drawInnerPictureFunc(x, y);
        setDefaultAttributes(innerPicture);
        return innerPicture;
    } else {
        moveCoordinatesToNextValidPosition();
        return control;
    }
}

// Draws a control box at given coordinates
function drawControlBox(x, y) {
    var newRect = paper.rect(x, y, controlsDefaultSize, controlsDefaultSize);
    newRect.attr({
        fill: controlsDefaultBackgroundColor,
        stroke: controlsDefaultBorderColor,
        'stroke-width': controlsDefaultBorderWidth
    });

    return newRect;
}

// Applies the default attributes to svg element
function setDefaultAttributes(picture) {
    picture.attr({
        fill: innerPicturesBackgroundColor,
        stroke: innerPicturesBorderColor,
        'stroke-width': innerPicturesBorderWidth
    });

    moveCoordinatesToNextValidPosition();
}

// Sets the x and y of the next control to valid ones
function moveCoordinatesToNextValidPosition() {
    elementsDrawnInCurrentRowCounter++;
    if (elementsDrawnInCurrentRowCounter === maxControlsPerRow) {
        currentControlY += controlsDefaultSize + controlsDefaultMargin;
        currentControlX = controlsDefaultMargin;
        elementsDrawnInCurrentRowCounter = 0;
        return;
    } else {
        currentControlX += controlsDefaultSize + controlsDefaultMargin;
    }
}

// Inner pictures
// Draws a rectangle in a control box by given x, y of the control box
function drawRectInnerPicture(x, y) {
    var padding = controlsDefaultSize / 5; // guarantees central positioning
    // Width and height are different in order to visualize a rectange, not a square
    var pictureWidth = controlsDefaultSize - 2 * padding;
    var pictureHeight = controlsDefaultSize - 2.5 * padding;

    var pictureX = x + padding;
    var pictureY = y + (controlsDefaultSize - pictureHeight) / 2;

    var rectanglePicture = paper.rect(pictureX, pictureY, pictureWidth, pictureHeight);

    return rectanglePicture;
}

// Draws a line in a control box by given x, y of the control box
function drawLineInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 5;
    var pictureY = y + controlsDefaultSize / 2;
    var lineLength = 3 * (controlsDefaultSize / 5);

    var path = 'M' + pictureX + ' ' + pictureY + ' L ' + (pictureX + lineLength) + ' ' + pictureY;
    var linePicture = paper.path(path);

    return linePicture;
}

// Draws a circle in a control box by given x, y of the control box
function drawCircleInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 2;
    var pictureY = y + controlsDefaultSize / 2;
    var radius = controlsDefaultSize / 3;

    var circlePicture = paper.circle(pictureX, pictureY, radius);

    return circlePicture;
}

// Draws a triangle in a control box by given x, y of the control box
function drawIsoTriangleInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 2;
    var pictureY = y + controlsDefaultSize / 5;
    var point2X = controlsDefaultSize / 3.33;
    var point2Y = controlsDefaultSize / 1.66;
    var point3X = controlsDefaultSize / 1.66;

    var path = 'M' + pictureX + ' ' + pictureY +
               ' l-' + point2X + ' ' + point2Y +
               ' h ' + point3X + ' ' + 'z';
    var trianglePicture = paper.path(path);

    return trianglePicture;
}

// Draws a triangle and a 90 degrees sign in a control box by given x, y of the control box
function drawRightTriangleInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 5;
    var pictureY = y + controlsDefaultSize / 5;
    var point2Y = controlsDefaultSize / 1.66;
    var point3X = controlsDefaultSize / 1.66;

    var path = 'M' + pictureX + ' ' + pictureY +
               ' v ' + point2Y +
               ' h ' + point3X + ' z';
    var trianglePicture = paper.path(path);

    var angleX = x + controlsDefaultSize / 5;
    var angleY = y + controlsDefaultSize / 1.25;
    var angleRadius = controlsDefaultSize / 5;

    paper.path(arc([angleX, angleY], angleRadius, 270, 360));

    var pointX = x + controlsDefaultSize / 3.448;
    var pointY = y + controlsDefaultSize / 1.408;
    var pointRadius = controlsDefaultSize / 70;

    paper.circle(pointX, pointY, pointRadius);

    return trianglePicture;
}

// Draws a horizontal line in the toolbox at an even margin from the top and the controls it separates
function drawHorizontalSeparator() {
    currentControlY += controlsDefaultSize + controlsDefaultMargin;
    var lineLength = paper.width;
    var path = 'M ' + 0 + ' ' + currentControlY + ' L ' + lineLength + ' ' + currentControlY;
    paper.path(path);

    elementsDrawnInCurrentRowCounter = 0;
    currentControlY += controlsDefaultMargin;
    currentControlX = controlsDefaultMargin;
}

//Draw remove box inner marker
function drawRemoveInnerPicture() {
    var letterX = paper.text(225, 25, 'X');
    letterX.attr({
        'font-size': 12,
        'font-weight': 'bold'
    });
    return letterX;
}

//Draw drag and drop box inner marker
function drawDragAndDropInnerPicture() {
    var letterD = paper.text(265, 25, 'D');
    letterD.attr({
        'font-size': 12
    });
    return letterD;
}

//Draw tube box inner marker
function drawTubeInnerPicture() {
    var letterT = paper.text(305, 25, 'T');
    letterT.attr({
        'font-size': 12
    });
    return letterT;
}
// Attaches event handlers to a color box
function attachColorSelectEvent(colorControlId, color) {
    $('#' + colorControlId).on('click', function () {
        if (colorControlId === 'colorSelector' || colorControlId === 'colorSelectorInner') {
            var input = document.querySelector('input');
            input.click();

            // TODO: Find better way! Catch closing of the input 
            alert('Are you sure?');

            color = input.value;
            $($('#colorSelectorInner')).attr({
                fill: color
            });
        }
        var set = eng.getColorFocus();
        switch (set) {
            case 'stroke':
                eng.setOutlineColor(color);
                break;
            case 'fill':
                eng.setFillColor(color);
                break;
        }

        switch (set) {
            case 'stroke':
                $('#strokeInnerPicture').attr({
                    stroke: color
                });
                break;
            case 'fill':
                $($('#fillColorInner')).attr({
                    fill: color
                });
                break;
        }
    });
}

// Functions for drawing arcs with Raphael svg
function arc(center, radius, startAngle, endAngle) {
    angle = startAngle;
    coords = toCoords(center, radius, angle);
    path = "M " + coords[0] + " " + coords[1];
    while (angle <= endAngle) {
        coords = toCoords(center, radius, angle);
        path += " L " + coords[0] + " " + coords[1];
        angle += 1;
    }
    return path;
}

function toCoords(center, radius, angle) {
    var radians = (angle / 180) * Math.PI;
    var x = center[0] + Math.cos(radians) * radius;
    var y = center[1] + Math.sin(radians) * radius;
    return [x, y];
}

// ---- end of drawing arcs functions
