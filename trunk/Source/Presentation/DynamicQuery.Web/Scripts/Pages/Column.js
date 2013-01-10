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
    dropdown_type.SetSelectedValue(selectedColumn.Type);
}
function CallBack_ChangeColumnType(id) {
    datamodule_columntype.GetColumSubType(id, CallBack_GetColumnSubType);
}
/*
* Get column subtypes
*/
function CallBack_GetColumnSubType(data) {
    dropdown_subtype.Init(data);
    if(selectedColumn.SubType != -1) {
        dropdown_subtype.SetSelectedValue(selectedColumn.SubType);
    }
}
/*
* Show subtypes
*/
function CallBack_ShowColumSubType(data) {
    dropdown_subtype.Init(data);
}
/*
* Success column update
*/
function CallBack_SuccesUpdate(data) {
    $.Utils.showSuccess('Sikeres mentés');
    CallBack_GetColumns(null);
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
    SetBaseToControls();
    switch (functionname) {
        case 'inactive':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'active':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'update':
            selectedColumn = data;
            dialog_column.ShowDialog("Oszlop adatok módosítása", data, "dialogTemplate", dialogCallback);
            /* Init dialog controls */
            dropdown_type = new DQ.DropDown($('#dialogType'), "Id", "Name");
            dropdown_type.OnChange(CallBack_ChangeColumnType);

            dropdown_subtype = new DQ.DropDown($('#dialogSubType'), "Id", "Name");
            //dropdown_type.OnChange(CallBack_GetColumnSubType);
            
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
            selectedColumn["Name"] = $('#dialogName').val();
            selectedColumn["Description"] = $('#dialogDescription').val();
            selectedColumn["Type"] = dropdown_type.GetValue();
            selectedColumn["SubType"] = dropdown_subtype.GetValue();
            datamodule_tableandcolumn.UpdateColumn(selectedColumn, CallBack_SuccesUpdate);
            break;
        case 'cancel':
            SetBaseToControls();
            /* Nothing */
            break;
    }
    //
}
/*
* Validate values before save
*/
function Validate() {
    var valid = true;
    var errorMessage = '';

    if ($('#dialogName').val() == '') {
        valid = false;
        errorMessage = 'Név nem lehet üres.';
    }
    if ($('#dialogDescription').val() == '') {
        valid = false;
        if(errorMessage.length > 0) {
            errorMessage += '<br />';
        }
        errorMessage += 'Leírás nem lehet üres.';
    }

    if (dropdown_type.GetValue() == '-1') {
        valid = false;
        if (errorMessage.length > 0) {
            errorMessage += '<br />';
        }
        errorMessage += 'Oszlop típus nem lehet üres.';
    }

    if(!valid) {
        $.Utils.showError(errorMessage);
    }
    return valid;
}