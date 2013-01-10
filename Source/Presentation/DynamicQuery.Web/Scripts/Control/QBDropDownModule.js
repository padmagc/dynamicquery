var DQ = DQ || {};

DQ.DropDown = function (controlid, keyField, valueField) {
    var 
    /********** Variables **********/
        id = controlid,
        selectedId = 1,
        selectedText = '',
        dataSource = {},
    /********** Functions **********/
        init = function (source) {
            var output = [];
            // clear
            clear();
            dataSource = source;
            // add first record
            output.push('<option value="-1">Válassz...</option>');
            $.each(source, function (key, value) {
                output.push('<option value="' + eval("value." + keyField) + '">' + eval("value." + valueField) + '</option>');
            });
            $(id).html(output.join(''));
            //$(id).change();
        },
        onChange = function (onchange) {
            $(id).change(function () {
                $.Utils.hideInfo();
                selectedId = $(id).val();
                selectedText = $(id).text();
                onchange(selectedId);
            });
        },
        getValue = function () {
            return $(id).val();
        },
        getDataSource = function () {
            return dataSource;
        },
        getText = function () {
            return $(id.selector + " option:selected").html();
        },
        setIndex = function (index) {
            $(id).val(index);
            $(id).change();
        },
        setSelectedValue = function (value) {
            $(id.selector + " > option").filter(function () {
                return $(this).val() == value;
            }).attr('selected', true);
            $(id).change();
        },
        clear = function () {
            $(id).html('');
        };
    return {
        Clear: clear,
        Init: init,
        OnChange: onChange,
        GetValue: getValue,
        GetText: getText,
        SetIndex: setIndex,
        GetDataSource : getDataSource,
        SetSelectedValue: setSelectedValue
    };
};
