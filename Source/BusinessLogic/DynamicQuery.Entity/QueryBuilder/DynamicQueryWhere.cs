﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.QueryBuilder
{
    public class DynamicQueryWhere
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string TableName { get; set; }
        public int ColumnId { get; set; }
        public string ColumnName { get; set; }
        public string Operator { get; set; }
        public string Data { get; set; }
        public int GroupLevel { get; set; }
        public string GroupOperator { get; set; }
    }
}
