/**/
var datamoduleQuery = '';
var datamoduleTable = '';
var datamoduleType = '';
var selectedColumn = '';
/**/
var dropdown_Table = '';
var dropdown_ColumnType = '';
var dropdown_ColumnSubType = '';
var grid_SavedQueries = '';
var grid_SavedColumns = '';
var grid_Columns = '';
/**/
var actualQuery = {};
var sqlfilter = {};
/*
* Konstruktor
*/
function InitForm() {
    InitDialogAndButtons();
    SetControlsToBase();

    grid_SavedQueries = new DQ.Grid();
    grid_SavedQueries.Init($('#placeholderQuery'), $("#queryRowPlaceholder"), $("#queryRowTemplate"), gridSavedQueriesGridFunction);

    grid_Columns = new DQ.Grid();
    grid_Columns.Init($('#placeholderColumns'), $("#columnRowPlaceholder"), $("#columnRowTemplate"), gridColumnsFunction);

    grid_SavedColumns = new DQ.Grid();
    grid_SavedColumns.Init($('#placeholderColumns0'), $("#columnRowPlaceholder0"), $("#columnRowTemplate0"), gridSavedColumnsFunction);


    dropdown_Table = new DQ.DropDown($('#Table'), 'Id', 'Name');
    dropdown_ColumnType = new DQ.DropDown($('#ColumnType'), 'Id', 'Name');
    dropdown_ColumnSubType = new DQ.DropDown($('#ColumnSubType'), 'Id', 'Name');

    datamoduleQuery = new DQ.Query();
    datamoduleQuery.GetQueries(Callback_QueryGetQueries);

    datamoduleTable = new DQ.TableAndColumn();
    datamoduleTable.GetTables(Callback_QueryGetTable);

    datamoduleType = new DQ.ColumnType();
    datamoduleType.GetColumType(Callback_QueryGetType);


}
/****************************************************************************************************************************************************/
/*
* Get tables
*/
function Callback_QueryGetTable(data) {
    dropdown_Table.Init(data);
    dropdown_Table.OnChange(Event_ChangeTable);
}
/*
* Select table event
*/
function Event_ChangeTable(data) {
    if (dropdown_type != '') dropdown_type.SetSelectedValue(-1);
    datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
}
/*
* Get columns's types
*/
function Callback_QueryGetType(data) {
    dropdown_ColumnType.Init(data);
    dropdown_ColumnType.OnChange(Event_ChangeColumnType);
}
/*
* Select type event
* - load subtypes
* - filter columns
*/
function Event_ChangeColumnType(data) {
    datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
    datamoduleType.GetColumSubType(data, Callback_QueryGetSubType);
}
/*
* Get columns's subtypes
*/
function Callback_QueryGetSubType(data) {
    dropdown_ColumnSubType.Init(data);
    dropdown_ColumnSubType.OnChange(Event_ChangeColumnSubType);
}
/*
* Select subtype event
* - filter columns
*/
function Event_ChangeColumnSubType(data) {
    datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
}
/*
* Load query
*/
function Callback_QueryGetQueries(data) {
    grid_SavedQueries.SetDatasource(data);
}
/*
* Success query save
*/
function Callback_SuccessSave() {
    $.Utils.showSuccess("Sikeres mentés!");
}
/*
* Load selected query
*/
function Callback_LoadSelectedQuery(data) {
    SetBO(data);
    SetControlsToBase();
    /*grid_SavedColumns.SetDatasource(actualQuery.Columns.filter(function (element) {
        return element.IsSelected || element.IsOrderBy || element.IsWhere;
    }));*/
    $(".buttonNext").click();
}
/*
* Reload queries
*/
function Callback_ReloadQueries(data) {
    SetControlsToBase();
    datamoduleQuery.GetQueries(Callback_QueryGetQueries);
}
/****************************************************************************************************************************************************/
function gridSavedQueriesGridFunction(functionName, columnData) {
    $.Utils.hideInfo();
    $.Utils.logToConsole("Call " + functionName + " method", "Id: " + columnData.Id + " Name: " + columnData.Name);
    switch (functionName) {
        case 'inactive':
            datamoduleQuery.SetStatus(columnData.Id, Callback_ReloadQueries);
            break;
        case 'active':
            datamoduleQuery.SetStatus(columnData.Id, Callback_ReloadQueries);
            break;
        case 'load':
            datamoduleQuery.GetQuery(columnData.Id, Callback_LoadSelectedQuery);
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }
}
/****************************************************************************************************************************************************/
function gridColumnsFunction(functionName, columnData) {
    selectedColumn = columnData;
    $.Utils.hideInfo();
    $.Utils.logToConsole("Call " + functionName + " method", "Id: " + columnData.Id + " Name: " + columnData.ColumnName);
    var ac = null;
    switch (functionName) {
        case 'addcolumn':
            if (columnData.Calculated) {
                ac = actualQuery.CalculatedColumns.filter(function (element) { return element.ColumnId == selectedColumn.Id && element.Calculated == columnData.Calculated; });
                if (ac.length > 0) {
                    ac[0].IsSelected = true;
                } else {
                    actualQuery.CalculatedColumns.push({
                        Id: columnData.Id,
                        TableId: dropdown_Table.GetValue(),
                        TableName: dropdown_Table.GetText(),
                        ColumnId: columnData.Id,
                        ColumnName: columnData.ColumnName,
                        Description: columnData.Description,
                        ColumnSqlName: columnData.ColumnSqlName + ' AS \'' + columnData.ColumnName + '\'',
                        Calculated: columnData.Calculated,
                        IsSelected: true,
                        IsWhere: columnData.IsWhere,
                        IsOrderBy: columnData.IsOrderBy,
                        Direction: columnData.Direction,
                        Position: 0,
                        GroupBy: columnData.GroupBy,
                        Information: columnData.Information,
                        Active: columnData.Active
                    });
                }
            } else {
                ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id && element.Calculated == columnData.Calculated; });
                if (ac.length > 0) {
                    ac[0].IsSelected = true;
                } else {
                    actualQuery.Columns.push({
                        Id: columnData.Id,
                        TableId: dropdown_Table.GetValue(),
                        TableName: dropdown_Table.GetText(),
                        ColumnId: columnData.Id,
                        ColumnName: columnData.ColumnName,
                        Description: columnData.Description,
                        ColumnSqlName: '[' + dropdown_Table.GetText() + '].[' + columnData.ColumnName + '] AS \'' + columnData.ColumnName + '\'',
                        Calculated: columnData.Calculated,
                        IsSelected: true,
                        IsWhere: columnData.IsWhere,
                        IsOrderBy: columnData.IsOrderBy,
                        Direction: columnData.Direction,
                        Position: 0,
                        GroupBy: columnData.GroupBy,
                        Information: columnData.Information,
                        Active: columnData.Active
                    });
                }
            }
            datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
            break;
        case 'removecolumn':
            if (columnData.Calculated) {
                ac = actualQuery.CalculatedColumns.filter(function (element) { return element.ColumnId == columnData.Id; });
                if (ac.length > 0) {
                    ac[0].IsSelected = false;
                }
            } else {
                ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == columnData.Id; });
                if (ac.length > 0) {
                    ac[0].IsSelected = false;
                }
            }
            datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
            break;
        case 'addorderby':
            ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id; });
            if (ac.length > 0) {
                $('#OrderByDirection').val(selectedColumn.Direction);
            } else {
                $('#OrderByDirection').val(-1);
            }
            $('#dialogOrderBy').dialog('open');
            break;
        case 'removeorderby':
            ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id; });
            if (ac.length > 0) {
                ac[0].IsOrderBy = false;
                ac[0].Direction = null;
                ac[0].Position = 0;
                datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
            }
            break;
        case 'where':
            $('#dialogWhere').dialog('open');
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }

}
function gridSavedColumnsFunction(functionname, columnData) {
    var ac = null;
    switch (functionname) {
        case 'removecolumn':
            if (columnData.Calculated) {
                ac = actualQuery.CalculatedColumns.filter(function (element) { return element.ColumnId == columnData.Id; });
                if (ac.length > 0) {
                    ac[0].IsSelected = false;
                }
            } else {
                ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == columnData.Id; });
                if (ac.length > 0) {
                    ac[0].IsSelected = false;
                }
            }
            grid_SavedQueries.SetDatasource(actualQuery.Columns.filter(function (element) {
                return element.IsSelected || element.IsOrderBy || element.IsWhere;
            }));

            break;
        case 'removeorderby':
            if (columnData.Calculated) {
                ac = actualQuery.CalculatedColumns.filter(function (element) { return element.ColumnId == columnData.Id; });
            } else {
                ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == columnData.Id; });
            }
            if (ac.length > 0) {
                ac[0].IsOrderBy = false;
                ac[0].Direction = null;
                ac[0].Position = 0;
            }
            grid_SavedQueries.SetDatasource(actualQuery.Columns.filter(function (element) {
                return element.IsSelected || element.IsOrderBy || element.IsWhere;
            }));
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }
}

