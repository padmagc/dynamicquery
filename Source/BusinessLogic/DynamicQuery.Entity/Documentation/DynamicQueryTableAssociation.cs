using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryTableAssociation
    {
        #region Properties
        public int Id { get; set; }
        /// <summary>
        /// Kapcsolat neve
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Külső kulcsot tartalmazó tábla 
        /// </summary>
        public string ForeignKeyTable { get; set; }
        /// <summary>
        /// Külső kulcs mező
        /// </summary>
        public string ForeignKeyColumn { get; set; }
        /// <summary>
        /// Primary kulcsot tartalmazó tábla 
        /// </summary>
        public string PrimaryKeyTable { get; set; }
        /// <summary>
        /// Primary kulcs mező
        /// </summary>
        public string PrimaryKeyColumn { get; set; }
        /// <summary>
        /// Távolság
        /// </summary>
        public int Cost { get; set; }

        #endregion

        #region Konstruktor
        #endregion

        #region Functions
        public override string ToString()
        {
            return String.Format(" INNER JOIN {0} ON {1}.{2} = {3}.{4}", ForeignKeyTable, PrimaryKeyTable, PrimaryKeyColumn, ForeignKeyTable, ForeignKeyColumn);
        }
        #endregion
    }
}
