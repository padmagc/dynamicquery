using System;
using System.Collections.Generic;
using System.Web.Services;
using DynamicQuery.Core;
using DynamicQuery.Entity.Documentation;
using DynamicQuery.Logic;
using DynamicQuery.Logic.QueryBuilder;

namespace DynamicQuery.Web.Services
{
    /// <summary>
    /// Summary description for Query
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Query : WebService
    {

        [WebMethod(true)]
        public List<Entity.QueryBuilder.DynamicQueryQuery> GetQueries()
        {
            try
            {
                var q = new QueryLogic();
                return q.GetQueries();
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SetStatus(int id)
        {
            try
            {
                var q = new QueryLogic();
                q.SetStatus(id);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void UpdateQuery(Entity.QueryBuilder.DynamicQueryQuery query)
        {
            try
            {
                var q = new QueryLogic();
                q.UpdateQuery(query);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void NewQuery(Entity.QueryBuilder.DynamicQueryQuery query)
        {
            try
            {
                var q = new QueryLogic();
                q.NewQuery(query);
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public string GenerateQuery(Entity.QueryBuilder.DynamicQueryQuery query)
        {
            try
            {
                var builder = new QueryBuilder();
                foreach (var column in query.Columns)
                {
                    if(column.IsSelected)
                    {
                        builder.AddColumn(new DynamicQueryTableColumn
                                              {
                                                  CalculatedField = column.Calculated,
                                                  Name = column.ColumnName,
                                                  TableName = column.TableName
                                              });
                    }
                }
                return builder.ToString();
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
    }
}
