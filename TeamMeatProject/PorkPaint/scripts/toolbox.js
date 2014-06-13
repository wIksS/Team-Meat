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

// Pencil control
createShapeControl('pencilControl', 'pencil', drawIsoTriangleInnerPicture);
// SHAPE CONTROLS *************************************************************

drawHorizontalSeparator(); // <------------- separator between shape controls and fill/stroke controls

// FILL AND STROKE CONTROLS *************************************************************
controlName = 'strokeColor';
createControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
    stroke: eng.getProperties().stroke,
    'stroke-width': 3
}).node.id = 'strokeInnerPicture';

// --------------- FILL CONTROL START --------------------
controlName = 'fillColor';
createControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
    fill: eng.getProperties().fill
}).node.id = 'fillColorInner';

// --------------- FILL CONTROL END --------------------

// --------------- STROKE CONTROL Start --------------------
controlName = 'strokeWidth1';
createStrokeControl(controlName, 1, drawLineInnerPicture);
controlName = 'strokeWidth3';
createStrokeControl(controlName, 3, drawLineInnerPicture);
controlName = 'strokeWidth5';
createStrokeControl(controlName, 5, drawLineInnerPicture);
controlName = 'strokeWidth10';
createStrokeControl(controlName, 10, drawLineInnerPicture);


// --------------- STROKE CONTROL END --------------------

drawHorizontalSeparator(); // <------------- separator between fill/stroke controls and colors controls

// COLORS CONTORLS *************************************************************
// ADD COLORS HERE. // Colors controls don't have inner pictures //


//  Iнput type color

var body = document.querySelector('body');
var input = document.createElement('input');
input.setAttribute("type", "color");
input.setAttribute("id", "setColor");
input.setAttribute('onchange', 'setColorsToEngine(this.value);')
body.appendChild(input).style.visibility = "hidden";

var input = document.querySelector('#setColor');
controlName = 'colorSelector';
createControl(currentControlX, currentControlY, controlName, drawRectInnerPicture).attr({
    fill: input.value
}).node.id = 'colorSelectorInner';

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

// FUNCTIONS ********************************************* //

// Applies the default attributes to svg element
function setDefaultAttributes(picture) {
    picture.attr({
        fill: innerPicturesBackgroundColor,
        stroke: innerPicturesBorderColor,
        'stroke-width': innerPicturesBorderWidth
    });

    moveCoordinatesToNextValidPosition();
}


//Send color to the engine
function setColorsToEngine(color) {
    $($('#colorSelectorInner')).attr({
        fill: color
    });
    var set = eng.getColorFocus();
    switch (set) {
        case 'stroke':
            eng.setOutlineColor(color);
            eng.setTubeColor(color);
            break;
        case 'fill':
            eng.setFillColor(color);
            eng.setTubeColor(color);
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
}