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
    var cross = paper.path('M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z').attr({
        fill: "#000", stroke: "none"
    });
    cross.translate(209, 10);
    return cross;
}

//Draw drag and drop box inner marker
function drawDragAndDropInnerPicture() {
    var hand = paper.path('M14.296,27.885v-2.013c0,0-0.402-1.408-1.073-2.013c-0.671-0.604-1.274-1.274-1.409-1.61c0,0-0.268,0.135-0.737-0.335s-1.812-2.616-1.812-2.616l-0.671-0.872c0,0-0.47-0.671-1.275-1.342c-0.805-0.672-0.938-0.067-1.476-0.738s0.604-1.275,1.006-1.409c0.403-0.134,1.946,0.134,2.684,0.872c0.738,0.738,0.738,0.738,0.738,0.738l1.073,1.141l0.537,0.201l0.671-1.073l-0.269-2.281c0,0-0.604-2.55-0.737-4.764c-0.135-2.214-0.47-5.703,1.006-5.837s1.007,2.55,1.073,3.489c0.067,0.938,0.806,5.232,1.208,5.568c0.402,0.335,0.671,0.066,0.671,0.066l0.402-7.514c0,0-0.479-2.438,1.073-2.549c0.939-0.067,0.872,1.543,0.872,2.147c0,0.604,0.269,7.514,0.269,7.514l0.537,0.135c0,0,0.402-2.214,0.604-3.153s0.604-2.416,0.537-3.087c-0.067-0.671-0.135-2.348,1.006-2.348s0.872,1.812,0.939,2.415s-0.134,3.153-0.134,3.757c0,0.604-0.738,3.623-0.537,3.824s2.08-2.817,2.349-3.958c0.268-1.141,0.201-3.02,1.408-2.885c1.208,0.134,0.47,2.817,0.402,3.086c-0.066,0.269-0.671,2.349-0.872,2.952s-0.805,1.476-1.006,2.013s0.402,2.349,0,4.629c-0.402,2.281-1.61,5.166-1.61,5.166l0.604,2.08c0,0-1.744,0.671-3.824,0.805C16.443,28.221,14.296,27.885,14.296,27.885z').attr({
        fill: "#000", stroke: "none"
    });
    hand.translate(250,10);
    return hand;
}

//Draw tube box inner marker
function drawTubeInnerPicture() {
    var bucket = paper.path('M21.589,6.787c-0.25-0.152-0.504-0.301-0.76-0.445c-3.832-2.154-8.234-3.309-9.469-1.319c-1.225,2.103,2.314,5.798,6.293,8.222c0.082,0.051,0.167,0.098,0.25,0.146c5.463-0.402,9.887,0.204,9.989,1.402c0.009,0.105-0.026,0.211-0.083,0.318c0.018-0.025,0.041-0.045,0.057-0.07C29.146,12.943,25.585,9.222,21.589,6.787zM10.337,7.166l-0.722,1.52c-4.339,2.747-6.542,6.193-5.484,8.625c0.19,0.438,0.482,0.812,0.846,1.137l0.456-0.959c-0.156-0.178-0.292-0.365-0.384-0.577c-0.732-1.682,0.766-4.188,3.707-6.417l-3.323,6.994c1.492,1.689,5.748,1.748,10.276,0.154c-0.037-0.354,0.032-0.722,0.232-1.049c0.485-0.796,1.523-1.048,2.319-0.563c0.795,0.486,1.048,1.522,0.562,2.319c-0.484,0.795-1.523,1.047-2.319,0.562c-0.154-0.094-0.281-0.213-0.394-0.344c-4.354,1.559-8.372,1.643-10.553,0.314c-0.214-0.131-0.403-0.279-0.58-0.436l-0.124,0.26c-1.088,1.785,1.883,4.916,5.23,6.957c3.347,2.039,7.493,3.246,8.552,1.502l7.77-10.204c-2.48,0.384-6.154-0.963-9.272-2.864C14.014,12.197,11.131,9.546,10.337,7.166z').attr({
        fill: "#000", stroke: "none"
    });
    bucket.translate(290, 10);
    return bucket;
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
