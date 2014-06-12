// Creates a new shape control
function createShapeControl(name, shape, drawInnerPictureFunc) {
    controlName = name;
    createControl(currentControlX, currentControlY, controlName, drawInnerPictureFunc);
    $('#' + controlName).on('click', function () {
        eng.setShape(shape);
    });
}

function createStrokeControl(name, strokeWidth, drawInnerPictureFunc) {
    controlName = name;
    createControl(currentControlX, currentControlY, controlName, drawInnerPictureFunc);
    $('#' + controlName).on('click', function () {
        eng.setOutlineWidth(strokeWidth);

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