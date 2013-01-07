using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;
using DynamicQuery.Entity.QueryBuilder;

namespace DynamicQuery.Logic
{
    public class FieldTypeLogic
    {
        public List<FieldType> GetTypes()
        {
            List<FieldType> types;

            using (var context = new QbDynamicQueryEntities())
            {
                types = context.DynamicQueryTableType
                    .AsEnumerable()
                    .Select(s => new FieldType
                                     {
                                         Name = s.Name,
                                         Id = s.Id,
                                         Active = s.Active,
                                         SubType = s.DynamicQueryTableSubType
                                                            .AsEnumerable()
                                                            .Select(st => new FieldType
                                                                              {
                                                                                  Name = st.Name,
                                                                                  Id = st.Id,
                                                                                  Active = st.Active 
                                                                              }).ToList()
                                     }).ToList();
            }
            
            return types;
        }
        public FieldType GetType(int id)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var type = context.DynamicQueryTableType.SingleOrDefault(w => w.Id == id);
                if(type == null) throw new Exception("Ismeretlen típus");

                return new FieldType
                           {
                               Name = type.Name,
                               Id = type.Id,
                               Active = type.Active,
                               SubType = type.DynamicQueryTableSubType
                                   .AsEnumerable()
                                   .Select(st => new FieldType
                                                     {
                                                         Name = st.Name,
                                                         Id = st.Id,
                                                         Active = st.Active
                                                     }).ToList()
                           };
            }
        }

        public void UpdateType(FieldType type)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableType.SingleOrDefault(w => w.Id == type.Id);
                if (t == null) throw new Exception("Ismeretlen típus");
                if (t.Active)
                {
                    t.Name = type.Name;
                }
                t.Active = true;
                
                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }

        public void UpdateSubType(FieldType subType)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableSubType.SingleOrDefault(w => w.Id == subType.Id);
                if (t == null) throw new Exception("Ismeretlen típus");

                if (t.Active)
                {
                    t.Name = subType.Name;
                }
                t.Active = true;

                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }

        public void SetTypeStatus(FieldType type)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableType.SingleOrDefault(w => w.Id == type.Id);
                if(t == null) throw new Exception("Ismeretlen típus");

                t.Active = !t.Active;
                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }

        public void SetSubTypeStatus(FieldType subType)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableSubType.SingleOrDefault(w => w.Id == subType.Id);
                if (t == null) throw new Exception("Ismeretlen típus");

                t.Active = !t.Active;
                context.ObjectStateManager.ChangeObjectState(t, EntityState.Modified);
                context.SaveChanges();
            }
        }

        public void NewType(FieldType type)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = new DynamicQueryTableType
                            {
                                Name = type.Name,
                                Active = true
                            };

                context.DynamicQueryTableType.AddObject(t);
                context.SaveChanges();
            }
        }

        public void NewSubType(int typeId, FieldType subType)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var t = context.DynamicQueryTableType.SingleOrDefault(w => w.Id == typeId);
                if (t == null) throw new Exception("Ismeretlen típus");

                var st = new DynamicQueryTableSubType()
                {
                    Name = subType.Name,
                    Active = true
                };

                t.DynamicQueryTableSubType.Add(st);

                context.SaveChanges();
            }
        }
    }
}
