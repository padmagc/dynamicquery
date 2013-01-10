var DQ = DQ || {};

DQ.Query = function () {
    var 
    /********** Variables **********/
        className = 'DQ.Query',
        url = "Services/Query.asmx/",
        storageconstant = CONST_Query,
    /********** Functions **********/
        setStatus = function (id, callback) {
            $.Utils.logToConsole(className, 'set activate status on this query : ' + id);
            var parameters = "{" + "id:" + id + "}";
            $.ajax({
                type: "POST",
                url: url + 'SetStatus',
                data: parameters,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(storageconstant);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.showError(className, response.statusText);
                })
            });

        },
        updateQuery = function (dto, callback) {
            $.Utils.logToConsole(className, 'update this query : ' + dto.Name);
            var parameters = { 'query': dto };
            $.ajax({
                type: "POST",
                url: url + 'UpdateQuery',
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(storageconstant);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.showError(className, response.statusText);
                })
            });
        },
        newQuery = function (dto, callback) {
            $.Utils.logToConsole(className, 'new query : ' + dto.Name);
            var parameters = { 'query': dto };
            $.ajax({
                type: "POST",
                url: url + 'NewQuery',
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.localStorage.removeItem(storageconstant);
                    callback(true);
                },
                error: (function (response, status, error) {
                    $.Utils.showError(className, response.statusText);
                })
            });
        },
        getQuery = function (id, callback) {
            if (!$.localStorage.getItem(storageconstant)) {
                $.Utils.logToConsole(className, 'get queries data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetQueries',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $.localStorage.setItem(storageconstant, data.d);
                        callback(get(data.d, id));
                    },
                    error: (function (response, status, error) {
                        $.Utils.showError(className, response.statusText);
                    })
                });
            } else {
                $.Utils.logToConsole(className, 'get queries data from cache');
                /* Search colums */
                callback(get($.localStorage.getItem(storageconstant), id));
            }
        },
        get = function (queries, id) {
            var query = null;
            $.each(queries, function (i, v) {
                if (v.Id == id) {
                    query = v;
                }
            });
            return query;
        },
        getQueries = function (callback) {
            if (!$.localStorage.getItem(storageconstant)) {
                $.Utils.logToConsole(className, 'get queries data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetQueries',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $.localStorage.setItem(storageconstant, data.d);
                        callback(data.d);
                    },
                    error: (function (response, status, error) {
                        $.Utils.showError(className, response.statusText);
                    })
                });
            } else {
                $.Utils.logToConsole(className, 'get queries data from cache');
                /* Search colums */
                callback($.localStorage.getItem(storageconstant));
            }
        };
    return {
        GetQueries: getQueries,
        GetQuery: getQuery,
        NewQuery: newQuery,
        UpdateQuery: updateQuery,
        SetStatus: setStatus
    };
};