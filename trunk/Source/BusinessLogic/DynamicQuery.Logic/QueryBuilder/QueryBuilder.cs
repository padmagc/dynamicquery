using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DynamicQuery.Entity.Documentation;
using System.Diagnostics;

namespace DynamicQuery.Logic.QueryBuilder
{
    public class QueryBuilder
    {
        #region Variables
        public readonly List<DynamicQueryTable> DatabaseTables;
        public readonly List<DynamicQueryTableAssociation> DatabaseAssociations;
        #endregion

        #region Properties
        public List<DynamicQueryTableColumn> Columns { get; set; }
        public List<DynamicQueryTable> Tables { get; set; }
        public List<string> Association { get; set; }
        public List<string> Warnings { get; set; }
        
        public string WhereStatement { get; set; }
        public StringBuilder OrderByStatement { get; set; }
        public StringBuilder SelectColumnStatement { get; set; }
        public StringBuilder GroupByColumnStatement { get; set; }
        private bool GroupBy { get; set; }

        //public List<QueryBuilderOrderByClause> OrderByClauses { get; set; }
        //protected WhereStatement WhereStatement { get; set; }


        #endregion

        #region Constructor
        public QueryBuilder()
        {
            Columns = new List<DynamicQueryTableColumn>();
            Tables = new List<DynamicQueryTable>();
            Warnings = new List<string>();
            DatabaseAssociations = new List<DynamicQueryTableAssociation>();


            SelectColumnStatement = new StringBuilder();
            OrderByStatement = new StringBuilder();
            GroupByColumnStatement = new StringBuilder();

            GroupBy = false;

            var logic = new TableLogic();
            DatabaseTables = logic.GetTables();

            foreach (var association in DatabaseTables.SelectMany(table => table.Associations))
            {
                DatabaseAssociations.Add(association);
            }

        }
        #endregion

        #region Function
        public void AddColumn(DynamicQuery.Entity.QueryBuilder.DynamicQueryColumn column)
        {
            var t = DatabaseTables.SingleOrDefault(w => w.Id == column.TableId);
            if (t == null) throw new Exception("Ismeretlen tábla : " + column.TableName);

            if (column.IsSelected)
            {
                if (SelectColumnStatement.Length > 0) SelectColumnStatement.Append(",");
                SelectColumnStatement.Append(column.ColumnSqlName);
            }

            if (column.IsOrderBy)
            {
                if (OrderByStatement.Length > 0) OrderByStatement.Append(",");
                OrderByStatement.Append(String.Format("[{0}].[{1}] {2}", column.TableName, column.ColumnName, (column.Direction == "Csökkenő" ? "DESC" : "ASC")));
            }

            if (column.IsSelected || column.IsOrderBy)
            {
                if (GroupByColumnStatement.Length > 0) GroupByColumnStatement.Append(",");
                GroupByColumnStatement.Append(String.Format("[{0}].[{1}]", column.TableName, column.ColumnName));
            }

            if (Tables.SingleOrDefault(w => w.Name == t.Name) == null)
            {
                Tables.Add(new DynamicQueryTable {Name = column.TableName});
                if (Tables.Count > 1)
                {
                    AddTableWithAssociation(Tables[0].Name, column.TableName);
                }
            }
            
        }
        public void AddCalculatedColumn(DynamicQuery.Entity.QueryBuilder.DynamicQueryQueryCalculatedColumn column)
        {
            var t = DatabaseTables.SingleOrDefault(w => w.Id == column.TableId);
            if(t == null) throw new Exception("Ismeretlen tábla : " + column.TableName);

            var c = t.CalculatedColumns.SingleOrDefault(w => w.Id == column.ColumnId);
            if (c == null) throw new Exception("Ismeretlen mező : " + column.ColumnId);

            if (SelectColumnStatement.Length > 0) SelectColumnStatement.Append(",");
            SelectColumnStatement.Append(column.ColumnSqlName);

            if(c.GroupBy) GroupBy = true;
           
            foreach (var usedTableAndColumn in c.UsedTablesAndColumns)
            {
                if(!c.GroupBy)
                {
                    if (GroupByColumnStatement.Length > 0) GroupByColumnStatement.Append(",");
                    GroupByColumnStatement.Append(String.Format("[{0}].[{1}]", usedTableAndColumn.TableName, usedTableAndColumn.ColumnName));
                }

                if (Tables.SingleOrDefault(w => w.Name == usedTableAndColumn.TableName) == null)
                {
                    Tables.Add(new DynamicQueryTable { Name = usedTableAndColumn.TableName });
                }
                if (Tables.Count > 1)
                {
                    AddTableWithAssociation(Tables[0].Name, usedTableAndColumn.TableName);
                }
            }
        }



