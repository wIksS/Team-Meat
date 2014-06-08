/// <reference path="_references.js" />

var paper = Raphael('toolbox', 300, 500);

// Controls attributes
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

// Inner pictures attributes
var innerPicturesBackgroundColor = 'none';
var innerPicturesBorderColor = 'black';
var innerPicturesBorderWidth = 2;

// Rectangle control
controlName = 'rectControl';
addControl(currentControlX, currentControlY, controlName, drawRectInnerPicture);
$('#' + controlName).on('click', function () {
    eng.setShape('rect');
});

// Line control
controlName = 'lineControl';
addControl(currentControlX, currentControlY, controlName, drawLineInnerPicture);
$('#' + controlName).on('click', function () {
    eng.setShape('line');
});

// Circle control
controlName = 'circleControl';
addControl(currentControlX, currentControlY, controlName, drawCircleInnerPicture);
$('#' + controlName).on('click', function () {
    eng.setShape('circle');
});

// Triangle control
controlName = 'triangleControl';
addControl(currentControlX, currentControlY, controlName, drawTriangleInnerPicture);
$('#' + controlName).on('click', function () {
    eng.setShape('triangle');
});

// Isosceles triangle control
controlName = 'isoTriangleControl';
addControl(currentControlX, currentControlY, controlName, drawIsoTriangleInnerPicture);
$('#' + controlName).on('click', function () {
    eng.setShape('isoTriangle');
});

function addControl(x, y, controlId, drawInnerPictureFunc) {
    var control = drawControlBox(x, y);
    control.node.id = controlId;    

    var innerPicture = drawInnerPictureFunc(x, y);
    setInnerPictureAttribs(innerPicture);
}

function drawControlBox(x, y) {
    var newRect = paper.rect(x, y, controlsDefaultSize, controlsDefaultSize);
    newRect.attr({
        fill: controlsDefaultBackgroundColor,
        stroke: controlsDefaultBorderColor,
        'stroke-width': controlsDefaultBorderWidth
    });

    return newRect;
}

function setInnerPictureAttribs(picture) {
    picture.attr({
        fill: innerPicturesBackgroundColor,
        stroke: innerPicturesBorderColor,
        'stroke-width': innerPicturesBorderWidth
    });

    changeNextControlCoords();
}

function changeNextControlCoords() {
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

function drawLineInnerPicture(x,y) {    
    var pictureX = x + controlsDefaultSize / 5;
    var pictureY = y + controlsDefaultSize / 2;
    var lineLength = 3 * (controlsDefaultSize / 5);

    var path = 'M' + pictureX + ' ' + pictureY + ' L ' + (pictureX + lineLength) + ' ' + pictureY;
    var linePicture = paper.path(path);

    return linePicture;
}

function drawCircleInnerPicture(x, y) {
    var pictureX = x + controlsDefaultSize / 2;
    var pictureY = y + controlsDefaultSize / 2;
    var radius = controlsDefaultSize / 3;

    var circlePicture = paper.circle(pictureX, pictureY, radius);

    return circlePicture;
}

function drawTriangleInnerPicture(x, y) {
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

function drawIsoTriangleInnerPicture(x, y) {
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