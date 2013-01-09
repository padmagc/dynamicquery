var DQ = DQ || {};

DQ.QueryBuilder = function () {
    var 
    /********** Variables **********/
        className = 'DQ.CalculatedColumn',
        url = "Services/TableAndColumn.asmx/",
    /********** Functions **********/
        hasConnectionBetweenTables = function (tables, callback) {
            $.Utils.logToConsole(className, 'hasConnectionBetweenTables');
            var parameters = "{" + "tables:" + JSON.stringify(tables) + "}";
            $.ajax({
                type: "POST",
                url: url + 'HasConnectionBetweenTables',
                data: parameters,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    callback(data.d);
                },
                error: (function (response, status, error) {
                    $.Utils.showError(className, response.statusText);
                })
            });
        };
    return {
        HasConnectionBetweenTables: hasConnectionBetweenTables
    };
};
