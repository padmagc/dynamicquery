using System;
using System.Collections.Generic;
using System.Web.Services;
using DynamicQuery.Core;
using DynamicQuery.Logic;

namespace DynamicQuery.Web.Services
{
    /// <summary>
    /// Summary description for TablesAndColumns
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class TableAndColumn : WebService
    {
        [WebMethod(true)]
        public List<Entity.Documentation.DynamicQueryTable> GetTables()
        {
            try
            {
                var t = new TableLogic();
                return t.GetTables();
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SetColumnStatus(int columnId)
        {
            try
            {
                var f = new FieldLogic();
                f.SetStatus(columnId);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SetCalculateColumnStatus(int columnId)
        {
            try
            {
                var f = new CalculatedFieldLogic();
                f.SetStatus(columnId);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void UpdateColumn(Entity.Documentation.DynamicQueryTableColumn column)
        {
            try
            {
                var f = new FieldLogic();
                f.UpdateField(column);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void UpdateCalculatedColumn(Entity.Documentation.DynamicQueryCalculatedColumn column)
        {
            try
            {
                var f = new CalculatedFieldLogic();
                f.UpdateCalculatedField(column);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void NewCalculatedColumn(Entity.Documentation.DynamicQueryCalculatedColumn column)
        {
            try
            {
                var f = new CalculatedFieldLogic();
                f.NewCalculatedColumn(column);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public List<string> HasConnectionBetweenTables(List<string> tables)
        {
            try
            {
                var q = new DynamicQuery.Logic.QueryBuilder.QueryBuilder();
                return q.HasConnectionBetweenTables(tables);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
    }
}