        /*public void AddColumn0(DynamicQueryTableColumn column)
        {
            var t = DatabaseTables.SingleOrDefault(w => w.Name == column.TableName);
            if(t != null)
            {
                if (!column.CalculatedField)
                {
                    var c = t.Columns.SingleOrDefault(w => w.Name == column.Name);
                    if (c != null) column.Description = c.Description;
                    if (Tables.SingleOrDefault(w => w.Name == column.TableName) == null)
                    {
                        Tables.Add(new DynamicQueryTable { Name = column.TableName });
                    }

                    if (Tables.Count > 1)
                    {
                        AddTableWithAssociation(Tables[0].Name, column.TableName);
                    }
                }
                else
                {
                    var c = t.CalculatedColumns.SingleOrDefault(w => w.Sql == column.Name);
                    if (c != null)
                    {
                        column.Description = c.SqlName;
                        column.GroupBy = c.GroupBy;
                        foreach (var table in c.UsedTablesAndColumns)
                        {
                            if(!c.GroupBy)
                            {
                                if(column.Other.Length > 0)
                                {
                                    column.Other += ", ";
                                }
                                column.Other += String.Format("[{0}].[{1}]", table.TableName, table.ColumnName);
                            }
                            if (Tables.SingleOrDefault(w => w.Name == table.TableName) == null)
                            {
                                Tables.Add(new DynamicQueryTable {Name = column.TableName});
                            }
                            if (Tables.Count > 1)
                            {
                                AddTableWithAssociation(Tables[0].Name, column.TableName);
                            }
                        }
                        
                    }
                }
                Columns.Add(column);
            }
        }*/
        private void AddTableWithAssociation(string mainTable, string joinedTable)
        {
            var sql = new StringBuilder();
            var tableRoutes = CalculateRoute(joinedTable);
            var routeToMainTable = tableRoutes.SingleOrDefault(w => w.Table == mainTable);
            Debug.Assert(routeToMainTable != null, "routeToMainTable != null");

            if (routeToMainTable.Depth == int.MaxValue)
            {
                Warnings.Add(String.Format("Nincs kapcsolat a táblák között : {0}, {1}", mainTable, joinedTable));
                sql.Append(String.Format(", {0}", joinedTable));
            }
            else
            {
                foreach (var tableRoute in routeToMainTable.Associations)
                {
                    sql.Append(tableRoute);
                }
            }
            Tables.Single(w => w.Name == joinedTable).SqlFormat = sql.ToString();
        }

