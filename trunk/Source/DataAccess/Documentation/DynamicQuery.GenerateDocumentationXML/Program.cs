using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DynamicQuery.Entity.Documentation;

namespace DynamicQuery.GenerateDocumentationXML
{
    class Program
    {
        static void Main(string[] args)
        {
            Database db = new Database();
            
            System.Xml.Serialization.XmlSerializer writer = new System.Xml.Serialization.XmlSerializer(db.GetType());
            
            System.IO.StreamWriter file = new System.IO.StreamWriter("QBDatabaseDocumentation.xml");

            writer.Serialize(file, db);
            file.Close();
        }
    }
}
