using System;
using System.Data;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;

namespace DynamicQuery.Logic
{
    public class FieldLogic
    {
        public void SetStatus(int id)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableColumn.SingleOrDefault(w => w.Id == id);
                if (t == null) throw new Exception("Ismeretlen mező");

                t.Active = !t.Active;
                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }
        public void NewField(Entity.Documentation.DynamicQueryTableColumn column)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var field = new DynamicQueryTableColumn()
                {
                    Description = column.Description,
                    Active = true,
                    Name = column.Name,
                    Type = column.Type.HasValue ? column.Type.Value : 0,
                    SubType = column.SubType.HasValue ? column.SubType.Value : 0,
                    TableId = column.TableId
                };

                context.DynamicQueryTableColumn.AddObject(field);
                context.SaveChanges();
            }
        }
        public void UpdateField(Entity.Documentation.DynamicQueryTableColumn column)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var field = context.DynamicQueryTableColumn.SingleOrDefault(w => w.Id == column.Id);
                if (field == null) throw new Exception("Ismeretlen mező");

                field.Description = !String.IsNullOrEmpty(column.Description) ? column.Description : field.Description;
                field.Active = true;
                field.Name = !String.IsNullOrEmpty(column.Name) ? column.Name : field.Name;
                // TODO
                field.Type = column.Type.HasValue && column.Type.Value != -1 ? column.Type.Value : (int?)null;
                field.SubType = column.SubType.HasValue && column.SubType.Value != -1 ? column.SubType.Value : (int?)null;
                field.LastChangeDate = DateTime.Now;
                //field.TableId = column.TableId;

                context.SaveChanges();
            }
        }
    }
}
