using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.QueryBuilder
{
    public class FieldType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public List<FieldType> SubType { get; set; }

        public FieldType()
        {
            SubType = new List<FieldType>();
            Active = true;
        }
    }
}
