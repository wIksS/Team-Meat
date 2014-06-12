$('#strokeColor').on('click', function () {
    eng.setColorFocus('stroke');
    $('#strokeColor').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#fillColor').attr({
        fill: controlsDefaultBackgroundColor
    });
});
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
$('#strokeWidth1').on('click', function () {
    $('#strokeWidth1').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#strokeWidth3').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth5').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth10').attr({
        fill: controlsDefaultBackgroundColor
    });
});
$('#strokeWidth3').on('click', function () {
    $('#strokeWidth1').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth3').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#strokeWidth5').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth10').attr({
        fill: controlsDefaultBackgroundColor
    });
});
$('#strokeWidth5').on('click', function () {
    $('#strokeWidth1').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth3').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth5').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
    $('#strokeWidth10').attr({
        fill: controlsDefaultBackgroundColor
    });
});
$('#strokeWidth10').on('click', function () {
    $('#strokeWidth1').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth3').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth5').attr({
        fill: controlsDefaultBackgroundColor
    });
    $('#strokeWidth10').attr({
        fill: controlsDefaultSelectedBackgroundColor
    });
});
$('#colorSelector').on('click', function () {
    input.click();
});
$('#colorSelectorInner').on('click', function () {
    input.click();
});

