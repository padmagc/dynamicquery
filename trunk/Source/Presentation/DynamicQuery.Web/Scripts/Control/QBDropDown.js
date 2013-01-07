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

    };
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
    // plugin defaults
    //
    $.fn.QBDropDown.defaults = {
        dropdownId: null,
        dataSource: null,
        dropDownFunctionCallback: null,
        visible: true
    };
})(jQuery);