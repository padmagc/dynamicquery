/*
* Konstruktor
*/
function InitForm() {
    SetBaseToControls();
    $('placeholderColumnType').QBGrid({
        tableBodyId: $('placeholderColumnRows'),
        rowTemplateId: $('rowTemplateType')
    });
}
/*
* Set default values of controls and variables
*/
function SetBaseToControls() {
    $.Utils.hideInfo();
}
