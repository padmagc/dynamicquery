using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.QueryBuilder
{
    public class DynamicQueryQuery
    {
        #region Properties
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public List<DynamicQueryColumn> Columns { get; set; }
        public List<DynamicQueryWhere> Where { get; set; }
        #endregion

        #region Konstruktor
        public DynamicQueryQuery()
        {
            Columns = new List<DynamicQueryColumn>();
            Where = new List<DynamicQueryWhere>();
        }
        #endregion
    }
}
