using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace DynamicQuery.Core
{
    public static class ErrorLog
    {
        public static void Log(Exception ex)
        {
            Elmah.ErrorLog.GetDefault(HttpContext.Current).Log(new Elmah.Error(ex, HttpContext.Current));
        }
    }
}
