var selectedColumn = {};
var grid_column = '';
var datamodule_columntype = '';
var datamodule_tableandcolumn = '';
var datamodule_dialogtableandcolumn = '';
var datamodule_sql = '';
var dropdown_table = '';
var dropdown_dialogtable = '';
var dropdown_dialogcolumn = '';
var dropdown_type = '';
var dropdown_subtype = '';
var dropdown_sql = '';
var dialog_column = '';
var calculatedSQLTables = [];
var usedTablesAndColumns = [];
/*
* Konstruktor
*/
function InitForm() {
    SetBaseToControls();
    /**/
    dropdown_table = new DQ.DropDown($('#Table'), "Id", "Name");
    dropdown_table.OnChange(CallBack_GetColumns);

    dropdown_type = new DQ.DropDown($('#dialogType'), "Id", "Name");
    dropdown_subtype = new DQ.DropDown($('#dialogSubType'), "Id", "Name");
    dropdown_sql = new DQ.DropDown($('#builderSQLOperator'), "Name", "Description");
    dropdown_dialogtable = new DQ.DropDown($('#builderTable'), "Id", "Name");
    dropdown_dialogtable.OnChange(Event_ChangeDialogTable);
    dropdown_dialogcolumn = new DQ.DropDown($('#builderColumn'), "Id", "Name");
    /**/
    datamodule_columntype = new DQ.ColumnType();
    datamodule_columntype.GetColumType(CallBack_GetColumnType);

    datamodule_sql = new DQ.Sql();
    datamodule_sql.Init();
    dropdown_sql.Init(datamodule_sql.GetSQLFunctions());
    dropdown_sql.OnChange(Event_ChangeSQLOperator);

    /**/
    grid_column = new DQ.Grid();
    grid_column.Init($('#placeholderColumn'), $("#rowPlaceholder"), $("#rowTemplate"), gridColumnCallback);
    /**/
    InitDialog();
    GetTables();
    /**/
    $('#btnNewCalculatedColumn').click(function () {
        NewCalculatedColumn();
    });
    $('#dialogColumnData').click(function () {
        $('#dialogSQL').val($('#builderSQL').val() + ' AS ' + $('#builderSQLName').val());
    });
}
/*
* Init dialog
*/
function InitDialog() {
    // Dialog			
    $('#ccdialog').dialog({
        autoOpen: false,
        width: 400,
        buttons: {
            "Ment": function () {
                $(this).dialog("close");
            },
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#ccdialog").bind('dialogopen', function () {
        $("#accordion").accordion({
            collapsible: true,
            header: "h3",
            autoHeight: false
        });
    });

}
/*
* New calculated column
*/
function NewCalculatedColumn() {
    selectedColumn = {
        Id: -1,
        Name: '',
        Description: '',
        Type: -1,
        SubType: -1,
        CalculatedField: true,
        Tables: [],
        Active: true,
        TableId: -1,
        Sql: '',
        GroupBy: false
    };
    $('#ccdialog').dialog('open');
}
/*
* Get tables
*/
function GetTables() {
    datamodule_tableandcolumn = new DQ.CalculatedColumn();
    datamodule_tableandcolumn.GetTables(CallBack_GetTables);

    datamodule_dialogtableandcolumn = new DQ.TableAndColumn();
    datamodule_dialogtableandcolumn.GetTables(CallBack_GetDialogTables);
}
/*
* Get tables callback
*/
function CallBack_GetTables(data) {
    dropdown_table.Init(data);
}
/*
* Get dialog tables callback
*/
function CallBack_GetDialogTables(data) {
    dropdown_dialogtable.Init(data);
}
/*
* Select table from ddl
*/
function CallBack_GetColumns(data) {
    datamodule_tableandcolumn.GetCalculatedColumns(Callback_ShowColumns, dropdown_table.GetValue(), -1, -1);
}
/*
* Show columns
*/
function Callback_ShowColumns(data) {
    if (data != null) {
        grid_column.SetDatasource(data.CalculatedColumns);
        $('#btnNewCalculatedColumn').css("visibility", "visible");
    }
}
/*
* Get column types
*/
function CallBack_GetColumnType(data) {
    dropdown_type.Init(data);
    dropdown_type.OnChange(Event_ChangeColumnType);
}
/*
* Event when change column type dropdown's value
*/
function Event_ChangeColumnType(data) {
    if (dropdown_subtype != 'undefined') {
        dropdown_subtype.Clear();
    }
    datamodule_columntype.GetColumSubType(data, CallBack_GetColumnSubType);
}
/*
* Get column subtypes
*/
function CallBack_GetColumnSubType(data) {
    dropdown_subtype.Init(data);
}
/*
* Change table dropdown on dialog
*/
function Event_ChangeDialogTable(data) {
    datamodule_dialogtableandcolumn.GetColumns(CallBack_ShowDialogColumns, dropdown_dialogtable.GetValue(), -1, -1);
}
/*
* Show dialog columns
*/
function CallBack_ShowDialogColumns(data) {
    if (data != null) {
        dropdown_dialogcolumn.Init(data.Columns);
    }
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
            //datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'active':
            //datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'update':
            //selectedColumn = data;
            //dialog_column.ShowDialog("Oszlop adatok módosítása", data, "dialogTemplate", dialogCallback);
            /* Init dialog controls */
            /*dropdown_type = new DQ.DropDown($('#dialogType'), "Id", "Name");
            dropdown_type.OnChange(CallBack_GetColumnSubType);

            dropdown_subtype = new DQ.DropDown($('#dialogSubType'), "Id", "Name");

            datamodule_columntype.GetColumType(CallBack_GetColumnTypes);*/
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
            selectedColumn["Sql"] = $('#dialogDescription').val();
            selectedColumn["Type"] = dropdown_type.GetValue();
            selectedColumn["SubType"] = dropdown_subtype.GetValue();
            selectedColumn["TableId"] = dropdown_table.GetValue();
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
        if (errorMessage.length > 0) {
            errorMessage += '<br />';
        }
        errorMessage += 'Leírás nem lehet üres.';
    }

    if ($('#dialogSQL').val() == '') {
        valid = false;
        if (errorMessage.length > 0) {
            errorMessage += '<br />';
        }
        errorMessage += 'SQL mező nem lehet üres.';
    }

    if (dropdown_type.GetValue() == '-1') {
        valid = false;
        if (errorMessage.length > 0) {
            errorMessage += '<br />';
        }
        errorMessage += 'Oszlop típus nem lehet üres.';
    }

    if (!valid) {
        $.Utils.showError(errorMessage);
    }

    return valid;
}
/*
* Change event 'builderSQLOperator' dropdown on dialog
*/
function Event_ChangeSQLOperator(data) {
    var range = $('#builderSQL').getSelection();
    var text = '';
    var found = false;
    var i = 0;
    if (dropdown_dialogtable.GetValue() != -1
        &&
            (dropdown_dialogcolumn.GetValue() != -1
                ||
             (dropdown_sql.GetValue() != -1 && datamodule_sql.GetSQLFunction(dropdown_sql.GetValue()).WorkWithSelection && range.length > 0)
            )
        ) {
        var actualText = $('#builderSQL').val();
        if (dropdown_sql.GetValue() != 'REMOVE') {
            var selectedSqlFunction = datamodule_sql.GetSQLFunction(dropdown_sql.GetValue());
            if (selectedSqlFunction != null) {
                if (range.length == 0) {
                    text = [actualText.slice(0, range.start), ' ' + selectedSqlFunction.ReplaceText.replace('{0}', dropdown_dialogtable.GetText() + '.' + dropdown_dialogcolumn.GetText()), actualText.slice(range.start)].join('');
                } else {
                    text = [actualText.slice(0, range.start), ' ' + selectedSqlFunction.ReplaceText.replace('{0}', actualText.substring(range.start, range.end)), actualText.slice(range.end)].join('');
                }
                
                if(dropdown_dialogcolumn.GetValue() != -1) {
                    var count = 1;
                    for (i = 0; i < calculatedSQLTables.length; i++) {
                        if(calculatedSQLTables[i].Table == dropdown_dialogtable.GetText()
                            &&
                           calculatedSQLTables[i].Column == dropdown_dialogcolumn.GetText()) {
                            count++;
                        }
                    }
                    calculatedSQLTables.push({ Table: dropdown_dialogtable.GetText(), Column: dropdown_dialogcolumn.GetText(), Count: count });
                }
            }
        } else {
            text = [actualText.slice(0, range.start), '', actualText.slice(range.end)].join('');

            for (i = 0; i < calculatedSQLTables.length; i++) {
                calculatedSQLTables[0].Count = text.split(calculatedSQLTables[0].Table + "." + calculatedSQLTables[0].Column).length - 1;
            }
            calculatedSQLTables = calculatedSQLTables.filter(function (element) {
                return element.Count > 0;
            });
            
            if(calculatedSQLTables.length == 0) {
                // Warning
            }
        }
        $('#builderSQL').val(text);
        dropdown_dialogcolumn.SetIndex(-1);
        dropdown_sql.SetIndex(-1);
    }
}