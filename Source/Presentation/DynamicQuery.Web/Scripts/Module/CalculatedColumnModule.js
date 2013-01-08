var DQ = DQ || {};

DQ.CalculatedColumn = function () {
    var 
    /********** Variables **********/
        className = 'DQ.CalculatedColumn',
        url = "Services/TableAndColumn.asmx/",
        columnConstans = CONST_Table,
    /********** GET field types **********/
        getCalulcatedColumns = function (callback, tableId, typeId, subTypeId) {
            var tables;
            if (!$.localStorage.getItem(columnConstans)) {
                $.Utils.logToConsole(className, 'get table data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetTables',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $.localStorage.setItem(columnConstans, data.d);
                        callback(collectData(data.d, tableId, typeId, subTypeId));
                    },
                    error: (function (response, status, error) {
                        $.Utils.showError(className, response.statusText);
                    })
                });
            } else {
                $.Utils.logToConsole(className, 'get table data from cache');
                /* Search colums */
                callback(collectData($.localStorage.getItem(columnConstans), tableId, typeId, subTypeId));
            }
        },
        collectData = function (tables, id, typeId, subTypeId) {
            var t = tables.filter(function (element) { return element.Id == id; })[0];
            if (t == null || t === 'undefined') return null;

            var records = {
                Id: id,
                Columns: t.Columns.filter(function (element) {
                    if (typeId == -1) {
                        return true;
                    } else {
                        if (subTypeId > -1) {
                            return element.Type == typeId && element.SubType == subTypeId;
                        } else {
                            return element.Type == typeId;
                        }
                    }
                }),
                CalculatedColumns: t.CalculatedColumns.filter(function (element) {
                    if (typeId == -1) {
                        return true;
                    } else {
                        if (subTypeId > -1) {
                            return element.Type == typeId && element.SubType == subTypeId;
                        } else {
                            return element.Type == typeId;
                        }
                    }
                })
            };
            return records;
        },
        setstatus = function (columnId, callback) {
            $.Utils.logToConsole(className, 'set activate status on this column : ' + columnId);
            var parameters = "{" + "fieldId:" + columnId + "}";
            $.ajax({
                type: "POST",
                url: url + 'SetStatus',
                data: parameters,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(columnConstans);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.errorlog(className, response.statusText);
                })
            });

        },
        updateColumn = function (dto, callback) {
            $.Utils.logToConsole(className, 'update this field : ' + dto.Id);
            var parameters = { 'column': dto };
            $.ajax({
                type: "POST",
                url: url + 'UpdateCalculatedColumn',
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(columnConstans);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.errorlog(className, response.statusText);
                })
            });
        },
        newColumn = function (dto, callback) {
            Utils.logToConsole(className, 'new calculated column : ' + dto.Id);
            var parameters = { 'column': dto };
            $.ajax({
                type: "POST",
                url: url + 'NewCalculatedColumn',
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(columnConstans);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.errorlog(className, response.statusText);
                })
            });
        },
        getTables = function (callback) {
            if (!$.localStorage.getItem(CONST_Table)) {
                $.Utils.logToConsole(className, 'get data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetTables',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $.localStorage.setItem(columnConstans, data.d);
                        callback(data.d);
                    },
                    error: (function (response, status, error) {
                        $.Utils.errorlog(className, response.statusText);
                    })
                });
            } else {
                $.Utils.logToConsole(className, 'get data from cache');
                callback($.localStorage.getItem(columnConstans));
            }
        };
    return {
        GetTables: getTables,
        GetCalculatedColumns: getCalulcatedColumns,
        NewColumn: newColumn,
        UpdateColumn: updateColumn,
        SetStatus: setstatus
    };
};