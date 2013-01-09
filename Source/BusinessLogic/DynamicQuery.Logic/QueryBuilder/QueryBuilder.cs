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
            //OrderByClauses = new List<QueryBuilderOrderByClause>();
            //WhereStatement = new WhereStatement();

            var logic = new TableLogic();
            DatabaseTables = logic.GetTables();

            foreach (var association in DatabaseTables.SelectMany(table => table.Associations))
            {
                DatabaseAssociations.Add(association);
            }

        }
        #endregion

        #region Function
        public void AddColumn(string pTableName, string pColumn)
        {
            if (Columns.SingleOrDefault(w => w.TableName == pTableName && w.Name == pColumn) == null)
            {
                // ReSharper disable RedundantArgumentName
                Columns.Add(new DynamicQueryTableColumn
                                {
                                    Name = pColumn,
                                    TableName = pTableName
                                });
            }

            if (Tables.SingleOrDefault(w => w.Name == pTableName) == null)
            {
                Tables.Add(new DynamicQueryTable { Name = pTableName });
                if (Tables.Count > 1)
                {
                    AddTableWithAssociation(Tables[0].Name, pTableName);
                }


                /*if(Tables.Count == 0)
                {
                    Tables.Add(table.Name, false);
                }
                else
                {
                    AddTableWithAssociation(Tables.First().Key, table.Name);
                }*/
            }
        }

        private void AddTableWithAssociation(string mainTable, string joinedTable)
        {
            var sql = new StringBuilder();
            var tableRoutes = CalculateRoute(joinedTable);
            var routeToMainTable = tableRoutes.SingleOrDefault(w => w.Table == mainTable);
            Debug.Assert(routeToMainTable != null, "routeToMainTable != null");

            if (routeToMainTable.Depth == int.MaxValue)
            {
                Warnings.Add(String.Format("Can't connect these tables : {0}, {1}", mainTable, joinedTable));
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