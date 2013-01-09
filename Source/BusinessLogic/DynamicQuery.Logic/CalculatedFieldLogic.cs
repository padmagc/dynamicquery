using System;
using System.Data;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;

namespace DynamicQuery.Logic
{
    public class CalculatedFieldLogic
    {
        public void SetStatus(int id)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryCalculatedColumn.SingleOrDefault(w => w.Id == id);
                if (t == null) throw new Exception("Ismeretlen mező");

                t.Active = !t.Active;
                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }
        public void NewCalculatedColumn(Entity.Documentation.DynamicQueryCalculatedColumn column)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var calculatedField = new DynamicQueryCalculatedColumn()
                                          {
                                              Description = column.Description,
                                              Active = true,
                                              Name = column.Name,
                                              GroupBy = column.GroupBy,
                                              SQL = column.Sql,
                                              Type = column.Type.HasValue ? column.Type.Value : 0,
                                              SubType = column.SubType.HasValue && column.SubType.Value != -1 ? column.SubType.Value : (int?)null,
                                              LastChangeDate = DateTime.Now,
                                              TableId = column.TableId,
                                              SQLName = column.SqlName
                                          };

                foreach (var tc in column.UsedTablesAndColumns)
                {
                    calculatedField.DynamicQueryCalculatedColumnTable.Add(new DynamicQueryCalculatedColumnTable
                                                                              {
                                                                                  TableId = tc.TableId,
                                                                                  ColumnId = tc.ColumnId
                                                                              });
                }
                

                // TODO

                context.DynamicQueryCalculatedColumn.AddObject(calculatedField);
                context.SaveChanges();
            }
        }
        public void UpdateCalculatedField(Entity.Documentation.DynamicQueryCalculatedColumn column)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var calculatedField = context.DynamicQueryCalculatedColumn.SingleOrDefault(w => w.Id == column.Id);
                if (calculatedField == null) throw new Exception("Ismeretlen mező");

                var deleteQuery = context.DynamicQueryCalculatedColumnTable.Where(w => w.CalculatedColumnId == column.Id).ToList();
                foreach (var o in deleteQuery)
                {
                    context.DynamicQueryCalculatedColumnTable.DeleteObject(o);
                }

                foreach (var tc in column.UsedTablesAndColumns)
                {
                    calculatedField.DynamicQueryCalculatedColumnTable.Add(new DynamicQueryCalculatedColumnTable
                    {
                        TableId = tc.TableId,
                        ColumnId = tc.ColumnId
                    });
                }

                calculatedField.Description = column.Description;
                calculatedField.Active = true;
                calculatedField.Name = column.Name;
                calculatedField.GroupBy = column.GroupBy;
                calculatedField.SQL = column.Sql;
                calculatedField.SQLName = column.SqlName;
                calculatedField.TableId = column.TableId;
                calculatedField.Type = column.Type.HasValue ? column.Type.Value : 0;
                calculatedField.SubType = column.SubType.HasValue && column.SubType.Value != -1
                                              ? column.SubType.Value
                                              : (int?) null;
                calculatedField.LastChangeDate = DateTime.Now;

                context.SaveChanges();
            }
        }

    }
}
