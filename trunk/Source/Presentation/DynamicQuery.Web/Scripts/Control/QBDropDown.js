///
/// DropDown plugin
///
(function ($) {
    var opts = {};
    ///
    /// Plugin definition
    ///
    $.fn.QBDropDown = function (options) {
        // build main options before element iteration
        opts = $.extend({}, $.fn.QBDropDown.defaults, options);
        opts.dropdownId = $(this).selector;
        if (!opts.visible) {
            $('#' + opts.dropdownId).css("visibility", "hidden");
        }
        $.fn.QBDropDown.SetDatasource(opts.dataSource);
    };
    //
    // set datasource
    //
    $.fn.QBDropDown.SetDatasource = function (datasource) {
        opts.dataSource = datasource;
        var output = [];
        $.fn.QBDropDown.Clear();
        if (opts.addChooseOption) {
            if (opts.chooseOptionText != null) {
                output.push('<option value="-1">' + opts.chooseOptionText + '</option>');
            } else {
                output.push('<option value="-1">Válassz...</option>');
            }
        }
        $.each(opts.dataSource, function (key, value) {
            output.push('<option value="' + eval("value." + opts.keyField) + '">' + eval("value." + opts.textField) + '</option>');
        });
        $(dropdownObject()).html(output.join(''));
        if (opts.onChange != null) {
            $(dropdownObject()).change(function () {
                var d = grepDatasource($(dropdownObject()).val());
                opts.onChange(d[0]);
            });
        }
    };
    //
    //
    // GetValue
    //
    $.fn.QBDropDown.GetValue = function () {
        return $(dropdownObject()).val();
    };
    //
    // GetText
    //
    $.fn.QBDropDown.GetText = function () {
        return $($(this).selector + " option:selected").html();
    };
    //
    // SetIndex of ddl
    //
    $.fn.QBDropDown.SetIndex = function (value) {
        $(dropdownObject).val(index);
        $(dropdownObject).change();
    };
    //
    // SetSelected value of ddl
    //
    $.fn.QBDropDown.SetSelectedValue = function (value) {
        if (opts.dataSource != null) {
            $($(this).selector + " > option").filter(function () {
                return $(dropdownObject()).val() == value;
            }).attr('selected', true);
            $(dropdownObject()).change();
        }
    };
    //
    // Clear values from ddl
    //
    $.fn.QBDropDown.Clear = function () {
        $(dropdownObject).html('');
    };
    //
    // private function : return 'dropdown' object
    //
    function dropdownObject() {
        return $('#' + opts.dropdownId);
    };
    //
    // private function : grep datasource
    //
    function grepDatasource(id) {
        var data = [];
        if (opts.dataSource != null) {
            data = jQuery.grep(opts.dataSource, function (d, index) {
                return (eval("d." + opts.keyField) == id);
            });
        }
        return data;
    };
    //
    // plugin defaults
    //
    $.fn.QBDropDown.defaults = {
        dropdownId: null,
        dataSource: null,
        keyField: 'Id',
        textField: 'Name',
        onChange: null,
        visible: true,
        addChooseOption: true,
        chooseOptionText: null
    };
})(jQuery);