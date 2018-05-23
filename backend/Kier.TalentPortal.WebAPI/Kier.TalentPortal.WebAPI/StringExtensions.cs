using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kier.TalentPortal.WebAPI
{
    public static class StringExtensions
    {
        public static string PrepString ( this string str)
        {
            var result = str.Replace(Environment.NewLine, "");
            result = result.Trim();
            return result;
        }
    }
}