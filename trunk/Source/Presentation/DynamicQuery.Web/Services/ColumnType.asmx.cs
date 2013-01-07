using System;
using System.Collections.Generic;
using System.Web.Services;
using DynamicQuery.Logic;
using DynamicQuery.Core;

namespace DynamicQuery.Web.Services
{
    /// <summary>
    /// Summary description for FieldType
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FieldType : WebService
    {

        [WebMethod]
        public List<Entity.QueryBuilder.FieldType> GetTypes()
        {
            try
            {
                var f = new FieldTypeLogic();
                return f.GetTypes();
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod]
        public void SetTypeStatus(int id)
        {
            try
            {
                var f = new FieldTypeLogic();
                f.SetTypeStatus(new Entity.QueryBuilder.FieldType { Id = id });
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void ActivateType(int id)
        {
            try
            {
                var f = new FieldTypeLogic();
                f.UpdateType(new Entity.QueryBuilder.FieldType { Id = id });
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SaveType(Entity.QueryBuilder.FieldType dto)
        {
            try
            {
                var f = new FieldTypeLogic();
                if (dto.Id > 0)
                    f.UpdateType(new Entity.QueryBuilder.FieldType { Id = dto.Id, Name = dto.Name });
                else
                    f.NewType(new Entity.QueryBuilder.FieldType { Id = dto.Id, Name = dto.Name });
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SetSubTypeStatus(int id)
        {
            try
            {
                var f = new FieldTypeLogic();
                f.SetSubTypeStatus(new Entity.QueryBuilder.FieldType { Id = id });
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }
        [WebMethod(true)]
        public void SaveSubType(int typeId, Entity.QueryBuilder.FieldType dto)
        {
            try
            {
                var f = new FieldTypeLogic();
                if (dto.Id > 0)
                    f.UpdateSubType(new Entity.QueryBuilder.FieldType { Id = dto.Id, Name = dto.Name });
                else
                    f.NewSubType(typeId, new Entity.QueryBuilder.FieldType { Name = dto.Name });
            }
            catch (Exception exception)
            {
                ErrorLog.Log(exception);
                throw;
            }
        }

    }
}
