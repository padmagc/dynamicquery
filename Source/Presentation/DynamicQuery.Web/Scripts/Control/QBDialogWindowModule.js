var DQ = DQ || {};

DQ.DialogWindow = function () {
    var 
    /********** Variables **********/
    /********** GET field types **********/
        showDialog = function (title, data, formTemplate, callback, validation) {
            $('#dialogwindow').attr("title", title);

            $($('#dialogPlaceholder')).empty();

            $($('#' + formTemplate)).tmpl(data).appendTo($('#dialogPlaceholder'));

            $('#dialogwindow').dialog({
                width: 400,
                buttons: {
                    "Ment": function () {
                        if (Validate()) {
                            callback('save');
                            $(this).dialog("close");
                        }
                    },
                    "Mégsem": function () {
                        callback('cancel');
                        $(this).dialog("close");
                    }
                }
            });
            $('#dialogwindow').css("visibility", "visible");
        };
    return {
        ShowDialog: showDialog
    };

};