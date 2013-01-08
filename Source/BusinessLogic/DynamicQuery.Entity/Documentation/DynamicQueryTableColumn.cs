using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryTableColumn
    {
        #region Properties
        public int Id { get; set; }
        /// <summary>
        /// Mező neve
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Mező leírás
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Mező típus
        /// </summary>
        public int? Type { get; set; }
        public int? SubType { get; set; }
        public string ColumnType { get; set; }
        /// <summary>
        /// Mező hossz
        /// </summary>
        public int Length { get; set; }
        /// <summary>
        /// Mező decimális hossz
        /// </summary>
        public int DecimalLength { get; set; }
        
        public bool CalculatedField { get; set; }
        public bool Active { get; set; }
        public int TableId { get; set; }
        public string TableName { get; set; }
        #endregion

        #region Konstruktor
        #endregion

        #region Methods
        /// <summary>
        /// Mező neve, alap esetben a description egyébként a mező neve
        /// </summary>
        /// <returns></returns>
        public string GetColumnDescription()
        {
            return !String.IsNullOrEmpty(Description) ? Description : Name;
        }
        #endregion
    }
}
