using System;
using System.Text.RegularExpressions;
using DynamicQuery.Entity.Documentation;
using DynamicQuery.Entity.QueryBuilder;

namespace DynamicQuery.Logic.Mapping
{
    public static class Mapping
    {
        public static DynaimcQuery.QueryBuilderDataAccess.DynamicQueryTable ConvertEntityDynamicQueryTableToDataAccessDynamicQueryTable(DynamicQueryTable table)
        {
            return new DynaimcQuery.QueryBuilderDataAccess.DynamicQueryTable
                       {
                           Name = table.Name
                       };
        }
        public static DynamicQueryTable ConvertDataAccessDynamicQueryTableToEntityDynamicQueryTable(DynaimcQuery.QueryBuilderDataAccess.DynamicQueryTable table, bool mapAssoctions)
        {
            var entity = new DynamicQueryTable
                                           {
                                               Name = table.Name,
                                               Id = table.Id
                                           };

            if (table.DynamicQueryTableColumn != null)
            {
                foreach (var column in table.DynamicQueryTableColumn)
                {
                    entity.Columns.Add(ConvertDataAccessDynamicQueryTableColumnToEntityDynamicQueryTableColumn(column));
                }
            }
            if (table.DynamicQueryCalculatedColumn != null)
            {
                foreach (var column in table.DynamicQueryCalculatedColumn)
                {
                    if(!column.DynamicQueryCalculatedColumnTable.IsLoaded)
                        column.DynamicQueryCalculatedColumnTable.Load();
                    entity.CalculatedColumns.Add(ConvertDataAccessDynamicQueryCalculatedfieldToEntityDynamicQueryTableColumn(column));
                }
            }
            
            if(mapAssoctions)
            {
                if(table.DynamicQueryAssociation != null)
                {
                    foreach (var association in table.DynamicQueryAssociation)
                    {
                        entity.Associations.Add(ConvertDataAccessDynamicQueryTableAssociationToEntityDynamicQueryTableAssociation(association));
                    }
                }
            }

            return entity;
        }
        public static DynamicQueryQuery ConvertDataAccessDynamicQueryQueryToEntityDynamicQueryQuery(DynaimcQuery.QueryBuilderDataAccess.DynamicQueryQuery query)
        {
            var entity = new DynamicQueryQuery
                             {
                                 Name = query.Name,
                                 Description = query.Description,
                                 Active = query.Active,
                                 WhereStatement = query.WhereStatement,
                                 SelectStatement = query.SelectStatement,
                                 Id = query.Id
                             };

            if(query.DynamicQueryColumn != null)
            {
                foreach (var column in query.DynamicQueryColumn)
                {
                    entity.Columns.Add(
                        new DynamicQueryColumn
                        {
                            Id = column.Id,
                            TableId = column.TableId,
                            TableName = column.TableName,
                            ColumnId = column.ColumnId,
                            ColumnName = column.ColumnName,
                            Calculated = column.Calculated,
                            IsSelected = column.IsSelected,
                            IsOrderBy = column.IsOrderBy,
                            Direction = column.Direction,
                            Position = column.Position,
                            IsWhere = column.IsWhere,
                            //WhereCounter = column.IsWhere ? Regex.Matches(query.WhereStatement, String.Format("[{0}].[{1}]", column.TableName, column.ColumnName)).Count :0
                        }
                    );
                }
            }

            return entity;
        }
        public static DynamicQueryTableAssociation ConvertDataAccessDynamicQueryTableAssociationToEntityDynamicQueryTableAssociation(DynaimcQuery.QueryBuilderDataAccess.DynamicQueryAssociation association)
        {
            return new DynamicQueryTableAssociation
                       {
                           Id = association.Id,
                           PrimaryKeyColumn = association.PrimaryKeyTableColumn,
                           PrimaryKeyTable = association.PrimaryKeyTable,
                           ForeignKeyColumn = association.ForeignKeyTableColumn,
                           ForeignKeyTable = association.ForeignKeyTable
                       };
        }
        public static DynamicQueryTableColumn ConvertDataAccessDynamicQueryTableColumnToEntityDynamicQueryTableColumn(DynaimcQuery.QueryBuilderDataAccess.DynamicQueryTableColumn column)
        {
            return new DynamicQueryTableColumn
            {
                Id = column.Id,
                Name = column.Name,
                ColumnType = column.ColumnType,
                Type = column.Type,
                SubType = column.SubType,
                Length = column.Length.HasValue ? column.Length.Value : 0,
                DecimalLength = column.Precision.HasValue ? column.Precision.Value : 0,
                Description = column.Description,
                Active = column.Active
            };
        }
        public static DynamicQueryCalculatedColumn ConvertDataAccessDynamicQueryCalculatedfieldToEntityDynamicQueryTableColumn(DynaimcQuery.QueryBuilderDataAccess.DynamicQueryCalculatedColumn column)
        {
            var c = new DynamicQueryCalculatedColumn
            {
                Id = column.Id,
                Name = column.Name,
                Type = column.Type,
                SubType = column.SubType,
                Description = column.Description,
                Sql = column.SQL,
                SqlName = column.SQLName,
                Active =  column.Active,
                TableId = column.TableId,
                GroupBy = column.GroupBy
            };

            foreach (var table in column.DynamicQueryCalculatedColumnTable)
            {
                if(!table.DynamicQueryTableReference.IsLoaded)
                    table.DynamicQueryTableReference.Load();
                if (!table.DynamicQueryTableColumnReference.IsLoaded)
                    table.DynamicQueryTableColumnReference.Load();
                if(!c.UsedTablesAndColumns.Exists(w => w.ColumnId == table.DynamicQueryTableColumn.Id && w.TableId == table.TableId))
                {
                    c.UsedTablesAndColumns.Add(new DynamicQueryCalculatedColumnTable
                                                   {
                                                       TableId = table.TableId,
                                                       TableName = table.DynamicQueryTable.Name,
                                                       ColumnId = table.DynamicQueryTableColumn.Id,
                                                       ColumnName = table.DynamicQueryTableColumn.Name,
                                                       Count = 1
                                                   });
                } 
                else
                {
                    c.UsedTablesAndColumns.Find(
                        w => w.ColumnId == table.DynamicQueryTableColumn.Id && w.TableId == table.TableId).Count++;
                }
            }
            return c;
        }
    }
}
