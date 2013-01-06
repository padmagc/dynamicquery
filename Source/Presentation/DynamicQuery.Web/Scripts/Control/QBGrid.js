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

    };
    //
    // set datasource
    //
    $.fn.QBGrid.SetDatasource = function (datasource) {
        opts.dataSource = datasource;
        $(tableBodyId).empty();

        if (opts.dataSource != null && opts.dataSource.length != 0) {
            opts.pageCount = Math.ceil(opts.dataSource.length / opts.recordCount);
            if (opts.dataSource.length > (opts.recordCount * opts.pageCount)) {
                opts.pageCount++;
            }
            //bindDatasource();
        } 
    };
    //
    // plugin defaults
    //
    $.fn.QBGrid.defaults = {
        gridId: $(this).selector,
        tableBodyId: $('#placeholderRows'),
        rowTemplateId: $('#rowTemplate'),
        noRecordTemplate: $.tmpl("<tr id=\"nofound\"><td colspan=\"10\" ><span class=\"NoRecords\">A lekérdezésnek nincs eredménye!</span></td></tr>"),
        pagerTemplate: $.tmpl("<th colspan=\"10\">Oldal : "
                            + "<select id=\"ddPaging\">"
                            + "{{for PageNumber }}"
                            + "{{if ActualPage == $i }}"
                            + "<option value=\"${$i}\" selected=\"selected\">${$i+1}. oldal</option>"
                            + "{{else}}"
                            + "<option value=\"${$i}\">${$i+1}. oldal</option>"
                            + "{{/if}}"
                            + "{{/for}}"
                            + "</select>összesen ${PageNumber} oldal</th>",
                        { "PageNumber": "" + 0 + "", "ActualPage": "" + 0 + "" }),
        dataSource: '',
        gridFunctionCallback: '',
        visible: true,
        showGridWhenSetDatasource: true,
        recordCount: 5,
        actualPage: 0,
        pageCount: 0
    };
})(jQuery);