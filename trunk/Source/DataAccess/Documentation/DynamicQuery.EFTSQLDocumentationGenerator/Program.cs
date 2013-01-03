using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Xml.Linq;


namespace DynamicQuery.EFTSQLDocumentationGenerator
{
    class Program
    {
        private const string ConnectionString = "Data Source=.;Initial Catalog=QbPharmaSpec;Integrated Security=true";
        private const string EdmxFilePath = @"D:\Fejlesztes\DynamicQuery\Source\DataAccess\Documentation\DynamicQuery.DocumentationDataAccess\DocumentationModel.edmx";
        private readonly SqlConnection _connection;

        static void Main()
        {
            var p = new Program();
            p.CreateDocumentation();
            p.Dispose();

        }
        public Program()
        {
            _connection = new SqlConnection(ConnectionString);
            _connection.Open();
        }
        public void Dispose()
        {
            this._connection.Dispose();
        }
        private void CreateDocumentation()
        {

            XDocument doc = XDocument.Load(EdmxFilePath);
            IEnumerable<XElement> entityTypeElements = doc.Descendants("{http://schemas.microsoft.com/ado/2008/09/edm}EntityType");

            int i = 0;
            foreach (XElement entityTypeElement in entityTypeElements)
            {
                var xAttribute = entityTypeElement.Attribute("Name");
                if (xAttribute != null)
                {
                    String tableName = xAttribute.Value;
                    IEnumerable<XElement> propertyElements = entityTypeElement.Descendants("{http://schemas.microsoft.com/ado/2008/09/edm}Property");

                    Console.Clear();
                    Console.WriteLine("Analyzing table {0} of {1}", i++, entityTypeElements.Count());
                    Console.WriteLine(" => TableName : {0}" +
                                      "\n => property count : {1}", tableName, propertyElements.Count());

                    this.AddNodeDocumentation(entityTypeElement, GetTableDocumentation(tableName));

                    foreach (XElement propertyElement in propertyElements)
                    {
                        String columnName = propertyElement.Attribute("Name").Value;
                        string description = GetColumnDocumentation(tableName, columnName);
                        this.AddNodeDocumentation(propertyElement, !String.IsNullOrEmpty(description) ? description.Replace("\r\n", "").Replace("\r", "").Replace("\n", "") : "");
                    }
                }
            }

            Console.WriteLine("Writing result to {0}", EdmxFilePath);
            if (File.Exists(EdmxFilePath))
                File.Delete(EdmxFilePath);
            doc.Save(EdmxFilePath);
        }
        private void AddNodeDocumentation(XElement element, String documentation)
        {
            if (String.IsNullOrEmpty(documentation))
                return;
            element.Descendants("{http://schemas.microsoft.com/ado/2008/09/edm}Documentation").Remove();

            element.AddFirst(new XElement("{http://schemas.microsoft.com/ado/2008/09/edm}Documentation", new XElement("{http://schemas.microsoft.com/ado/2008/09/edm}Summary", documentation)));
        }
        private String GetTableDocumentation(String tableName)
        {
            using (var command = new SqlCommand(@" SELECT [value] 
                                                          FROM fn_listextendedproperty (
                                                                'MS_Description', 
                                                                'schema', 'dbo', 
                                                                'table',  @TableName, 
                                                                null, null)", _connection))
            {

                command.Parameters.AddWithValue("TableName", tableName);

                return command.ExecuteScalar() as String;
            }
        }
        private String GetColumnDocumentation(String tableName, String columnName)
        {
            using (var command = new SqlCommand(@"SELECT [value] 
                                                         FROM fn_listextendedproperty (
                                                                'MS_Description', 
                                                                'schema', 'dbo', 
                                                                'table', @TableName, 
                                                                'column', @columnName)", _connection))
            {

                command.Parameters.AddWithValue("TableName", tableName);
                command.Parameters.AddWithValue("ColumnName", columnName);

                return command.ExecuteScalar() as String;
            }
        }

    }
}
