var selectedColumn = {};
var grid_column = '';
var datamodule_columntype = '';
var datamodule_tableandcolumn = '';
var datamodule_dialogtableandcolumn = '';
var datamodule_querybuilder = '';
var datamodule_sql = '';
var dropdown_table = '';
var dropdown_dialogtable = '';
var dropdown_dialogcolumn = '';
var dropdown_type = '';
var dropdown_subtype = '';
var dropdown_sql = '';
var dialog_column = '';
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

    datamodule_querybuilder = new DQ.QueryBuilder();

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
        $('#dialogSQL').val($('#builderSQL').val() + ' AS ' + setSql());
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
                RefreshCalculatedColumn(null);
                if (Validate()) {
                    if (selectedColumn.Id == -1) {
                        datamodule_tableandcolumn.NewColumn(selectedColumn, Callback_SuccessSave);
                    } else {
                        datamodule_tableandcolumn.UpdateColumn(selectedColumn, Callback_SuccessSave);
                    }
                }
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
    $.Utils.hideInfo();
    SetBaseToControls();
    selectedColumn = {
        Id: -1,
        Name: '',
        Description: '',
        Type: -1,
        SubType: -1,
        CalculatedField: true,
        UsedTablesAndColumns: [],
        Active: true,
        TableId: -1,
        Sql: '',
        SqlName: '',
        GroupBy: false
    };
    $('#ccdialog').dialog('open');
}
/*
* Refresh dto
*/
function RefreshCalculatedColumn(data) {
    // Check that should to groupby because of expression
    var sname = setSql();
    var g = false;
    var s = $('#builderSQL').val();
    //var u = [];
    var f = datamodule_sql.GetSqlFunctionToGroupBy();
    if (data == null) {
        /*$.each(calculatedSQLTables, function(key, element) {
            u.push({
                Table: element.Table,
                Column: element.Column,
                TableId: element.TableId,
                ColumnId: element.ColumnId
            });
        });*/
        if (s != '') {
            for (var i = 0; i < f.length; i++) {
                if (s.split(f[i].Name).length - 1 > 0)
                    g = true;
                break;
            }
        }
        selectedColumn["Name"] = $('#dialogName').val();
        selectedColumn["Description"] = $('#dialogDescription').val();
        selectedColumn["Type"] = dropdown_type.GetValue();
        selectedColumn["SubType"] = dropdown_subtype.GetValue();
        selectedColumn["CalculatedField"] = true;
        //selectedColumn["UsedTablesAndColumns"] = u;
        selectedColumn["Active"] = true;
        selectedColumn["TableId"] = dropdown_table.GetValue();
        selectedColumn["Sql"] = s;
        selectedColumn["SqlName"] = sname;
        selectedColumn["GroupBy"] = g;
    }
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
    if (selectedColumn != null && selectedColumn != '' && selectedColumn.SubType != -1) {
        dropdown_subtype.SetSelectedValue(selectedColumn.SubType);
    }
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
*
*/
function Callback_SuccessSave(data) {
    $.Utils.showSuccess('Sikeres mentés');
    $('#ccdialog').dialog('close');
    CallBack_GetColumns(null);
}
/*
* Set default values of controls and variables
*/
function SetBaseToControls() {
    selectedColumn = {};
    $('#dialogName').val('');
    $('#dialogDescription').val('');
    $('#dialogSQL').val('');
    if(dropdown_type != '') dropdown_type.SetIndex(-1);
    if (dropdown_subtype != '') dropdown_subtype.SetIndex(-1);
    if (dropdown_dialogtable != '') dropdown_dialogtable.SetIndex(-1);
    if (dropdown_dialogcolumn != '') dropdown_dialogcolumn.SetIndex(-1);
    if (dropdown_sql != '') dropdown_sql.SetIndex(-1);
    $('#builderSQLName').val('');
    $('#builderSQL').val('');
    $('#warning').html('');
}
/*
* Events from type grid
*/
function gridColumnCallback(functionname, data) {
    SetBaseToControls();
    $.Utils.hideInfo();
    switch (functionname) {
        case 'inactive':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'active':
            datamodule_tableandcolumn.SetStatus(data.Id, CallBack_GetColumns);
            break;
        case 'update':
            selectedColumn = data;
            //calculatedSQLTables = data.UsedTablesAndColumns;
            $('#dialogName').val(selectedColumn.Name);
            $('#dialogDescription').val(selectedColumn.Description);
            $('#dialogSQL').val(selectedColumn.Sql + ' AS ' + selectedColumn.SqlName);
            dropdown_type.SetSelectedValue(selectedColumn.Type);

            $('#builderSQL').val(selectedColumn.Sql);
            $('#builderSQLName').val(selectedColumn.SqlName);
            $('#ccdialog').dialog('open');
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

function setSql() {
    var sqlname = '';
    if ($('#builderSQLName').val() != '') {
        sqlname = $('#builderSQLName').val();
    } else {
        $.each(selectedColumn.UsedTablesAndColumns, function (key, element) {
            sqlname += element.Table + element.Column;
        });
    }
    return sqlname;
}
/*
* Querybuilder callback
*/
function Callback_QueryBuilder(data) {
    var warning = '';
    if(data == null || data.length == 0) {
        $('#warning').html('');
    } else {
        $('#warning').html('');
        warning = 'A következő tábla(k) között nincs kapcsolat: ';
        $.each(data, function (key, element) {
            warning += element + '<br />';
        });
        $('#warning').html(warning);
    }
}
/*
* Change event 'builderSQLOperator' dropdown on dialog
*/
function Event_ChangeSQLOperator(data) {
    $('#builderInfo').html('');
    $('#builderSQL').val($('#builderSQL').val().trim());
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
                    text = [actualText.slice(0, range.start), selectedSqlFunction.ReplaceText.replace('{0}', dropdown_dialogtable.GetText() + '.' + dropdown_dialogcolumn.GetText()), actualText.slice(range.start)].join('');
                } else {
                    text = [actualText.slice(0, range.start), selectedSqlFunction.ReplaceText.replace('{0}', actualText.substring(range.start, range.end)), actualText.slice(range.end)].join('');
                }
                
                if(dropdown_dialogcolumn.GetValue() != -1) {
                    var count = 1;
                    found = false;
                    for (i = 0; i < selectedColumn.UsedTablesAndColumns.length; i++) {
                        if(selectedColumn.UsedTablesAndColumns[i].TableName == dropdown_dialogtable.GetText()
                            &&
                           selectedColumn.UsedTablesAndColumns[i].ColumnName == dropdown_dialogcolumn.GetText()) {
                            count++;
                            found = true;
                        }
                    }
                    if (!found) {
                        selectedColumn.UsedTablesAndColumns.push({
                            TableName: dropdown_dialogtable.GetText(),
                            ColumnName: dropdown_dialogcolumn.GetText(),
                            TableId: dropdown_dialogtable.GetValue(),
                            ColumnId: dropdown_dialogcolumn.GetValue(),
                            Count: count
                        });
                    }
                }
            }
        } else {
            text = [actualText.slice(0, range.start), '', actualText.slice(range.end)].join('');

            for (i = 0; i < selectedColumn.UsedTablesAndColumns.length; i++) {
                selectedColumn.UsedTablesAndColumns[0].Count = text.split(selectedColumn.UsedTablesAndColumns[0].TableName + "." + selectedColumn.UsedTablesAndColumns[0].ColumnName).length - 1;
            }
            selectedColumn.UsedTablesAndColumns = selectedColumn.UsedTablesAndColumns.filter(function (element) {
                return element.Count > 0;
            });
        }

        if (selectedColumn.UsedTablesAndColumns.length == 0) {
            $('#warning').html('');
            $('#warning').html('Nem szerepel mező a kifejezésben.');
        } else if (selectedColumn.UsedTablesAndColumns.length > 1) {
            var t = [];
            $.each(selectedColumn.UsedTablesAndColumns, function (key, element) {
                t.push(element.TableName);
            });
            datamodule_querybuilder.HasConnectionBetweenTables(t, Callback_QueryBuilder);
        }
        $('#builderSQL').val(text);
        dropdown_dialogcolumn.SetIndex(-1);
        dropdown_sql.SetIndex(-1);
    }
}