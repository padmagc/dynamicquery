using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using DynamicQuery.Core;
using DynamicQuery.Entity.Documentation;
using DynamicQuery.Logic;

namespace DynamicQuery.Web
{
    public partial class Documentation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// Táblák lekérdezése
        /// </summary>
        /// <returns></returns>
        [WebMethod(true)]
        public static List<string> GetTables()
        {
            try
            {
                var db = new Database();
                return db.Tables.Select(s => s.Name).ToList();
            }
            catch (Exception ex)
            {
                throw new UIException("Hiba a táblák lekérdezésénél", ex);
            }
        }
        /// <summary>
        /// Dokumentáció generálása az adott táblához
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        [WebMethod(true)]
        public static List<string> GenerateDocumentation(string tableName)
        {
            var result = new List<string>();
            try
            {
                var db = new Database();
                var table = db.Tables.SingleOrDefault(w => w.Name == tableName);
                if (table == null) throw new Exception("Ismeretlen tábla név : " + tableName);
                var generator = new DocumentationGenerator();
                generator.SaveDocumentation(table);
                result.Add("Ok");
            }
            catch (Exception ex)
            {
                result.Add("Error");
                result.Add(ex.Message);
            }
            return result;
        }
    }
}