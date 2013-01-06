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
    <!-- Templates -->
    <p>
        <div id="placeholderColumnType" style="margin-top: 10px; margin-bottom: 10px">
            <table cellspacing="1" style="width: 70%" >
                <thead>
                    <tr>
                        <th class="ui-state-default" style="text-align:left !important;  width: 20% !important">
                            Azonosító
                        </th>
                        <th class="ui-state-default" style="text-align:left !important;  width: 60% !important;">
                            Név
                        </th>
                        <th class="ui-state-default" colspan="2" style="text-align:center !important; width: 20% !important;">
                            Funkciók
                        </th>
                    </tr>
                </thead>
                <tbody id="placeholderColumnRows">
                </tbody>
            </table>
        </div>
    </p>
</asp:Content>