        public override string ToString()
        {
            var result = new StringBuilder();
            result.Append("SELECT ");
            result.Append(SelectColumnStatement.ToString());
            result.Append(" FROM ");
            foreach (var table in Tables)
            {
                result.Append(!String.IsNullOrEmpty(table.SqlFormat) ? table.SqlFormat : table.Name);
            }
            if(!String.IsNullOrEmpty(WhereStatement))
            {
                result.Append(String.Format(" WHERE {0} ", WhereStatement));
            }
            if(GroupBy)
            {
                result.Append(String.Format(" GROUP BY {0}", GroupByColumnStatement));
            }
            if(OrderByStatement.Length > 0)
            {
                result.Append(String.Format(" ORDER BY {0}", OrderByStatement));
            }

            return result.ToString();
        }
        public void AddWhereTable(string tableName)
        {
            if (Tables.SingleOrDefault(w => w.Name == tableName) == null)
            {
                Tables.Add(new DynamicQueryTable { Name = tableName });
            }
            if (Tables.Count > 1)
            {
                AddTableWithAssociation(Tables[0].Name, tableName);
            }
        }
        public void AddOrderByTable(string tableName)
        {
            if (Tables.SingleOrDefault(w => w.Name == tableName) == null)
            {
                Tables.Add(new DynamicQueryTable { Name = tableName });
            }
            if (Tables.Count > 1)
            {
                AddTableWithAssociation(Tables[0].Name, tableName);
            }
        }
        public void AddOrderBy(string columnName, string tableName, string direction, bool isSelected)
        {
            if (OrderByStatement.Length > 0) OrderByStatement.Append(", ");
            OrderByStatement.Append(String.Format("[{0}].[{1}] {2}", tableName, columnName, direction));
            if(!isSelected)
            {
                Columns.Add(new DynamicQueryTableColumn
                                {
                                    TableName = tableName,
                                    Name = columnName,
                                    Id = -1,
                                    CalculatedField = false
                                });
            }
        }
        /*public void AddOrderBy(string field, Sorting sortOrder)
        {
            if (OrderByClauses.SingleOrDefault(w => w.FieldName == field) == null)
            {
                if (OrderByClauses.SingleOrDefault(w => w.FieldName == field) == null)
                {
                    QueryBuilderOrderByClause newOrderByClause = new QueryBuilderOrderByClause(field, sortOrder);
                    OrderByClauses.Add(newOrderByClause);
                }
            }
        }*/


        /*private void AddTableWithAssociation(string mainTable, string joinedTable)
        {
            var found = false;
            var table = _database.Tables.SingleOrDefault(w => w.Name == joinedTable);
            if (table == null) throw new Exception("Invalid joined table : " + joinedTable);

            var association = _database.Associations.SingleOrDefault(w => w.ForeignKeyTable.Equals(joinedTable) && w.PrimaryKeyTable.Equals(mainTable));
            if(association != null)
            {
                Association.Add(String.Format(" LEFT OUTER JOIN {0} ON {1}.{2} = {3}.{4}", joinedTable, association.PrimaryKeyTable, association.PrimaryKeyColumn, association.ForeignKeyTable, association.ForeignKeyColumn));
                Tables.Add(table.Name, true);
                found = true;
            }

            association = _database.Associations.SingleOrDefault(w => w.ForeignKeyTable.Equals(mainTable) && w.PrimaryKeyTable.Equals(joinedTable));
            if (association != null && !found)
            {
                Association.Add(String.Format(" LEFT OUTER JOIN {0} ON {1}.{2} = {3}.{4}", mainTable, association.PrimaryKeyTable, association.PrimaryKeyColumn, association.ForeignKeyTable, association.ForeignKeyColumn));
                Tables.Add(table.Name, true);
            }



        }*/


        /*public void AddWhere(WhereClause clause) { AddWhere(clause, 1); }
        public void AddWhere(WhereClause clause, int level)
        {
            WhereStatement.Add(clause, level);
        }
        public WhereClause AddWhere(string field, Comparison @operator, object compareValue) { return AddWhere(field, @operator, compareValue, 1); }
        public WhereClause AddWhere(Enum field, Comparison @operator, object compareValue) { return AddWhere(field.ToString(), @operator, compareValue, 1); }
        public WhereClause AddWhere(string field, Comparison @operator, object compareValue, int level)
        {
            WhereClause NewWhereClause = new WhereClause(field, @operator, compareValue);
            WhereStatement.Add(NewWhereClause, level);
            return NewWhereClause;
        }*/

