<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ColumnType.aspx.cs" Inherits="DynamicQuery.Web.ColumnType" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="./Scripts/Pages/ColumnType.js"></script>
    <h2>
        Oszlop típusok és altípusok
    </h2>
    <!-- Templates -->
    <script id="rowTemplateType" type="text/x-jquery-tmpl">
        {{if Active == true}}
        <tr>
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Id}</td>
            <td style="padding-left: 5px;">${Name}</td>
            <td style="text-align: center !important; padding-left: 5px;">
            <a href="javascript:void(0);" class="selecttype" >Altípusok</a>
            <a href="javascript:void(0);" class="updatetype" >Módosít</a>
            {{if Active == true}}
                <a href="javascript:void(0);" class="inactivetype">Inaktivál</a>
            {{else}}
                <a href="javascript:void(0);" class="activetype" >Aktivál</a>
            {{/if}}
            </td>
        </tr>
    </script>
    <script id="rowTemplateSubType" type="text/x-jquery-tmpl">
        {{if Active == true}}
        <tr>
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Id}</td>
            <td style="padding-left: 5px;">${Name}</td>
            <td style="text-align: center !important; padding-left: 5px;">
            <a href="javascript:void(0);" class="updatesubtype" >Módosít</a>
            {{if Active == true}}
                <a href="javascript:void(0);" class="inactivesubtype">Inaktivál</a>
            {{else}}
                <a href="javascript:void(0);" class="activesubtype" >Aktivál</a>
            {{/if}}
            </td>
        </tr>
    </script>
    <script id="dialogTypeTemplate" type="text/x-jquery-tmpl">
	    <label>Név:</label><input type="text" id="dialogTypeName" value="${Name}" style="width: 80%; margin-left: 5px;">
    </script>
    <script id="dialogSubTypeTemplate" type="text/x-jquery-tmpl">
	    <label>Név:</label><input type="text" id="dialogSubTypeName" value="${Name}" style="width: 80%; margin-left: 5px;">
    </script>
    <!-- Templates -->
    <p>
        <div id="placeholderColumnType" style="margin-top: 10px; margin-bottom: 10px">
            <table cellspacing="1" class="qbtable" style="width: 95%" >
                <thead>
                    <tr>
                        <th class="ui-state-default" style="text-align:left !important;  width: 10% !important">
                            Azonosító
                        </th>
                        <th class="ui-state-default" style="text-align:left !important;  width: 50% !important;">
                            Név
                        </th>
                        <th class="ui-state-default" colspan="2" style="text-align:center !important; width: 20% !important;">
                            Funkciók
                        </th>
                    </tr>
                </thead>
                <tbody id="placeholderColumnTypeRows">
                </tbody>
            </table>
        </div>
    </p>
    <p>
        <button type="button" id="btnNewColumnType" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only biggerbutton" role="button" aria-disabled="false">
            <span class="ui-button-text biggertext">Új típus</span>
        </button>
    </p>
    <div id="divColumnSubType" style="visibility: hidden">
        <p>
            <div id="placeholderColumnSubType" style="margin-top: 10px; margin-bottom: 10px">
                <table cellspacing="1" class="qbtable"  style="width: 95%" >
                    <thead>
                        <tr>
                            <th class="ui-state-default" style="text-align:left !important;  width: 10% !important">
                                Azonosító
                            </th>
                            <th class="ui-state-default" style="text-align:left !important;  width: 50% !important;">
                                Név
                            </th>
                            <th class="ui-state-default" colspan="2" style="text-align:center !important; width: 20% !important;">
                                Funkciók
                            </th>
                        </tr>
                    </thead>
                    <tbody id="placeholderColumnSubTypeRows">
                    </tbody>
                </table>
            </div>
        </p>
        <p>
            <button type="button" id="btnNewColumnSubType" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only biggerbutton" role="button" aria-disabled="false">
                <span class="ui-button-text biggertext">Új altípus</span>
            </button>
        </p>
    </div>
</asp:Content>
