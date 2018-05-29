using System;
using Kier.TalentPortal.SharedKernal.Models;

namespace Kier.TalentPortal.SharedKernal
{
    public static class Extensions
    {
        private static string DELIMITER = "-";
        public static string PrepString ( this string str)
        {
            var result = str.Replace(Environment.NewLine, "");
            result = result.Replace("\n", "");
            result = result.Replace("?", "");
            result = result.Trim();
            return result;
        }

        public static string GetDivionGroupName(this Talent talent)
        {
            return talent.Division.PrepString();
        }

        public static string GetBusinessStreamGroupName(this Talent talent)
        {
            return string.Concat(talent.Division.PrepString(),DELIMITER, talent.Stream.PrepString());
        }

        public static string GetBusinessUnitGroupName(this Talent talent)
        {
            return string.Concat(talent.Division.PrepString(), DELIMITER, talent.Stream.PrepString(), DELIMITER, talent.Unit.PrepString());
        }






    }
}