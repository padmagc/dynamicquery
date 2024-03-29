﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Column.aspx.cs" Inherits="DynamicQuery.Web.Column" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="./Scripts/Pages/Column.js"></script>
    <!-- Templates -->
    <script id="rowTemplate" type="text/x-jquery-tmpl">
        {{if Active == true}}
        <tr>
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Name}</td>
            <td style="padding-left: 5px;">${Description}</td>            
            <td style="padding-left: 5px;">${ColumnType} {{if Length != 0 }} {{if ColumnType != "string"}} (${Length},${DecimalLength}) {{else}} (${Length}) {{/if}} {{/if}} </td>
            <td style="text-align: center !important; padding-left: 5px;">
            {{if Active == true}}
                <a href="javascript:void(0);" class="inactive">Inaktivál</a>
            {{else}}
                <a href="javascript:void(0);" class="active" >Aktivál</a>
            {{/if}}
            <a href="javascript:void(0);" class="update" >Módosít</a>
            </td>
        </tr>
    </script>
    <script id="dialogTemplate" type="text/x-jquery-tmpl">
        <form>
	    <label>Név:</label><input type="text" id="dialogName" value="${Name}" style="width: 80%; margin-left: 5px;">
        <label>Leírás:</label><input type="text" id="dialogDescription" value="${Description}" style="width: 80%; margin-left: 5px;">
        <label>Típus:</label><select id="dialogType"></select>
        <label>Altípus:</label><select id="dialogSubType"></select>
        </form>
    </script>
    <!-- Templates -->
    <h2>
        Oszlopok
    </h2>
    <p>
        <form class="simple">
        <label>Tábla :</label>
        <select id="Table"></select>
        </form>
    </p>
    <p>
        <div id="placeholderColumn" style="margin-top: 30px; margin-bottom: 10px">
        <table cellspacing="1" class="qbtable" style="width: 99%" >
            <thead>
                <tr>
                    <th class="ui-state-default" style="text-align:left !important;  width: 20% !important; padding-left: 5px;">
                        Név
                    </th>
                    <th class="ui-state-default"  style="text-align:left !important; width: 50% !important; padding-left: 5px;">
                        Leírás
                    </th>
                    <th class="ui-state-default"  style="text-align:left !important; width: 10% !important; padding-left: 5px;">
                        Típus / hossz
                    </th>
                    <th class="ui-state-default"  colspan="2" style="text-align:center !important; width: 40% !important; padding-left: 5px;">
                        Funkciók
                    </th>
                </tr>
            </thead>
            <tbody id="rowPlaceholder">
            </tbody>
        </table>
        </div>
    </p>

</asp:Content>