/****************************************************************************************************************************************************/
/*
* Load columns and calculated columns too
*/
function Callback_ShowColumns(data) {
    if(data != null) {
        var columnInformation = '';
        var columns = [];
        var orderBy = false;
        var selected = false;
        
        // base columns of table
        $.each(data.Columns, function (index, columnProperty) {

            columnInformation = columnProperty.ColumnType;
            columnInformation += '(' + columnProperty.Length;
            if (columnProperty.DecimalLength != 0) {
                columnInformation += ',' + columnProperty.DecimalLength;
            }
            columnInformation += ')';

            // Check that column is already added to the query
            var e = actualQuery.Columns.filter(function (element) {
                return element.ColumnId == columnProperty.Id;
            });
            orderBy = false;
            selected = false;
            if (e.length > 0) {
                if (e[0].IsSelected == true) {
                    selected = e[0].IsSelected;
                }
                if (e[0].IsOrderBy == true) {
                    orderBy = true;
                }
            }
            columns.push({
                Id: columnProperty.Id,
                TableId: dropdown_Table.GetValue(),
                TableName: dropdown_Table.GetText(),
                ColumnId: columnProperty.Id,
                ColumnName: columnProperty.Name,
                Description: columnProperty.Description,
                ColumnSqlName: '[' + dropdown_Table.GetText() + '].[' + columnProperty.Name + '] AS  \'' + columnProperty.Name + '\'',
                Calculated: false,
                IsSelected: selected,
                IsWhere: columnProperty.IsWhere,
                IsOrderBy: orderBy,
                Direction: columnProperty.Direction,
                Position: 0,
                GroupBy: false,
                Information: columnInformation,
                Active: columnProperty.Active
            });
        });

        // calculated columns of table
        $.each(data.CalculatedColumns, function (index, columnProperty) {

            columnInformation = '';
            if (columnProperty.GroupBy) {
                columnInformation = '(GroupBy)';
            }

            // Check that column is already added to the query
            var e = actualQuery.CalculatedColumns.filter(function (element) {
                return element.ColumnId == columnProperty.Id;
            });
            selected = false;
            if (e.length > 0) {
                if (e[0].IsSelected == true) {
                    selected = e[0].IsSelected;
                }
            }
            columns.push({
                Id: columnProperty.Id,
                TableId: dropdown_Table.GetValue(),
                TableName: dropdown_Table.GetText(),
                ColumnId: columnProperty.Id,
                ColumnName: columnProperty.Name,
                Description: columnProperty.Description,
                ColumnSqlName: columnProperty.Sql,
                Calculated: true,
                IsSelected: selected,
                IsWhere: false,
                IsOrderBy: false,
                Direction: null,
                Position: 0,
                GroupBy: columnProperty.GroupBy,
                Information: columnInformation,
                Active: columnProperty.Active
            });
        });
        grid_Columns.SetDatasource(columns);
    }
}
/****************************************************************************************************************************************************/
function InitDialogAndButtons() {
    $('#wizard').smartWizard({
        transitionEffect: 'slideleft',
        onLeaveStep: LeaveAStepCallback,
        onShowStep: OnShowStepCallback,
        enableFinishButton: false
    });    
    $(".buttonPrevious").text('Előző');
    $(".buttonNext").text('Következő');
    /* New query button */
    $('#btnNewQuery').click(function (e) {
        $.Utils.hideInfo();
        SetControlsToBase();
        SetBO(null);
        $(".buttonNext").click();

        $('#QueryName').val('test');
        $('#QueryDescription').val('testdesc');

        e.preventDefault();
    });
    $('#btnSaveQuery').click(function (e) {
        e.preventDefault();
        // Adat szinkronizáció
        RefreshDTO();
        if (actualQuery.Id == -1) {
            datamoduleQuery.NewQuery(actualQuery, Callback_SuccessSave);
        } else {
            datamoduleQuery.UpdateQuery(actualQuery, Callback_SuccessSave);
        }
    });

    $('#btnDynamicWhere').click(function (e) {
        e.preventDefault();

        sqlfilter.toUserFriendlyString();
        // already selected columns, from another tables
        if (sqlfilter.selectedColumns.length > 0) {
            $.each(sqlfilter.selectedColumns, function (index, element) {
                sqlfilter.columns.push({
                    "index": element.id,
                    "name": element.name,
                    "isDynamic": element.isDynamic
                });
            });
        }

        sqlfilter.reDrawToValues();

        $('#dialogWhere').dialog('open');
    });


    $('#dialogWhereValues').dialog({
        autoOpen: false,
        width: 400,
        position: 'center',
        buttons: {
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });


    $('#btnWhere').click(function () {
        if (dropdown_Table.GetValue() != -1) {
            sqlfilter.columns = [];
            // base option value
            sqlfilter.columns.push({
                "name": 'Válassz...',
                "index": -1,
                "table": dropdown_Table.GetText(),
                "tableId": dropdown_Table.GetValue(),
                "isDynamic": false
            });
            // actual table data
            var dataSource = grid_Columns.GetDatasource().filter(function (element) {
                return !element.Calculated;
            });
            // already selected columns, from another tables
            if (sqlfilter.selectedColumns.length > 0) {
                $.each(sqlfilter.selectedColumns, function (index, element) {
                    if (sqlfilter.selectedColumns[index].name.indexOf('[' + dropdown_Table.GetText() + ']', 0)) {
                        sqlfilter.columns.push({
                            "index": element.id,
                            "name": element.name,
                            "isDynamic": element.isDynamic
                        });
                    }
                });
            }
            // selected table's columns
            $.each(dataSource, function (index, element) {
                if (!element.Calculated) {
                    sqlfilter.columns.push({
                        "name": "[" + element.TableName + "].[" + element.ColumnName + "]",
                        "index": element.Id,
                        "isDynamic": false
                    });
                }
            });
            

            sqlfilter.reDraw();

            $('#dialogWhere').dialog('open');
        }
    });
    /* Order By */
    $('#dialogOrderBy').dialog({
        autoOpen: false,
        width: 400,
        position: 'center',
        buttons: {
            "Ment": function () {
                var oc = null;
                if (selectedColumn.Calculated) {
                    oc = actualQuery.CalculatedColumns.filter(function (element) { return element.ColumnId == selectedColumn.Id; });
                    if (oc.length > 0) {
                        oc[0].IsOrderBy = true;
                        oc[0].Direction = $('#OrderByDirection').val();
                        oc[0].Position = null;
                    } else {
                        actualQuery.CalculatedColumns.push({
                            Id: selectedColumn.Id,
                            TableId: dropdown_Table.GetValue(),
                            TableName: dropdown_Table.GetText(),
                            ColumnId: selectedColumn.ColumnId,
                            ColumnName: selectedColumn.ColumnName,
                            Description: selectedColumn.Description,
                            ColumnSqlName: '[' + dropdown_Table.GetText() + '].[' + selectedColumn.ColumnName + '] AS  \'' + selectedColumn.ColumnName + '\'',
                            Calculated: selectedColumn.Calculated,
                            IsSelected: false,
                            IsWhere: false,
                            IsOrderBy: true,
                            Direction: $('#OrderByDirection').val(),
                            Position: 0,
                            GroupBy: false,
                            Information: selectedColumn.Information,
                            Active: selectedColumn.Active
                        });
                    }

                } else {
                    oc = actualQuery.Columns.filter(function(element) { return element.ColumnId == selectedColumn.Id; });
                    if (oc.length > 0) {
                        oc[0].IsOrderBy = true;
                        oc[0].Direction = $('#OrderByDirection').val();
                        oc[0].Position = null;
                    } else {
                        actualQuery.Columns.push({
                            Id: selectedColumn.Id,
                            TableId: dropdown_Table.GetValue(),
                            TableName: dropdown_Table.GetText(),
                            ColumnId: selectedColumn.ColumnId,
                            ColumnName: selectedColumn.ColumnName,
                            Description: selectedColumn.Description,
                            ColumnSqlName: '[' + dropdown_Table.GetText() + '].[' + selectedColumn.ColumnName + '] AS \'' + selectedColumn.ColumnName + '\'',
                            Calculated: selectedColumn.Calculated,
                            IsSelected: false,
                            IsWhere: false,
                            IsOrderBy: true,
                            Direction: $('#OrderByDirection').val(),
                            Position: 0,
                            GroupBy: selectedColumn.GroupBy,
                            Information: selectedColumn.Information,
                            Active: selectedColumn.Active
                        });
                    }
                }
                $(this).dialog("close");
                datamoduleTable.GetColumns(Callback_ShowColumns, dropdown_Table.GetValue(), dropdown_ColumnType.GetValue(), dropdown_ColumnSubType.GetValue());
            },
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });
    /* Where */
    $('#dialogWhere').dialog({
        autoOpen: false,
        minWidth: 700,
        minHeight: 400,
        buttons: {
            "Ment": function () {
                sqlfilter.toUserFriendlyString();
                $.each(actualQuery.Columns, function (index, selectedColumn) {
                    if (selectedColumn.IsWhere) {
                        selectedColumn.IsWhere = false;
                    }
                });
                $.each(sqlfilter.selectedColumns, function (index, selectedColumn) {
                    var column = actualQuery.Columns.filter(function (ac) {
                        return ac.Id == selectedColumn.id;
                    });
                    if (column.length > 0) {
                        column[0].IsWhere = true;
                    } else {
                        var gridColum = grid_Columns.GetDatasource().filter(function (c) {
                            return c.Id == selectedColumn.id;
                        });
                        if (gridColum.length > 0) {
                            actualQuery.Columns.push({
                                Id: gridColum[0].Id,
                                TableId: dropdown_Table.GetValue(),
                                TableName: dropdown_Table.GetText(),
                                ColumnId: gridColum[0].ColumnId,
                                ColumnName: gridColum[0].ColumnName,
                                Description: selectedColumn.Description,
                                ColumnSqlName: '[' + dropdown_Table.GetText() + '].[' + gridColum[0].ColumnName + '] AS \'' + gridColum[0].ColumnName + '\'',
                                Calculated: false,
                                IsSelected: false,
                                IsWhere: true,
                                IsOrderBy: false,
                                Direction: null,
                                Position: 0,
                                GroupBy: false,
                                Information: gridColum[0].Information,
                                Active: gridColum[0].Active
                            });
                        }
                    }
                });
                actualQuery.WhereStatement = JSON.stringify(sqlfilter.filter);
                actualQuery.WhereStatementObject = sqlfilter.filter;
                $(this).dialog("close");
            },
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });
}
function RefreshDTO() {
    actualQuery.Name = $('#QueryName').val();
    actualQuery.Description = $('#QueryDescription').val();
    actualQuery.Columns = actualQuery.Columns.filter(function(element) {
        return element.IsSelected == true || element.IsOrderBy == true || element.IsWhere == true;
    });
    actualQuery.CalculatedColumns = actualQuery.CalculatedColumns.filter(function (element) {
        return element.IsSelected == true || element.IsOrderBy == true || element.IsWhere == true;
    });
}
/*
* Set controls to base state
*/
function SetControlsToBase() {
    $('#QueryName').val(actualQuery.Name);
    $('#QueryDescription').val(actualQuery.Description);
    $('#QueryDataResult').html('');
    if (dropdown_Table != '') dropdown_Table.SetIndex(-1);
    if (dropdown_ColumnType != '') dropdown_ColumnType.SetIndex(-1);
    if (dropdown_ColumnSubType != '') dropdown_ColumnSubType.SetIndex(-1);
}
/*
* Set page business object
*/
function SetBO(data) {
    if (data == null) {
        actualQuery = {
            Id: -1,
            Name: '',
            Description: '',
            WhereStatementObject: '',
            WhereStatement: '',
            SelectStatement: '',
            Columns: [],
            CalculatedColumns: []
        };
        // ReSharper disable InconsistentNaming
        sqlfilter = new xFilter(document.getElementById("filters"),
        // ReSharper restore InconsistentNaming
                    {
                        filter: null,
                        columns: []
                    });

    } else {
        actualQuery = {
            Id: data.Id,
            Name: data.Name,
            Description: data.Description,
            WhereStatementObject: jQuery.parseJSON(data.WhereStatement),
            WhereStatement: data.WhereStatement,
            SelectStatement: '',
            Columns: data.Columns,
            CalculatedColumns: data.CalculatedColumns
        };
        if (data.WhereStatement != '' && data.WhereStatement != null) {
            // ReSharper disable InconsistentNaming
            sqlfilter = new xFilter(document.getElementById("filters"),
            // ReSharper restore InconsistentNaming
                    {
                    filter: actualQuery.WhereStatementObject,
                    columns: []
                });
            sqlfilter.toUserFriendlyString();
        }
    }

}
/*
* Event from wizard control when step to next or previous page
*/
function LeaveAStepCallback(obj) {
    $.Utils.hideInfo();
    var stepNum = obj.attr('rel');
    return ValidateSteps(stepNum);
}
/*
* Validate wizard steps
*/
function ValidateSteps(step) {
    var isStepValid = true;
    if (step == 1) {
        if (jQuery.isEmptyObject(actualQuery)) {
            isStepValid = false;
            $.Utils.showError('Válassz egy meglévő lekérdezést vagy készíts egy újat.');
        }
    }
    else if (step == 2) {
        if ($('#QueryName').val() == '') {
            isStepValid = false;
            $.Utils.showError('Név nem lehet üres.');
        }
        else if ($('#QueryDescription').val() == '') {
            isStepValid = false;
            $.Utils.showError('Leírás nem lehet üres.');
        }
    }
    return isStepValid;
}
/*
* Event from wizard control
*/
function OnShowStepCallback(obj) {
    if (stepNum == 5) {
        var html = '<b>Lekérdezés neve :</b> {0}<br />' +
                    '<b>Lekérdezés leírása :</b> {1}<br />' +
                    '<br />' +
                    '<br />' +
                    '<b>Lekérdezés :</b>' +
                    '<br />' +
                    '{2}'
                    ;
        $('#queryDataResult').html('');
        $('#queryDataResult').html('Lekérdezés adatainak generálása...');
        $.ajax({
            type: "POST",
            url: "Services/Query.asmx/GenerateQuery",
            data: JSON.stringify({ 'query': actualQuery, 'where' : sqlfilter.toUserFriendlyString()}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (function (data, status) {
                actualQuery.SelectStatement = data.d[0];
                if (data.d.length == 1) {
                    $('#queryDataResult').html(
                        html.toString()
                            .replace('{0}', $('#QueryName').val())
                            .replace('{1}', $('#QueryDescription').val())
                            .replace('{2}', data.d));
                } else {
                    html += '<br /><b style=\'color:red;\'>FIGYELMEZTETÉS<b><br />{3}';
                    $('#queryDataResult').html(
                        html.toString()
                            .replace('{0}', $('#QueryName').val())
                            .replace('{1}', $('#QueryDescription').val())
                            .replace('{2}', data.d[0])
                            .replace('{3}', data.d[1]));
                }
            }),
            error: (function (response, status, error) {
                $.Utils.showError(response.statusText);
            })
        });        
    }
}