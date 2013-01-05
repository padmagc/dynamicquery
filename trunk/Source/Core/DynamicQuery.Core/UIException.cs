using System;

namespace DynamicQuery.Core
{
    /// <summary>
    /// UI exception
    /// </summary>
    public class UIException : Exception
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        public UIException(string customMessage, System.Exception inner) : base(customMessage, inner) {}
    }
}
