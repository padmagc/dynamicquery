/*
* Konstruktor
*/
function InitForm() {
    SetBaseToControls();
    $('placeholderColumnType').QBGrid({
        tableBodyId: 'placeholderColumnRows',
        rowTemplateId: 'rowTemplateType',
        dataSource: [
        { Id: 1, Name: 'Elso1', Active: true},
        { Id: 2, Name: 'Elso2', Active: true },
        { Id: 3, Name: 'Elso3', Active: true },
        { Id: 4, Name: 'Elso4', Active: false },
        { Id: 5, Name: 'Elso5', Active: true },
        { Id: 6, Name: 'Elso6', Active: true }
        ],
        gridFunctionCallback: gridFunctionCallback
    });
}
/*
* Set default values of controls and variables
*/
function SetBaseToControls() {
    $.Utils.hideInfo();
}
/*
* Events from grid
*/
function gridFunctionCallback(functionname, data) {
    switch (functionname) {
        case 'selecttype':
            break;
        case 'updatetype':
            break;
        case 'inactivetype':
            break;
        case 'activetype':
            break;
        default:
    }
}

