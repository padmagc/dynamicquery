﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CalculatedColumn.aspx.cs" Inherits="DynamicQuery.Web.CalculatedColumn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="Scripts/Pages/CalculatedColumn.js"></script>
    <!-- Templates -->
    <script id="rowTemplate" type="text/x-jquery-tmpl">
        {{if Active == true}}
        <tr>
        {{else}}
        <tr style="background-color: #FF9999">
        {{/if}}
            <td style="padding-left: 5px;">${Name}</td>
            <td style="padding-left: 5px;">${Description}</td>
            <td style="padding-left: 5px;">${Sql} AS ${SqlName} {{if GroupBy }} (GroupBy) {{/if}} </td>
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
    <div id="ccdialog" title="Dinamikus mező">
			<div id="accordion">
				<form action="">
					<h3><a href="#" id="dialogColumnData">Oszlop adatok</a></h3>
					<div>
					    <label>Név:</label><input type="text" id="dialogName"/>
					    <label>Leírás:</label><input type="text"  id="dialogDescription"/>
					    <label>SQL:</label><input type="text"  id="dialogSQL"/>
						<label>Típus:</label><select id="dialogType"></select>
						<label>Altípus:</label><select id="dialogSubType"></select>
					</div>
					<h3><a href="#">SQL</a></h3>
					<div>
						<label>Tábla:</label><select id="builderTable"></select>
						<label>Mező:</label><select id="builderColumn"></select>
                        <label>Operátor:</label><select id="builderSQLOperator"></select>
					    <label>Név:</label><input type="text" id="builderSQLName"/>
					    <label>Sql:</label><textarea  id="builderSQL" rows="3" ></textarea>
                        <span id="warning"></span>
					</div>
				</form>
			</div>
		</div>	     

    <!-- Templates -->
    <h2>
        Dinamikus oszlop
    </h2>
    <p>
        <form class="simple">
        <label>Tábla :</label>
        <select id="Table"></select>
        </form>
    </p>
    <p>
        <div id="placeholderColumn" style="margin-top: 30px; margin-bottom: 10px">
            <table cellspacing="1"  class="qbtable"  style="width: 99%" >
                <thead>
                    <tr>
                        <th class="ui-state-default"  style="text-align:left !important;  width: 20% !important; padding-left: 5px;">
                            Név
                        </th>
                        <th class="ui-state-default"  style="text-align:left !important; width: 30% !important; padding-left: 5px;">
                            Leírás
                        </th>
                        <th class="ui-state-default"  style="text-align:left !important; width: 30% !important; padding-left: 5px;">
                            SQL
                        </th>
                        <th class="ui-state-default"  colspan="2" style="text-align:center !important; width: 20% !important; padding-left: 5px;">
                            Funkciók
                        </>
                    </tr>
                </thead>
                <tbody id="rowPlaceholder">
                </tbody>
            </table>
        </div>
    </p>
    <p>
        <button type="button" id="btnNewCalculatedColumn" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only biggerbutton" style="visibility: hidden" role="button" aria-disabled="false">
            <span class="ui-button-text biggertext">Új összreakott oszlop</span>
        </button>
    </p>
</asp:Content>
