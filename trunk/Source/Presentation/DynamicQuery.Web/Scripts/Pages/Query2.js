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

    gridSavedQueries = new DQ.Grid();
    gridSavedQueries.Init($('#placeholderQuery'), $("#queryRowPlaceholder"), $("#queryRowTemplate"), gridSavedQueriesGridFunction);

    gridColumns = new DQ.Grid();
    gridColumns.Init($('#placeholderColumns'), $("#columnRowPlaceholder"), $("#columnRowTemplate"), gridColumnsFunction);

    dropdown_Table = new DQ.DropDown($('#Table'), 'Id', 'Name');
    dropdown_ColumnType = new DQ.DropDown($('#ColumnType'), 'Id', 'Name');
    dropdown_ColumnSubType = new DQ.DropDown($('#ColumnSubType'), 'Id', 'Name');

}
/****/
function InitDialogAndButtons() {
    /* New query button */
    $('#btnNewQuery').click(function (e) {
        $.Utils.hideInfo();
        SetControlsToBase();
        SetBO();
        $(".buttonNext").click();
        e.preventDefault();
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
    sqlfilter = new xFilter(document.getElementById("filters"),
    {
        filter: null,
        columns: []
    });
    
    if (data == null) {
        actualQuery = {
            Id: -1,
            Name: '',
            Description: '',
            WhereStatementObject: '',
            WhereStatement: '',
            SelectStatement: '',
            Columns: []
        };
    } else {
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
