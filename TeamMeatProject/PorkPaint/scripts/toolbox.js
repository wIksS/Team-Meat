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
var fillControlDefaultFillColor = 'black';
var controlsDefaultBorderColor = 'black';
var controlsDefaultBorderWidth = 3;

// Inner pictures attributes
var innerPicturesBackgroundColor = 'none';
var innerPicturesBorderColor = 'black';
var innerPicturesBorderWidth = 2;

// SHAPE CONTROLS *************************************************************
// Rectangle control
initiateControl('rectControl', 'rect', drawRectInnerPicture);

// Line control
initiateControl('lineControl', 'line', drawLineInnerPicture);

// Circle control
initiateControl('circleControl', 'circle', drawCircleInnerPicture);

// Triangle control
initiateControl('isoTriangleControl', 'isoTriangle', drawIsoTriangleInnerPicture);

// Right triangle control
initiateControl('rightTriangleControl', 'rightTriangle', drawRightTriangleInnerPicture);
// SHAPE CONTROLS *************************************************************

drawHorizontalSeparator();

// COLORS CONTROLS
controlName = 'strokeColor';
addControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
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

// FILL
controlName = 'fillColor';
addControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
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
// END FILL

drawHorizontalSeparator();

// ADD COLORS HERE:
addControl(currentControlX, currentControlY, 'redColor').attr({
    fill: 'red'
});
attachColorSelectEvent('redColor', 'red');

addControl(currentControlX, currentControlY, 'yellowColor').attr({
    fill: 'yellow'
});
attachColorSelectEvent('yellowColor', 'yellow');


// ********************************************* //
function initiateControl(name, shape, drawInnerPictureFunc) {
    controlName = name;
    addControl(currentControlX, currentControlY, controlName, drawInnerPictureFunc);
    $('#' + controlName).on('click', function () {
        eng.setShape(shape);
    });
}

function addControl(x, y, controlId, drawInnerPictureFunc) {
    var control = drawControlBox(x, y);
    control.node.id = controlId;

    if (drawInnerPictureFunc) {
        var innerPicture = drawInnerPictureFunc(x, y);
        setInnerPictureAttribs(innerPicture);
        return innerPicture;
    } else {
        changeNextControlCoords();
        return control;
    }
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

function drawLineInnerPicture(x, y) {
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

function drawHorizontalSeparator() {
    currentControlY += controlsDefaultSize + controlsDefaultMargin;
    var lineLength = paper.width;
    var path = 'M ' + 0 + ' ' + currentControlY + ' L ' + lineLength + ' ' + currentControlY;
    paper.path(path);

    elementsDrawnInCurrentRowCounter = 0;
    currentControlY += controlsDefaultMargin;
    currentControlX = controlsDefaultMargin;
}

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