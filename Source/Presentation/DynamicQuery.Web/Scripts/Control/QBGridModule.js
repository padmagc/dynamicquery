var DQ = DQ || {};

DQ.Grid = function () {
    var 
    /********** Variables **********/
        gridId = '',
        tableBodyId = '',
        rowTemplateId = '',
        dataSource = '',
        gridFunctionCallback = '',
        recordCount = 5,
        actualPage = 0,
        pageCount = 0,
        noRecordTemplate = "<tr id=\"nofound\"><td colspan=\"10\" >"
                                 + "<div style=\"display: block\">"
                                 + "<span class=\"NoRecords ui-state-warning\">A lekérdezésnek nincs eredménye!</span>"
                                 + "</div>"
                                 + "</td></tr>",
        pagerTemplate = "<th colspan=\"10\">Oldal : "
                            + "<select id=\"ddPaging\">"
                            + "{{for PageNumber }}"
                            + "{{if ActualPage == $i }}"
                            + "<option value=\"${$i}\" selected=\"selected\">${$i+1}. oldal</option>"
                            + "{{else}}"
                            + "<option value=\"${$i}\">${$i+1}. oldal</option>"
                            + "{{/if}}"
                            + "{{/for}}"
                            + "</select>összesen ${PageNumber} oldal</th>",
    /********** Functions **********/
        setDatasource = function (p_dataSource) {
            /*Utils.logToConsole('setDatasource', 'Add data to ' + tableBodyId.id + ' use ' + rowTemplateId + ' template');*/
            $(gridId).css("visibility", "hidden");
            dataSource = p_dataSource;
            $(tableBodyId).empty();
            if (dataSource != null && dataSource.length != 0) {
                pageCount = Math.ceil(dataSource.length / recordCount);
                if (dataSource.length > (recordCount * pageCount)) {
                    pageCount++;
                }
                bindDatasource();
            } else {
                $.tmpl(noRecordTemplate).appendTo(tableBodyId);
            }
            $(gridId).css("visibility", "visible");

        },
        bindDatasource = function () {
            $(tableBodyId).empty();
            $(rowTemplateId).tmpl(grepDatasource()).appendTo(tableBodyId);
            if (dataSource.length / recordCount > 1) {
                $.tmpl(pagerTemplate,{ "PageNumber": "" + pageCount + "", "ActualPage": "" + actualPage + "" }).appendTo(tableBodyId);
            }

            $(tableBodyId).find('[href]').each(function () {
                $(this).click(function (e) {
                    gridFunctionCallback($(this).attr('class'), $.tmplItem(this).data);
                });
            });
            $('#ddPaging').change(function () {
                pageing();
            });
        },
        grepDatasource = function () {
            var data = [];
            data = jQuery.grep(dataSource, function (d, index) {
                return (index >= actualPage * recordCount && index < (actualPage * recordCount) + recordCount);
            });
            return data;
        },
        pageing = function () {
            $.Utils.hideInfo();
            actualPage = $("#ddPaging").val();
            $.Utils.logToConsole("Pageing", actualPage);
            bindDatasource();
        },
        init = function (p_gridId, p_tableBodyId, p_rowTemplateId, p_gridFunctionCallback) {
            gridId = p_gridId;
            rowTemplateId = p_rowTemplateId;
            tableBodyId = p_tableBodyId;
            gridFunctionCallback = p_gridFunctionCallback;
            actualPage = 0;
            $(gridId).css("visibility", "hidden");
        };
    return {
        Init: init,
        SetDatasource: setDatasource
    };
    
};