using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using DynamicQuery.Entity.Documentation;

// ReSharper disable CheckNamespace
namespace DynamicQuery.Web
// ReSharper restore CheckNamespace
{
    public class TableRoute
    {public string Table;
        public List<DynamicQueryTableAssociation> Associations;
        public int Depth;

        public TableRoute()
        {
            Associations = new List<DynamicQueryTableAssociation>();
        }

        public override string ToString()
        {
            return "Table :" + Table + ", Depth: " + Depth.ToString(CultureInfo.InvariantCulture);
        }
    }
}