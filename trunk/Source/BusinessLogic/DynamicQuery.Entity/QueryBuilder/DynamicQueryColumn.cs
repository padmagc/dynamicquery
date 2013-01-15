using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.QueryBuilder
{
    public class DynamicQueryColumn
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string TableName { get; set; }
        public int ColumnId { get; set; }
        public string ColumnName { get; set; }
        public string ColumnSqlName { get; set; }
        public bool IsSelected { get; set; }
        public bool IsWhere { get; set; }
        public bool IsOrderBy { get; set; }
        public string Direction { get; set; }
        public int? Position { get; set; }
    }
}
