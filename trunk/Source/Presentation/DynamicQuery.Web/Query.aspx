﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Query.aspx.cs" Inherits="DynamicQuery.Web.Query" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="Scripts/Pages/Query.js"></script>
        <!-- Templates -->
    <script id="queryRowTemplate" type="text/x-jquery-tmpl">
        {{if Active == true}}
        <tr>
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Name}</td>
            <td style="padding-left: 5px;">${Description}</td>
            <td style="text-align: center !important; padding-left: 5px;">
            {{if Active == true}}
                <a href="javascript:void(0);" class="inactive">Inaktivál</a>
            {{else}}
                <a href="javascript:void(0);" class="active" >Aktivál</a>
            {{/if}}
            <a href="javascript:void(0);" class="load" >Betölt</a>
            </td>
        </tr>
    </script>
    <script id="columnRowTemplate" type="text/x-jquery-tmpl">
        {{if Active == true}}
            {{if Calculated == true}}
                <tr style="background-color: #E0ECF8">
            {{else}}
                <tr>
            {{/if}}
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Name}</td>
            <td style="padding-left: 5px;">${Description}</td>
            <td style="padding-left: 5px;">${Other}</td>
            <td style="text-align: center !important; padding-left: 5px;">
            {{if Active == true}}
                {{if Selected == true }}
                    <a href="javascript:void(0);" class="removecolumn">Töröl</a>
                {{else}}
                    <a href="javascript:void(0);" class="addcolumn">Kiválaszt</a>
                {{/if}}                
                {{if Calculated == false}}
                <a href="javascript:void(0);" class="where" >Feltétel</a>
                    {{if IsOrderBy == true }}
                        <a href="javascript:void(0);" class="removeorderby" >Nem rendez</a>
                    {{else}}
                        <a href="javascript:void(0);" class="addorderby" >Rendez</a>
                    {{/if}}                
                {{/if}}
            {{/if}}
            </td>
        </tr>
     </script>
    <!-- Templates -->
    <div id="dialogOrderBy" title="Mező rendezés">
        <form action="">
            <div>
                <label>Irány :</label>
                <select id="OrderByDirection">
                    <option id="asc">Csökkenő</option>
                    <option id="desc">Növekvő</option>
                </select>
            </div>
        </form>
    </div>
    <div id="dialogWhere" title="Feltétel">
        <form action="">
            <div>
                <div id="filters" style="width:100%; height: 100%"></div>
            </div>
        </form>
    </div>
    <!-- Dialog -->
    <div id="wizard" class="swMain">
        <ul>
  			<li>
  			    <a href="#step-1">
                    <span class="stepDesc">
                        <label>1</label>
                        <small>Mentett lekérdezések</small>
                    </span>
  			    </a>
            </li>
  			<li>
  			    <a href="#step-2">
                    <span class="stepDesc">
                        <label>2</label>
                        <small>Lekérdezés adatok</small>
                    </span>
                </a>
  			</li>
  			<li>
  			    <a href="#step-3">
                    <span class="stepDesc">
                        <label>3</label>
                        <small>Cikk csoportok</small>
                    </span>
                </a>
  			</li>
            <li>
  			    <a href="#step-4">
                    <span class="stepDesc">
                        <label>4</label>
                        <small>Táblák és mezők</small>
                    </span>
                </a>
  			</li>
            <li>
  			    <a href="#step-5">
                    <span class="stepDesc">
                        <label>5</label>
                        <small>Eredmény</small>
                    </span>
                </a>
  			</li>
  		</ul>
        <div id="step-1">
            <h2 class="StepTitle">Mentett lekérdezések választása / Új lekérdezés létrehozása</h2>
            <p>
                <div id="placeholderQuery" style="margin-top: 10px; margin-bottom: 10px">
                    <button type="button" id="btnNewQuery" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                        <span class="ui-button-text">Új lekérdezés</span>
                    </button>                    
                    <table cellspacing="1" style="width: 99%" >
                        <thead>
                            <tr>
                                <th style="text-align:left !important;  width: 30% !important; padding-left: 5px;">
                                    Név
                                </th>
                                <th style="text-align:left !important; width: 50% !important; padding-left: 5px;">
                                    Leírás
                                </th>
                                <th colspan="2" style="text-align:center !important; width: 20% !important; padding-left: 5px;">
                                    Funkciók
                                </th>
                            </tr>
                        </thead>
                        <tbody id="queryRowPlaceholder">
                        </tbody>
                    </table>
                </div>
            </p>

        </div>	
        <div id="step-2">
            <h2 class="StepTitle">Lekérdezés adatai</h2>
            <table style="width: 100%">
                <tr>
                    <td style="width: 15%">
                        <label>Lekérdezés neve:</label>        
                    </td>
                    <td style="width: 95%">
                        <input type="text" id="QueryName" style="width: 95%; margin-left: 5px;" />        
                    </td>
                </tr>
                <tr>
                    <td style="width: 15%">
                        <label>Leírás:</label>        
                    </td>
                    <td style="width: 95%">
                        <textarea rows="3" id="QueryDescription" style="width: 95%; margin-left: 5px;"></textarea>
                    </td>
                </tr>
            </table>
        </div>	
        <div id="step-3">
            <h2 class="StepTitle">Cikk csoport választás</h2>

        </div>	
        <div id="step-4">
            <h2 class="StepTitle">Mező, feltétel vagy rendezés hozzáadása a lekérdezéshez</h2>
            <form>
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="width: 5%;">
                            <label>Tábla:</label>        
                        </td>
                        <td style="width: 30%;">
                            <select id="Table" style="float: left;width: 100%;"></select>
                        </td>
                        <td style="width: 5%;">
                            <label>Típus:</label>        
                        </td>
                        <td style="width: 15%;">
                            <select id="ColumnType" style="float: left;width: 100%;"></select>
                        </td>
                        <td style="width: 7%;">
                            <label style="width: 60%;">Al típus:</label>        
                        </td>
                        <td style="width: 15%;">
                            <select id="ColumnSubType" style="float: left;width: 95%;"></select>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
            <div id="placeholderColumns" style="margin-top: 10px; margin-bottom: 10px; width: 99%">
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left !important;  width: 20% !important; padding-left: 5px;">
                            Név
                        </th>
                        <th style="text-align:left !important; width: 40% !important; padding-left: 5px;">
                            Leírás
                        </th>
                        <th style="text-align:left !important; width: 30% !important; padding-left: 5px;">
                            Egyéb
                        </th>
                        <th colspan="2" style="text-align:center !important; width: 40% !important; padding-left: 5px;">
                            Funkciók
                        </th>
                    </tr>
                </thead>
                <tbody id="columnRowPlaceholder">
                </tbody>
            </table>
            </div>
        </div>	
        <div id="step-5">
            <h2 class="StepTitle">Eredmény</h2>
            <button type="button" id="btnSaveQuery" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                <span class="ui-button-text">Lekérdezés mentése</span>
            </button>
             <table id="dataToSave" style="width: 99%; padding-top: 5px; visibility: visible">
                <tr>
                    <td style="width: 20%"><label>Adatok :</label></td>
                    <td>
                        <div id="queryDataResult"></div>
                    </td>
                </tr>
            </table>
        </div>	
    </div>
</asp:Content>
