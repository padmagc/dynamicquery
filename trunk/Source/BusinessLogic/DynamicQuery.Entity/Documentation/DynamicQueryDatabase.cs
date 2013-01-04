using System.Collections.Generic;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryDatabase
    {
        #region Properties
        /// <summary>
        /// Táblák
        /// </summary>
        public List<DynamicQueryTable> Tables { get; set; }
        /// <summary>
        /// Association
        /// </summary>
        public List<DynamicQueryTableAssociation> Associations { get; set; }
        #endregion

        #region Konstruktor
        public DynamicQueryDatabase()
        {
            Tables = new List<DynamicQueryTable>();
            Associations = new List<DynamicQueryTableAssociation>();
        }
        #endregion

    }
}
