///
/// Grid plugin
///
(function ($) {
    var opts = {};
    ///
    /// Plugin definition
    ///
    $.fn.QBGrid = function (options) {
        // build main options before element iteration
        opts = $.extend({}, $.fn.QBGrid.defaults, options);
        opts.gridId = $(this).selector;
        if (!opts.visible) {
            $('#' + opts.gridId).css("visibility", "hidden");
        }
        $.fn.QBGrid.SetDatasource(opts.dataSource);
    };
    //
    // set datasource
    //
    $.fn.QBGrid.SetDatasource = function (datasource) {
        opts.dataSource = datasource;
        $(tableBodyObject()).empty();

        if (opts.dataSource != null && opts.dataSource.length != 0) {
            opts.pageCount = Math.ceil(opts.dataSource.length / opts.recordCount);
            if (opts.dataSource.length > (opts.recordCount * opts.pageCount)) {
                opts.pageCount++;
            }
            bindDatasource();
        } else {
            $.tmpl(opts.noRecordTemplate).appendTo(tableBodyObject());
        }
    };
    //
    // private function : bindDatasource
    //
    function bindDatasource() {
        $(tableBodyObject()).empty();
        $(rowTemplateObject()).tmpl(grepDatasource()).appendTo(tableBodyObject());

        if (opts.dataSource.length / opts.recordCount > 1) {
            $.tmpl(opts.pagerTemplate,
                        { "PageNumber": "" + opts.pageCount + "", "ActualPage": "" + opts.actualPage + "" }).appendTo(tableBodyObject());
        }

        $(tableBodyObject()).find('[href]').each(function () {
            $(this).click(function (e) {
                if (opts.gridFunctionCallback != null) {
                    opts.gridFunctionCallback($(this).attr('class'), $.tmplItem(this).data);
                }
            });
        });

        $('#ddPaging').change(function () {
            pageing();
        });
    };
    //
    // private function : pageing
    //
    function pageing() {
        opts.actualPage = $("#ddPaging").val();
        bindDatasource();
    };
    //
    // private function : return 'tableBody' object
    //
    function tableBodyObject() {
        return $('#' + opts.tableBodyId);
    };
    //
    // private function : return 'rowTemplate' object
    //
    function rowTemplateObject() {
        return $('#' + opts.rowTemplateId);
    };
    //
    // private function : grep datasource to pageing
    //
    function grepDatasource() {
        var data = [];
        if (opts.dataSource != null) {
            data = jQuery.grep(opts.dataSource, function(d, index) {
                return (index >= opts.actualPage * opts.recordCount && index < (opts.actualPage * opts.recordCount) + opts.recordCount);
            });
        }
        return data;
    };
    //
    // plugin defaults
    //
    $.fn.QBGrid.defaults = {
        gridId: $(this).selector,
        tableBodyId: 'placeholderRows',
        rowTemplateId: 'rowTemplate',
        noRecordTemplate: "<tr id=\"nofound\"><td colspan=\"10\" >"
                                 + "<div style=\"display: block\">"
                                 + "<span class=\"NoRecords ui-state-warning\">A lekérdezésnek nincs eredménye!</span>"
                                 + "</div>"
                                 + "</td></tr>",
        pagerTemplate: "<th colspan=\"10\">Oldal : "
                            + "<select id=\"ddPaging\">"
                            + "{{for PageNumber }}"
                            + "{{if ActualPage == $i }}"
                            + "<option value=\"${$i}\" selected=\"selected\">${$i+1}. oldal</option>"
                            + "{{else}}"
                            + "<option value=\"${$i}\">${$i+1}. oldal</option>"
                            + "{{/if}}"
                            + "{{/for}}"
                            + "</select>összesen ${PageNumber} oldal</th>",
        dataSource: null,
        gridFunctionCallback: null,
        visible: true,
        showGridWhenSetDatasource: true,
        recordCount: 5,
        actualPage: 0,
        pageCount: 0
    };
})(jQuery);