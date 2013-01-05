var pageName = "Documentation.aspx";
var tables = '';
var errorInGeneration = '';
var step = 0;
var percentage = 0;
/*
* Konstruktor
*/
function InitForm() {
    $.Utils.hideInfo();
    // Gomb esemény
    $("#btnGenerate").click(function () {
        SetBaseToControls();
        Start();
    });
    // Progressbar init
    $("#progressbar").progressbar({});
    SetBaseToControls();
}
// Progressbar frissítése
function SetProgressbarValue(value) {
    $("#progressbar").progressbar("option", "value", value);
    $("#percentage").html(value + ' %');
}
// Alap állapotba a kontrolokat
function SetBaseToControls() {
    $.Utils.hideInfo();
    percentage = 0;
    SetProgressbarValue(percentage);
    $("#result").html('');
}
// Táblák lekérdezése és a generálás elindítása
function Start() {
    // Get table names
    $.ajax({
        type: "POST",
        url: pageName + "/GetTables",
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (function success(data, status) {
            tables = data.d;
            step = 100 / tables.length;
            // Generator
            $.each(tables, function (idx, obj) {
                generateDocumentation(obj);
            });
        }),
        error: (function Error(request, status, error) {
            // Hiba
            $.Utils.showError(request.statusText);
        })
    });
}
function generateDocumentation(tableName) {
    var parameters = "{" + "tableName:'" + tableName + "'}";
    // Get table names
    $.ajax({
        type: "POST",
        url: pageName + "/GenerateDocumentation",
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (function success(data, status) {
            percentage += step;
            SetProgressbarValue(Math.ceil(percentage));
            $("#result").append("<span class='ui-state-success' style='margin-left:2px; margin-top:2px; padding: 2px 2px 2px 2px;display: inline-block;'>" + tableName + "</span>");
            if(percentage >= 100) {
                if (errorInGeneration.length == 0) {
                    $.Utils.showSuccess("Sikeres dokumentáció generálás");
                } else {
                    $.Utils.showError("Hiba a generálás alatt: " + errorInGeneration);
                }                
            }
        }),
        error: (function Error(request, status, error) {
            if (errorInGeneration.length > 0) {
                errorInGeneration += ' ,';
            }
            errorInGeneration += tableName;
        })
    });
}