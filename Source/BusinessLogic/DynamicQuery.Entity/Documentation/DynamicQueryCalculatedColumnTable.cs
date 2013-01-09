using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryCalculatedColumnTable
    {
        public int TableId { get; set; }
        public string TableName { get; set; }
        public int ColumnId { get; set; }
        public string ColumnName { get; set; }
        public int Count { get; set; }
    }
}
