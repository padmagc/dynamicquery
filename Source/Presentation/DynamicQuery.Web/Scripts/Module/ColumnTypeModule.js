var DQ = DQ || {};

DQ.ColumnType = function () {
    var /********** Variables **********/
        className = 'DQ.ColumnType',
        url = "Services/ColumnType.asmx/",
    /********** GET field types **********/
        getSubType = function (typeid, callback) {
            var successCallback = false;
            if (!$.localStorage.getItem(CONST_FieldType)) {
                $.Utils.logToConsole(className, 'get data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetTypes',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (function (data, status) {
                        $.localStorage.setItem(CONST_FieldType, data.d);
                        $.each(data.d, function (i, v) {
                            if (v.Id == typeid) {
                                successCallback = true;
                                callback(v.SubType);
                            }
                        });
                    }),
                    error: (function (response, status, error) {
                        $.Utils.showError(response.statusText);
                    })
                });
            }
            $.each($.localStorage.getItem(CONST_FieldType), function (i, v) {
                if (v.Id == typeid) {
                    successCallback = true;
                    callback(v.SubType);
                }
            });
            // if no callback
            if(successCallback==false) {
                callback([]);   
            }
        },
        getType = function (callback) {
            if (!$.localStorage.getItem(CONST_FieldType)) {
                $.Utils.logToConsole(className, 'get data from database');
                $.ajax({
                    type: "POST",
                    url: url + 'GetTypes',
                    data: null,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (function (data, status) {
                        $.localStorage.setItem(CONST_FieldType, data.d);
                        callback(data.d);
                    }),
                    error: (function (response, status, error) {
                        $.Utils.showError(response.statusText);
                    })
                });
            } else {
                $.Utils.logToConsole(className, 'get data from cache');
                callback($.localStorage.getItem(CONST_FieldType));
            }
        },
        setTypeStatus = function (id, callback) {
            var parameters = "{" + "id:" + id + "}";
            $.ajax({
                type: "POST",
                url: url + "SetTypeStatus",
                data: parameters,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (function success(data, status) {
                    $.localStorage.removeItem(CONST_FieldType);
                    callback(true);
                }),
                error: (function Error(request, status, error) {
                    // Hiba
                    $.Utils.showError(request.statusText);
                })
            });
        },
        setSubTypeStatus = function (id, callback) {
            var parameters = "{" + "id:" + id + "}";
            $.ajax({
                type: "POST",
                url: url + "SetSubTypeStatus",
                data: parameters,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (function success(data, status) {
                    $.localStorage.removeItem(CONST_FieldType);
                    callback(true);
                }),
                error: (function Error(request, status, error) {
                    // Hiba
                    $.Utils.showError(request.statusText);
                })
            });
        },
        saveType = function (dto, callback) {
            var parameters = { 'dto': dto };
            $.ajax({
                type: "POST",
                url: url + "SaveType",
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (function success(data, status) {
                    $.localStorage.removeItem(CONST_FieldType);
                    callback(true);
                }),
                error: (function Error(request, status, error) {
                    // Hiba
                    $.Utils.showError(request.statusText);
                })
            });
        },
        saveSubType = function (typeId, dto, callback) {
            var parameters = { 'typeId': typeId, 'dto': dto };
            $.ajax({
                type: "POST",
                url: url + "SaveSubType",
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (function success(data, status) {
                    $.localStorage.removeItem(CONST_FieldType);
                    callback(true);
                }),
                error: (function Error(request, status, error) {
                    // Hiba
                    $.Utils.showError(request.responseText);
                })
            });
        };
    return {
        GetColumType: getType,
        GetColumSubType: getSubType,
        SetTypeStatus: setTypeStatus,
        SetSubTypeStatus: setSubTypeStatus,
        SaveType: saveType,
        SaveSubType: saveSubType
    };

};