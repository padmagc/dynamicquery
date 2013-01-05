<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Documentation.aspx.cs" Inherits="DynamicQuery.Web.Documentation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="./Scripts/Pages/Documentation.js"></script>
    <h2>
        Dokumentációs adatbázis létrehozása
    </h2>
    <p>
        Táblák, mezők leírásának elmentése a QBDynamicQuery adatbázisba, valamint a táblák közötti kapcsolatok lementése. A generálás ideje alatt a generátor nem használható!
    </p>
    <p>
        <br/>
        <button type="button" id="btnGenerate" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
            <span class="ui-button-text">Dokumentációs adatbázis frissítése</span>
        </button>
    </p>
    <p>
        <br/>
        <div id="progressbar">
            <span style="position: absolute;display: block;width: 94%;text-align: center;line-height: 1.9em;" id="percentage"></span>
        </div>
    </p>
    <p>
        <div id="result"></div>
    </p>
</asp:Content>
