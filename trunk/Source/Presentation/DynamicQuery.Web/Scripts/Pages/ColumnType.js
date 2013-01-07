var grid_columntypes = '';
var grid_columnsubtypes = '';
var datamodule_columntype = '';
var dialog_type = '';
var selectedtype = {};
var selectedsubtype = {};
/*
* Konstruktor
*/
function InitForm() {
    SetBaseToControls();
    /**/
    dialog_type = new DQ.DialogWindow();
    grid_columntypes = new DQ.Grid();
    grid_columntypes.Init($('#placeholderColumnType'), $("#placeholderColumnTypeRows"), $("#rowTemplateType"), gridColumnTypeFunctionCallback);
    grid_columnsubtypes = new DQ.Grid();
    grid_columnsubtypes.Init($('#placeholderColumnSubType'), $("#placeholderColumnSubTypeRows"), $("#rowTemplateSubType"), gridColumnSubTypeFunctionCallback);

    $('#btnNewColumnType').click(function () {
        NewType();
    });
    $('#btnNewColumnSubType').click(function () {
        NewSubType();
    });
    /**/
    GetType();
}
/*
* Get column types
*/
function GetType() {
    datamodule_columntype = new DQ.ColumnType();
    datamodule_columntype.GetColumType(CallBack_ShowColumType);
}
/*
* Get column types callback
*/
function CallBack_ShowColumType(data) {
    grid_columntypes.SetDatasource(data);
}
/*
* Refresd type grid
*/
function CallBack_RefreshTypeGrid() {
    datamodule_columntype.GetColumType(CallBack_ShowColumType);
}
/*
* Refresd subtype grid
*/
function CallBack_RefreshSubTypeGrid() {
    datamodule_columntype.GetColumSubType(selectedtype.Id, CallBack_ShowColumSubType);
}
/*
* Get column subtypes callback
*/
function CallBack_ShowColumSubType(data) {
    grid_columnsubtypes.SetDatasource(data);
}
/*
* New type
*/
function NewType() {
    $('#divColumnSubType').css("visibility", "hidden");
    selectedtype = {
        Id : -1,
        Name : ''
    };
    dialog_type.ShowDialog("Oszlop típus", selectedtype, "dialogTypeTemplate", dialogTypeCallback);
}
/*
* New sub type
*/
function NewSubType() {
    selectedsubtype = {
        Id: -1,
        Name: ''
    };
    dialog_type.ShowDialog("Oszlop altípus", selectedsubtype, "dialogSubTypeTemplate", dialogSubTypeCallback);
}
/*
* Set default values of controls and variables
*/
function SetBaseToControls() {
    $.Utils.hideInfo();
    selectedtype = {};
    selectedsubtype = {};
}
/*
* Show subtype div
*/
function ShowSubType() {
    $('#divColumnSubType').css("visibility", "visible");
    CallBack_RefreshSubTypeGrid();
}
/*
* Events from type grid
*/
function gridColumnTypeFunctionCallback(functionname, data) {
    switch (functionname) {
        case 'selecttype':
            selectedtype = data;
            ShowSubType();
            break;
        case 'updatetype':
            selectedtype = data;
            dialog_type.ShowDialog("Oszlop típus", data, "dialogTypeTemplate", dialogTypeCallback);
            break;
        case 'inactivetype':
            datamodule_columntype.SetTypeStatus(data.Id, CallBack_RefreshTypeGrid);
            break;
        case 'activetype':
            datamodule_columntype.SetTypeStatus(data.Id, CallBack_RefreshTypeGrid);
            break;
        default:
    }
}
/*
* Events from subtype grid
*/
function gridColumnSubTypeFunctionCallback(functionname, data) {
    switch (functionname) {
        case 'updatesubtype':
            selectedtype = data;
            dialog_type.ShowDialog("Oszlop altípus", selectedtype, "dialogSubTypeTemplate", dialogSubTypeCallback);
            break;
        case 'inactivesubtype':
            datamodule_columntype.SetSubTypeStatus(data.Id, CallBack_RefreshSubTypeGrid);
            break;
        case 'activesubtype':
            datamodule_columntype.SetSubTypeStatus(data.Id, CallBack_RefreshSubTypeGrid);
            break;
        default:
    }
}

/*
* Events from type dialog
*/
function dialogTypeCallback(functionname) {
    switch (functionname) {
        case 'save':
            if ($('#dialogTypeName').val() != '') {
                selectedtype["Name"] = $('#dialogTypeName').val();
                datamodule_columntype.SaveType(selectedtype, CallBack_RefreshTypeGrid);
            }
            break;
        case 'cancel':
            /* Nothing */
            break;
    }
    SetBaseToControls();
}
/*
* Events from subtype dialog
*/
function dialogSubTypeCallback(functionname) {
    switch (functionname) {
        case 'save':
            if ($('#dialogSubTypeName').val() != '') {
                selectedsubtype["Name"] = $('#dialogSubTypeName').val();
                datamodule_columntype.SaveSubType(selectedtype.Id, selectedsubtype, CallBack_RefreshSubTypeGrid);
            }
            break;
        case 'cancel':
            /* Nothing */
            break;
    }
}