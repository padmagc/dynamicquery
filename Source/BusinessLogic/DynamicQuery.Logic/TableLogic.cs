using System.Collections.Generic;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;
using DynamicQueryTable = DynamicQuery.Entity.Documentation.DynamicQueryTable;

namespace DynamicQuery.Logic
{
    public class TableLogic
    {
        public List<DynamicQueryTable> GetTables()
        {
            var tables = new List<DynamicQueryTable>();

            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTable
                    .Include("DynamicQueryAssociation")
                    .Include("DynamicQueryTableColumn")
                    .Include("DynamicQueryCalculatedColumn");

                foreach (var dynamicQueryTable in t)
                {
                    tables.Add(Mapping.Mapping.ConvertDataAccessDynamicQueryTableToEntityDynamicQueryTable(dynamicQueryTable, true));                    
                }

            }

            return tables;
        }
    }
}
