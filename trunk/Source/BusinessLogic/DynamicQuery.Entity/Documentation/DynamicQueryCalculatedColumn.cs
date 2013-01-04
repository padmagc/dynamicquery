using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicQuery.Entity.Documentation
{
    public class DynamicQueryCalculatedColumn
    {
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
        /// SQL
        /// </summary>
        public string Sql { get; set; }
        /// <summary>
        /// Mező típus
        /// </summary>
        public int? Type { get; set; }
        public int? SubType { get; set; }
        public bool CalculatedField { get; set; }
        public List<DynamicQueryTable> Tables { get; set; }
        public bool Active { get; set; }
        public int TableId { get; set; }

        public DynamicQueryCalculatedColumn()
        {
            Tables = new List<DynamicQueryTable>();
        }

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
