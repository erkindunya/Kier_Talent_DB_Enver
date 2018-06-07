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


        public static string GetTalentAdminsGroupName(this Talent talent)
        {
            return SecurityMatrixHelper.BuildTalentAdminsGroup();
        }

        public static bool IsL2Employee(this Talent talent)
        {
            return talent.Grade.Equals(KTPConstants.Kier_Levels_L2);
        }

        public static bool IsL1Employee(this Talent talent)
        {
            return talent.Grade.Equals(KTPConstants.Kier_Levels_L1);
        }

        public static bool IsCorMEmployee(this Talent talent)
        {
            return (talent.Grade.StartsWith(KTPConstants.Kier_Levels_M) || talent.Grade.StartsWith(KTPConstants.Kier_Levels_C));
        }

      

        public static string GetAllDivisionRecordsGroupName(this Talent talent)
        {
            return SecurityMatrixHelper.BuildDivisionLevelGroup(talent.Division);
        }

        public static string GetAllStreamRecordsGroupName(this Talent talent)
        {
            return SecurityMatrixHelper.BuildStreamLevelGroup(talent.Division.PrepString(), talent.Stream.PrepString());
        }

        public static string GetUptoL1GroupName(this Talent talent)
        {

            return SecurityMatrixHelper.BuildUnitL1LevelGroup(talent.Division.PrepString(), talent.Stream.PrepString(), talent.Unit);


        }

        public static string GetUptoL2GroupName(this Talent talent)
        {


            return SecurityMatrixHelper.BuildUnitL2LevelGroup(talent.Division.PrepString(), talent.Stream.PrepString(), talent.Unit);
           
        }

        public static string GetUpToM3GroupName(this Talent talent)
        {

            return SecurityMatrixHelper.BuildUnitMnCLevelGroup(talent.Division.PrepString(), talent.Stream.PrepString(), talent.Unit);
            
        }






    }

}