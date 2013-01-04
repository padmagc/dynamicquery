using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DynaimcQuery.QueryBuilderDataAccess;

namespace DynamicQuery.Logic
{
    public class QueryLogic
    {
        public List<Entity.QueryBuilder.DynamicQueryQuery> GetQueries()
        {
            var queries = new List<Entity.QueryBuilder.DynamicQueryQuery>();

            using (var context = new QbDynamicQueryEntities())
            {
                var q = context.DynamicQueryQuery
                    /* Includes */
                    .Include("DynamicQueryColumn")
                    /* Includes */
                    ;
    
                foreach (var query in q)
                {
                    queries.Add(Mapping.Mapping.ConvertDataAccessDynamicQueryQueryToEntityDynamicQueryQuery(query));
                }

            }
            return queries;
        }
        public void SetStatus(int id)
        {
            using (var context = new QbDynamicQueryEntities())
            {
                var q = context.DynamicQueryQuery.SingleOrDefault(w => w.Id == id);
                if (q == null) throw new Exception("Ismeretlen lekérdezés");

                q.Active = !q.Active;
                context.ObjectStateManager.ChangeObjectState(q, EntityState.Modified);
                context.SaveChanges();
            }
        }
        public void NewQuery(Entity.QueryBuilder.DynamicQueryQuery query)
        {
            var now = DateTime.Now;
            using (var context = new QbDynamicQueryEntities())
            {
                var q = new DynamicQueryQuery
                                {
                                    Name = query.Name,
                                    Description = query.Description,
                                    Active = true,
                                    LastChangeDate = now
                                };

                foreach (var column in query.Columns)
                {
                    q.DynamicQueryColumn.Add(new DynamicQueryColumn
                                                 {
                                                     TableId = column.TableId,
                                                     TableName = column.TableName,
                                                     ColumnId = column.ColumnId,
                                                     ColumnName = column.ColumnName,
                                                     Calculated = column.Calculated,
                                                     IsSelected = column.IsSelected,
                                                     IsWhere = column.IsWhere,
                                                     Operator = column.Operator,
                                                     Data = column.Data,
                                                     GroupLevel = column.GroupLevel,
                                                     GroupOperator = column.GroupOperator,
                                                     IsOrderBy = column.IsOrderBy,
                                                     Direction = column.Direction,
                                                     Position = column.Position,
                                                     LastChangeDate = now
                                                 });
                }

                context.DynamicQueryQuery.AddObject(q);
                context.SaveChanges();
            }
        }
        public void UpdateQuery(Entity.QueryBuilder.DynamicQueryQuery query)
        {
            var now = DateTime.Now;
            using (var context = new QbDynamicQueryEntities())
            {
                var q = context.DynamicQueryQuery.SingleOrDefault(w => w.Id == query.Id);
                if (q == null) throw new Exception("Ismeretlen lekérdezés");

                q.Name = query.Name;
                q.Description = query.Description;
                q.Active = true;
                q.LastChangeDate = now;

                var deleteQuery = context.DynamicQueryColumn.Where(w => w.DynamicQueryId == query.Id).ToList();
                foreach (var o in deleteQuery)
                {
                    context.DynamicQueryColumn.DeleteObject(o);
                }

                foreach (var column in query.Columns)
                {
                    q.DynamicQueryColumn.Add(new DynamicQueryColumn
                    {
                        TableId = column.TableId,
                        TableName = column.TableName,
                        ColumnId = column.ColumnId,
                        ColumnName = column.ColumnName,
                        Calculated = column.Calculated,
                        IsSelected = column.IsSelected,
                        IsWhere = column.IsWhere,
                        Operator = column.Operator,
                        Data = column.Data,
                        GroupLevel = column.GroupLevel,
                        GroupOperator = column.GroupOperator,
                        IsOrderBy = column.IsOrderBy,
                        Direction = column.Direction,
                        Position = column.Position,
                        LastChangeDate = now
                    });
                }

                context.SaveChanges();
            }
        }
    }
}
