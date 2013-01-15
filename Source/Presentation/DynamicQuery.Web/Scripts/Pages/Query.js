/**/
var datamoduleQuery = '';
var datamoduleTable = '';
var datamoduleType = '';
var ddlTable = '';
var ddlColumnType = '';
var ddlColumnSubType = '';
/**/
var gridSavedQueries = '';
var gridColumns0 = '';
var gridColumns = '';
var selectedColumn = '';
/**/
var actualQuery = { };
var sqlfilter = {};
/*
* Konstruktor
*/
function InitForm() {
    $('#wizard').smartWizard({
        transitionEffect: 'slideleft',
        onLeaveStep: LeaveAStepCallback,
        onShowStep: OnShowStepCallback,
        enableFinishButton: false
    });
    $(".buttonPrevious").text('Előző');
    $(".buttonNext").text('Következő');

    $('#btnNewQuery').click(function (e) {
        $.Utils.hideInfo();
        SetControlsToBase();
        $(".buttonNext").click();
        e.preventDefault();
    });
    $('#btnSaveQuery').click(function (e) {
        e.preventDefault();
        // Adat szinkronizáció
        RefreshDTO();
        if (actualQuery.Id == -1) {
            datamoduleQuery.NewQuery(actualQuery, Callback_ReloadQueries);
        } else {
            datamoduleQuery.UpdateQuery(actualQuery, Callback_ReloadQueries);
        }
    });
    $('#btnWhere').click(function() {
        if(ddlTable.GetValue() != -1) {
            sqlfilter.columns = [];
            
            sqlfilter.columns.push({
                "name": 'Válassz...',
                "index": -1,
                "table": ddlTable.GetText(),
                "tableId": ddlTable.GetValue()
            });
            if(sqlfilter.selectedColumns.length > 0) {
                $.each(sqlfilter.selectedColumns, function(index, element) {
                    sqlfilter.columns.push({
                        "name": element.name,
                        "index": element.id,
                        "table": element.table,
                        "tableId": element.tableId
                    });
                });
            }
            $.each(gridColumns.GetDatasource(), function(index, element) {
                if(!element.Calculated) {
                    sqlfilter.columns.push({
                        "name": element.Name,
                        "index": element.Id,
                        "table": ddlTable.GetText(),
                        "tableId": ddlTable.GetValue()
                    });
                }
            });
            sqlfilter.reDraw();
            $('#dialogWhere').dialog('open');
        }
    });
    $('#dialogOrderBy').dialog({
        autoOpen: false,
        width: 400,
        position: 'center',
        buttons: {
            "Ment": function () {
                var oc = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id; });
                if (oc.length > 0) {
                    oc[0].IsOrderBy = true;
                    oc[0].Direction = $('#OrderByDirection').val();
                    oc[0].Position = null;
                } else {
                    actualQuery.Columns.push({
                        TableId: ddlTable.GetValue(),
                        TableName: ddlTable.GetText(),
                        ColumnId: selectedColumn.Id,
                        ColumnName: selectedColumn.Name,
                        Calculated: selectedColumn.Calculated,
                        IsSelected: false,
                        IsOrderBy: true,
                        Direction: $('#OrderByDirection').val(),
                        Position: null
                    });
                }
                $(this).dialog("close");
                datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
            },
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });
    $('#dialogWhere').dialog({
        autoOpen: false,
        minWidth: 700,
        minHeight: 400,
        buttons: {
            "Ment": function () {
                sqlfilter.toUserFriendlyString();
                if(sqlfilter.selectedColumns.length > 0) {
                    
                    // 1. Ahol IsWhere = 'true' átállítani 'false' - ra 
                    $.each(actualQuery.Columns, function(index, element) {
                        if(element.IsWhere) {
                            element.IsWhere = false;
                        }
                    });
                    // 2. Újra beállítani a megmaradt feltételeken a flaget
                    $.each(sqlfilter.selectedColumns, function(index, element) {
                        var ac = actualQuery.Columns.filter(function (e) { return e.ColumnName == element.name && e.TableName == element.table; });
                        if (ac.length > 0) {
                            ac[0].IsWhere = true;
                        } else {
                            actualQuery.Columns.push({
                                TableId: ddlTable.GetValue(),
                                TableName: ddlTable.GetText(),
                                ColumnId: element.index,
                                ColumnName: element.name,
                                Calculated: false,
                                IsSelected: false,
                                IsOrderBy: false,
                                IsWhere: true,
                                Direction: null,
                                Position: null
                            });
                        }

                    });
                }
                actualQuery.WhereStatement = JSON.stringify(sqlfilter.filter);
                $(this).dialog("close");
            },
            "Mégsem": function () {
                $(this).dialog("close");
            }
        }
    });    
    /***/
    sqlfilter = new xFilter(
        document.getElementById("filters"),
        {
             filter: null,
             columns: []
        });

    gridSavedQueries = new DQ.Grid();
    gridSavedQueries.Init($('#placeholderQuery'), $("#queryRowPlaceholder"), $("#queryRowTemplate"), gridSavedQueriesGridFunction);

    gridColumns = new DQ.Grid();
    gridColumns.Init($('#placeholderColumns'), $("#columnRowPlaceholder"), $("#columnRowTemplate"), gridColumnsFunction);

    gridColumns0 = new DQ.Grid();
    gridColumns0.Init($('#placeholderColumns0'), $("#columnRowPlaceholder0"), $("#columnRowTemplate0"), gridColumns0Function);

    ddlTable = new DQ.DropDown($('#Table'), 'Id', 'Name');
    ddlColumnType = new DQ.DropDown($('#ColumnType'), 'Id', 'Name');
    ddlColumnSubType = new DQ.DropDown($('#ColumnSubType'), 'Id', 'Name');

    /***/
    datamoduleQuery = new DQ.Query();
    datamoduleQuery.GetQueries(Callback_QueryGetQueries);

    datamoduleTable = new DQ.TableAndColumn();
    datamoduleTable.GetTables(Callback_QueryGetTable);

    datamoduleType = new DQ.ColumnType();
    datamoduleType.GetColumType(Callback_QueryGetType);
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
* Event from wizard control
*/
function OnShowStepCallback(obj) {
    var stepNum = obj.attr('rel');
    if(stepNum==3) {
        gridColumns0.SetDatasource(actualQuery.Columns.filter(function (element) {
            return element.IsSelected || element.IsOrderBy || element.IsWhere;
        }));

    }
    else if(stepNum == 5) {
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
        var w = '';
        if(sqlfilter.selectedColumns.length > 0) {
            w = sqlfilter.toUserFriendlyString();
        }
        $.ajax({
            type: "POST",
            url: "Services/Query.asmx/GenerateQuery",
            data: JSON.stringify({ 'query': actualQuery, 'whereStatement': w }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (function (data, status) {
                //actualQuery.SelectStatement = data.d[0];
                if(data.d.length == 1) {
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

        /*$('#queryDataResult').append(
            html.toString()
                .replace('{0}', $('#QueryName').val())
                .replace('{1}', $('#QueryDescription').val())
                .replace('{2}', '...')
        );*/              
    }
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
* 'SavedQueries' grid events
*/
function gridSavedQueriesGridFunction(functionname, data) {
    $.Utils.hideInfo();
    $.Utils.logToConsole("Call " + functionname + " method", data.Id);
    switch (functionname) {
        case 'inactive':
            datamoduleQuery.SetStatus(data.Id, Callback_ReloadQueries);
            break;
        case 'active':
            datamoduleQuery.SetStatus(data.Id, Callback_ReloadQueries);
            break;
        case 'load':
            datamoduleQuery.GetQuery(data.Id, Callback_LoadSelectedQuery);
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }
}
/*
* Reload queries
*/
function Callback_ReloadQueries(data) {
    SetControlsToBase();
    $.Utils.showSuccess("Sikeres mentés");
    $("#firstep").click();
    datamoduleQuery.GetQueries(Callback_QueryGetQueries);
}
/*
* Load query
*/
function Callback_QueryGetQueries(data) {
    gridSavedQueries.SetDatasource(data);
}
/*
* Load selected query
*/
function Callback_LoadSelectedQuery(data) {
    SetControlsToBase(data);
    gridColumns0.SetDatasource(actualQuery.Columns.filter(function (element) {
       return element.IsSelected || element.IsOrderBy || element.IsWhere;
    }));
    $(".buttonNext").click();
}
/*
* Get tables
*/
function Callback_QueryGetTable(data) {
    ddlTable.Init(data);
    ddlTable.OnChange(Event_ChangeTable);
}
/*
* Get columns's types
*/
function Callback_QueryGetType(data) {
    ddlColumnType.Init(data);
    ddlColumnType.OnChange(Event_ChangeColumnType);
}
/*
* Get columns's subtypes
*/
function Callback_QueryGetSubType(data) {
    ddlColumnSubType.Init(data);
    ddlColumnSubType.OnChange(Event_ChangeColumnSubType);
}
/*
* Select table event
*/
function Event_ChangeTable(data) {
    if(dropdown_type != '') dropdown_type.SetSelectedValue(-1);
    datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
}
/*
* Select type event
* - load subtypes
* - filter columns
*/
function Event_ChangeColumnType(data) {
    datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
    datamoduleType.GetColumSubType(data, Callback_QueryGetSubType);
}
/*
* Select subtype event
* - filter columns
*/
function Event_ChangeColumnSubType(data) {
    datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
}
/*
* Set controls to base state, and clear local variables's values
*/
function SetControlsToBase(data) {
    if (data == null || data === 'undefined') {
        actualQuery = {
            Id: -1,
            Name: '',
            Description: '',
            WhereStatement: '',
            SelectStatement: '',
            Columns: []
        };
        sqlfilter.filter = null;
    } else {
        actualQuery = {
            Id: data.Id,
            Name: data.Name,
            WhereStatement: data.WhereStatement,
            SelectStatement: data.SelectStatement,
            Description: data.Description,
            Columns: data.Columns
        };
        if(data.WhereStatement != '' && data.WhereStatement != null) 
        {
            sqlfilter.filter = jQuery.parseJSON(data.WhereStatement);
            sqlfilter.toUserFriendlyString();
        }
    }

    $('#QueryName').val(actualQuery.Name);
    $('#QueryDescription').val(actualQuery.Description);
    $('#queryDataResult').html('');
    if (ddlTable != '') ddlTable.SetIndex(-1);
    if (ddlColumnType != '') ddlColumnType.SetIndex(-1);
    if (ddlColumnSubType != '') ddlColumnSubType.SetIndex(-1);
}
/*
* Tábla mezők gridben található funkciók 'gombok' eseményei
*/
function gridColumnsFunction(functionname, data) {
    selectedColumn = data;
    $.Utils.logToConsole("Call " + functionname + " method", data.Id);
    switch (functionname) {
        case 'addcolumn':
            var calculated = data.Calculated;
            var ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id && element.Calculated == calculated; });
            if (ac.length > 0) {
                ac[0].IsSelected = true;
            } else {
                if(calculated) {
                    actualQuery.Columns.push({
                        TableId: ddlTable.GetValue(),
                        TableName: ddlTable.GetText(),
                        ColumnId: data.Id,
                        ColumnName: data.Sql,
                        Calculated: data.Calculated,
                        IsSelected: true,
                        IsOrderBy: false,
                        IsWhere: false,
                        WhereCounter: 0,
                        Direction: null,
                        Position: null
                    });
                } else {
                    actualQuery.Columns.push({
                        TableId: ddlTable.GetValue(),
                        TableName: ddlTable.GetText(),
                        ColumnId: data.Id,
                        ColumnName: data.Name,
                        Calculated: data.Calculated,
                        IsSelected: true,
                        IsOrderBy: false,
                        IsWhere: false,
                        WhereCounter: 0,
                        Direction: null,
                        Position: null
                    });
                }
            }
            datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
            break;
        case 'removecolumn':
            var ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == selectedColumn.Id; });
            if (ac.length > 0) {
                ac[0].IsSelected = false;
            }
            datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
            break;
        case 'addorderby':
            $('#dialogOrderBy').dialog('open');
            break;
        case 'removeorderby':
            var c = actualQuery.Columns.filter(function (element) { return element.ColumnId  == selectedColumn.Id; });
            c[0].IsOrderBy = false;
            c[0].Direction = null;
            c[0].Position = null;
            datamoduleTable.GetColumns(Callback_ShowColumns, ddlTable.GetValue(), ddlColumnType.GetValue(), ddlColumnSubType.GetValue());
            break;
        case 'where':
            sqlfilter.columns = [];
            
            sqlfilter.columns.push({
                "name": 'Válassz...',
                "index": -1,
                "table": ddlTable.GetText(),
                "tableId": ddlTable.GetValue()
            });
            if(sqlfilter.selectedColumns.length > 0) {
                $.each(sqlfilter.selectedColumns, function(index, element) {
                    sqlfilter.columns.push({
                        "name": element.name,
                        "index": element.id,
                        "table": element.table,
                        "tableId": element.tableId
                    });
                });
            }
            $.each(gridColumns.GetDatasource(), function(index, element) {
                if(!element.Calculated) {
                    sqlfilter.columns.push({
                        "name": element.Name,
                        "index": element.Id,
                        "table": ddlTable.GetText(),
                        "tableId": ddlTable.GetValue()
                    });
                }
            });
            sqlfilter.reDraw();
            $('#dialogWhere').dialog('open');
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }
}
function gridColumns0Function(functionname, data) {
    switch (functionname) {
        case 'removecolumn':
            var ac = actualQuery.Columns.filter(function (element) { return element.ColumnId == data.ColumnId; });
            if (ac.length > 0) {
                ac[0].IsSelected = false;
            }
            gridColumns0.SetDatasource(actualQuery.Columns.filter(function (element) {
                return element.IsSelected || element.IsOrderBy || element.IsWhere;
            }));

            break;
        case 'removeorderby':
            var c = actualQuery.Columns.filter(function (element) { return element.ColumnId  == data.ColumId; });
            c[0].IsOrderBy = false;
            c[0].Direction = null;
            c[0].Position = null;
            gridColumns0.SetDatasource(actualQuery.Columns.filter(function (element) {
                return element.IsSelected || element.IsOrderBy || element.IsWhere;
            }));
            break;
        default:
            $.Utils.logToConsole('Warning', 'Unknown function called');
    }
}
/*
* Tábla oszlopainak betöltése, kalkulált mezők is
*/
function Callback_ShowColumns(data) {
    var columns = [];
    var other = '';
    var selected = false;
    if (data != null) {
        // base columns of table
        $.each(data.Columns, function (i, v) {
            other = v.ColumnType;
            if (v.Length != 0) {
                other += '(' + v.Length;
                if (v.DecimalLength != 0) {
                    other += ',' + v.DecimalLength;
                }
                other += ')';
            }

            // Ellenőrzés hogy már hozzá lett e adva a query - hez
            var e = actualQuery.Columns.filter(function (element) { return element.Calculated == false && element.ColumnId == v.Id; });
            var o = false;
            selected = false;
            if(e.length != 0 && e[0].IsSelected == true) {
                selected = e[0].IsSelected;
            }
            if (e.length > 0 && e[0].IsOrderBy == true) {
                o = true;
            }
            columns.push({
                Id: v.Id,
                Name: v.Name,
                Description: v.Description,
                Other: other,
                Active: v.Active,
                Calculated: false,
                Selected: selected,
                Sql: '[' + ddlTable.GetText() + '].[' + v.Name + '] AS ' + v.Name,
                Table: ddlTable.GetText(),
                ColumnType: v.ColumnType,
                IsOrderBy: o
            });
        });
        $.each(data.CalculatedColumns, function (i, v) {
            other = '';
            if (v.GroupBy) {
                other = '(GroupBy)';
            }
            other += ' ' + v.Sql;
            selected = false;
            var ec = actualQuery.Columns.filter(function (element) { return element.Calculated == true && element.ColumnId == v.Id; });
            if(ec.length != 0) {
                selected = ec[0].IsSelected;
            }

            columns.push({
                Id: v.Id,
                Name: '(C)' + v.Name,
                Description: v.Description,
                Other: other,
                Active: v.Active,
                Calculated: true,
                Selected: selected,
                Sql: v.Sql,
                Table: ddlTable.GetText(),
                ColumnType: '',
                IsOrderBy: false,
            });
        });
    }
    gridColumns.SetDatasource(columns);
}
/*
* Adatok mentéshez való frissítése
*/
function RefreshDTO() {
    actualQuery.Name = $('#QueryName').val();
    actualQuery.Description = $('#QueryDescription').val();
    actualQuery.Columns = actualQuery.Columns.filter(function (element) {
        return element.IsSelected == true || element.IsOrderBy == true || element.IsWhere == true;
    });
    if(sqlfilter.selectedColumns.length > 0) {
        actualQuery.WhereStatement = JSON.stringify(sqlfilter.filter);
    } else {
        actualQuery.WhereStatement = null;
    }
}