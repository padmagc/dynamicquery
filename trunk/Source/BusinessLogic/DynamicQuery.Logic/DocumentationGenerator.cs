using System;
using System.Data;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;
using DynamicQueryTable = DynamicQuery.Entity.Documentation.DynamicQueryTable;

namespace DynamicQuery.Logic
{
    public class DocumentationGenerator
    {
        public void SaveDocumentation(DynamicQueryTable table)
        {
            var now = DateTime.Now;
            using (var context = new QbDynamicQueryEntities())
            {
                var record = context.DynamicQueryTable.SingleOrDefault(w => w.Name == table.Name);
                if(record != null)
                {
                    record.Active = false;
                    foreach (var column in record.DynamicQueryTableColumn)
                    {
                        column.Active = false;
                        column.LastChangeDate = now;
                    }
                    foreach (var association in record.DynamicQueryAssociation)
                    {
                        association.Active = false;
                        association.LastChangeDate = now;
                    }
                    context.SaveChanges();
                }

                if (record == null) {
                    record = new DynaimcQuery.QueryBuilderDataAccess.DynamicQueryTable
                                 {
                                     Name = table.Name, 
                                     LastChangeDate = now, 
                                     Active = true
                                 };
                }
                // Association
                foreach (var association in table.Associations)
                {
                    var a =
                        record.DynamicQueryAssociation.SingleOrDefault(
                            w =>
                            w.PrimaryKeyTable.Equals(table.Name) &&
                            w.PrimaryKeyTableColumn.Equals(association.PrimaryKeyColumn) &&
                            w.ForeignKeyTable.Equals(association.ForeignKeyTable) &&
                            w.ForeignKeyTableColumn.Equals(association.ForeignKeyColumn)) ?? new DynamicQueryAssociation();

                    a.PrimaryKeyTable = association.PrimaryKeyTable;
                    a.PrimaryKeyTableColumn = association.PrimaryKeyColumn;
                    a.ForeignKeyTable = association.ForeignKeyTable;
                    a.ForeignKeyTableColumn = association.ForeignKeyColumn;
                    a.Active = true;
                    a.LastChangeDate = now;
                    a.Name = association.Name;

                    if (a.Id == 0)
                    {
                        record.DynamicQueryAssociation.Add(a);
                    }
                }

                // Column
                foreach (var column in table.Columns)
                {
                    var c = record.DynamicQueryTableColumn.SingleOrDefault(w => w.Name == column.Name) ?? new DynamicQueryTableColumn();

                    c.Name = column.Name;
                    c.ColumnType = column.ColumnType;
                    c.Description = column.Description;
                    c.Length = column.Length;
                    c.Precision = column.DecimalLength;
                    c.Active = true;
                    c.LastChangeDate = now;
                    c.Type = column.Type == 0 ? 1 : column.Type;
                    c.SubType = column.SubType ?? null;

                    if (c.Id == 0)
                    {
                        record.DynamicQueryTableColumn.Add(c);
                    }
                }


                if (record.Id == 0)
                {
                    context.DynamicQueryTable.AddObject(record);
                }
                else
                {
                    context.ObjectStateManager.ChangeObjectState(record, EntityState.Modified);
                }
                context.SaveChanges();

            }
        }
    }
}
