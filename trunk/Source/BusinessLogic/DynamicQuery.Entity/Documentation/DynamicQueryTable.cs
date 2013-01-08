using System.Collections.Generic;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryTable
    {
        #region Properties
        public int Id { get; set; }
        /// <summary>
        /// Tábla neve
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SqlFormat { get; set; }
        /// <summary>
        /// Tábla mezők
        /// </summary>
        public List<DynamicQueryTableColumn> Columns { get; set; }
        /// <summary>
        /// Kalkulált mezők
        /// </summary>
        public List<DynamicQueryCalculatedColumn> CalculatedColumns { get; set; }
        /// <summary>
        /// Tábla kapcsolatok
        /// </summary>
        public List<DynamicQueryTableAssociation> Associations { get; set; }
        #endregion

        #region Konstruktor
        public DynamicQueryTable()
        {
            Columns = new List<DynamicQueryTableColumn>();
            Associations = new List<DynamicQueryTableAssociation>();
            CalculatedColumns = new List<DynamicQueryCalculatedColumn>();
        }
        public DynamicQueryTable(string tableName) : this()
        {
            Name = tableName;
        }
        #endregion
    }
}
