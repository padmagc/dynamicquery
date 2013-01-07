var selectedColumn = {};
var grid_column = '';
var datamodule_columntype = '';
var datamodule_tableandcolumn = '';
var dialog_column = '';
var dropdown_table = '';
var dropdown_type = '';
var dropdown_subtype = '';
/*
* Konstruktor
*/
function InitForm() {
    SetBaseToControls();
    /**/
    dropdown_table = new DQ.DropDown($('#Table'), "Id", "Name");
    dropdown_table.OnChange(CallBack_GetColumns);
    /**/
    datamodule_columntype = new DQ.ColumnType();

    grid_column = new DQ.Grid();
    grid_column.Init($('#placeholderColumn'), $("#rowPlaceholder"), $("#rowTemplate"), gridColumnCallback);
    /**/
    dialog_column = new DQ.DialogWindow();
    /**/
    GetTables();
}
/*
* Get tables
*/
function GetTables() {
    datamodule_tableandcolumn = new DQ.TableAndColumn();
    datamodule_tableandcolumn.GetTables(CallBack_GetTables);
}
/*
* Select table from ddl
*/
function CallBack_GetColumns(data) {
    datamodule_tableandcolumn.GetColumns(Callback_ShowColumns, dropdown_table.GetValue(), -1, -1);
}
/*
* Show columns
*/
function Callback_ShowColumns(data) {
    if (data != null) {
        grid_column.SetDatasource(data.Columns);
    }
}
/*
* Get tables callback
*/
function CallBack_GetTables(data) {
    dropdown_table.Init(data);
}
/*
* Get column types
*/
function CallBack_GetColumnTypes(data) {
    dropdown_type.Init(data);
}
/*
* Get column subtypes
*/
function CallBack_GetSubType(typeId) {
    datamodule_columntype.GetColumSubType(typeId, CallBack_ShowColumSubType);
}
/*
* Show subtypes
*/
function CallBack_ShowColumSubType(data) {
    dropdown_subtype.Init(data);
}

/*
* Set default values of controls and variables
*/
function SetBaseToControls() {
    $.Utils.hideInfo();
    selectedColumn = {};
}
/*
* Events from type grid
*/
function gridColumnCallback(functionname, data) {
    switch (functionname) {
        case 'inactive':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'active':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'update':
            selectedColumn = data;
            dialog_column.ShowDialog("Oszlop", data, "dialogTemplate", dialogCallback);
            /* Init dialog controls */
            dropdown_type = new DQ.DropDown($('#dialogType'), "Id", "Name");
            dropdown_type.OnChange(CallBack_GetSubType);

            dropdown_subtype = new DQ.DropDown($('#dialogSubType'), "Id", "Name");
            
            datamodule_columntype.GetColumType(CallBack_GetColumnTypes);
            /* Init dialog controls */
            break; 
        default:
    }
}
/*
* Events from dialog
*/
function dialogCallback(functionname) {
    switch (functionname) {
        case 'save':
            /*if ($('#dialogTypeName').val() != '') {
                selectedtype["Name"] = $('#dialogTypeName').val();
                datamodule_columntype.SaveType(selectedtype, CallBack_RefreshTypeGrid);
            }*/
            break;
        case 'cancel':
            /* Nothing */
            break;
    }
    SetBaseToControls();
}
