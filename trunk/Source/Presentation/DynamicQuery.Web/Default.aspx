<%@ Page Title="Kezdőlap" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="DynamicQuery.Web._Default" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <script type="text/javascript" src="./Scripts/Pages/Default.js"></script>
   <h2>
        Üdvözöllek a <b>Quadro Byte</b> dinamikus lekérdezés varázslójában!
    </h2>
    <p>
        A következő műveleteket tudod itt elvégezni
        <ul>
            <li>Dokumentációs adatbázis létrehozása a táblákhoz és a mezőkhöz</li>
            <li>Típusok - altípusok definiálása, amelyet a mezőkhöz lehet rendelni</li>
            <li>Táblák - mezők megtekintése</li>
            <li>Kalkulált mezők létrehozása</li>
            <li>Lekérdezések létrehozása, módosítása, logikai törlése</li>
        </ul>
    </p>
</asp:Content>
