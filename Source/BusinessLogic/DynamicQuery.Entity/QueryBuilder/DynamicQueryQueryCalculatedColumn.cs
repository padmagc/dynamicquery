using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.QueryBuilder
{
    public class DynamicQueryQueryCalculatedColumn
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string TableName { get; set; }
        public int ColumnId { get; set; }
        public string ColumnName { get; set; }
        public bool Calculated { get; set; }
        public bool IsSelected { get; set; }
    }
}