        public List<string> HasConnectionBetweenTables(List<string> tables)
        {
            var result = new List<string>();
            if (tables.Count > 1)
            {
                var routes = CalculateRoute(tables[0]);
                for(int i = 1; i < tables.Count; i++)
                {
                    TableRoute route = routes.SingleOrDefault(w => w.Table == tables[i]);
                    if (route == null || route.Depth == int.MaxValue)
                    {
                        if (!result.Contains(String.Format("{0} - {1}", tables[0], tables[i])))
                        {
                            result.Add(String.Format("{0} - {1}", tables[0], tables[i]));
                        }
                    }
                }
            }
            return result;
        }

        private List<TableRoute> CalculateRoute(string tableName)
        {
            var handledRoute = new List<TableRoute>();

            var shortestPaths = DatabaseTables.Select(table => table.Name == tableName 
                                                        ? new TableRoute { Table = table.Name, Depth = 0 } 
                                                        : new TableRoute { Table = table.Name, Depth = int.MaxValue }
                                                       ).ToList();

            while (handledRoute.Count != DatabaseTables.Count)
            {
                var shortestRoutes = (from s in shortestPaths
                                      orderby s.Depth
                                      select s).ToList();

                TableRoute locationTableRoute = null;

                foreach (var route in shortestRoutes)
                {
                    if (!handledRoute.Contains(route))
                    {
                        if (shortestPaths.Single(w => w.Table == route.Table).Depth == int.MaxValue)
                            return shortestPaths;
                        locationTableRoute = route;
                        break;
                    }
                }

                var selectedConnections = from c in DatabaseAssociations
                                          where c.ForeignKeyTable == locationTableRoute.Table
                                          select c;

                TableRoute primaryKeyTable;
                TableRoute foreignKeyTable;

                foreach (var dynamicQueryTableAssociation in selectedConnections)
                {
                    primaryKeyTable = shortestPaths.SingleOrDefault(w => w.Table == dynamicQueryTableAssociation.PrimaryKeyTable);
                    foreignKeyTable = shortestPaths.SingleOrDefault(w => w.Table == dynamicQueryTableAssociation.ForeignKeyTable);

                    Debug.Assert(primaryKeyTable != null, "primaryKeyTable != null");
                    Debug.Assert(foreignKeyTable != null, "foreignKeyTable != null");

                    if (primaryKeyTable.Depth > foreignKeyTable.Depth + 1)
                    {
                        primaryKeyTable.Depth = foreignKeyTable.Depth + 1;
                        foreach (var queryTableAssociation in foreignKeyTable.Associations)
                        {
                            primaryKeyTable.Associations.Add(queryTableAssociation);
                        }
                        primaryKeyTable.Associations.Add(dynamicQueryTableAssociation);
                    }
                }

                selectedConnections = from c in DatabaseAssociations
                                      where c.PrimaryKeyTable == locationTableRoute.Table
                                      select c;
                foreach (var dynamicQueryTableAssociation in selectedConnections)
                {
                    primaryKeyTable = shortestPaths.SingleOrDefault(w => w.Table == dynamicQueryTableAssociation.PrimaryKeyTable);
                    foreignKeyTable = shortestPaths.SingleOrDefault(w => w.Table == dynamicQueryTableAssociation.ForeignKeyTable);

                    Debug.Assert(foreignKeyTable != null, "foreignKeyTable != null");
                    Debug.Assert(primaryKeyTable != null, "primaryKeyTable != null");

                    if (foreignKeyTable.Depth > primaryKeyTable.Depth + 1)
                    {
                        foreignKeyTable.Depth = primaryKeyTable.Depth + 1;
                        foreach (var queryTableAssociation in primaryKeyTable.Associations)
                        {
                            foreignKeyTable.Associations.Add(queryTableAssociation);
                        }
                        foreignKeyTable.Associations.Add(dynamicQueryTableAssociation);
                    }
                }
                handledRoute.Add(locationTableRoute);

            }
            return null;
        }
        #endregion
    }

}