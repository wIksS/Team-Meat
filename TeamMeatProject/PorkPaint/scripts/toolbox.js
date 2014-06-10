/// <reference path="_references.js" />
// TODO: Modulize the toolbox
var paper = Raphael('toolbox', 270, 720); // TODO: Pass toolbox as parameter

// --------- Controls attributes
var controlName;
var maxControlsPerRow = 3;
var elementsDrawnInCurrentRowCounter = 0;
var controlsDefaultMargin = 30;
var currentControlX = controlsDefaultMargin;
var currentControlY = controlsDefaultMargin;

var controlsDefaultSize = 50;
var controlsDefaultBackgroundColor = 'lightgray';
var controlsDefaultSelectedBackgroundColor = 'darkgray';
var controlsDefaultBorderColor = 'black';
var controlsDefaultBorderWidth = 3;

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

function drawColorPalette(colorPalette){
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
    var pictureX = x + controlsDefaultSize / 3;
    var pictureY = y + controlsDefaultSize / 5;
    var line1Length = controlsDefaultSize / 2;
    var line2Length = controlsDefaultSize / 1.5;

    var path = 'M' + pictureX + ' ' + pictureY +
               ' L ' + (pictureX + line1Length) + ' ' + pictureY +
               ' L ' + pictureX + ' ' + (pictureY + line2Length) +
               ' L ' + pictureX + ' ' + pictureY;
    var trianglePicture = paper.path(path);

    return trianglePicture;
}

// Draws a triangle and a 90 degrees sign in a control box by given x, y of the control box
function drawRightTriangleInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 2.3;
    var pictureY = y + controlsDefaultSize / 5;
    var line1Length = controlsDefaultSize / 2;
    var line2Length = controlsDefaultSize / 1.5;

    var path = 'M' + pictureX + ' ' + pictureY +
               ' L ' + (pictureX + line1Length) + ' ' + pictureY +
               ' L ' + pictureX + ' ' + (pictureY + line2Length) +
               ' L ' + pictureX + ' ' + pictureY;
    var trianglePicture = paper.path(path);

    var textX = x + controlsDefaultSize / 4.5;
    var textY = y + controlsDefaultSize / 2;
    var text90 = paper.text(textX, textY, '90');
    text90.attr('font-size', (controlsDefaultSize / 3));

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

// Attaches event handlers to a color box
function attachColorSelectEvent(colorControlId, color) {
    $('#' + colorControlId).on('click', function () {
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