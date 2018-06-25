namespace Kier.TalentPortal.SharedKernal
{
    public class KTPConstants
    {
        public const string Talent_Record_Area_Head = "KTPAreaHead";
        public const string Talent_Record_Business_Risk = "KTPBusinessRisk";
        public const string Talent_Record_Business_Stream = "KTPBusinessStream";
        public const string Talent_Record_Business_Unit = "KTPBusinessUnit";
        public const string Talent_Record_Is_Current_Submission = "KTPCurrentSubmission";
        public const string Talent_Record_Development_Notes = "KTPDevelopmentNotes";
        public const string Talent_Record_Division = "KTPDivision";
        public const string Talent_Record_Employee_Id = "KTPEmployeeID";
        public const string Talent_Record_First_Development_Requirement = "KTPFirstDevelopmentRequirement";
        public const string Talent_Record_Flight_Risk = "KTPFlightRisk";
        public const string Talent_Record_Function = "KTPFunction";
        public const string Talent_Record_Grade = "KTPGrade";
        public const string Talent_Record_Location = "KTPLocation";
        public const string Talent_Record_Movement = "KTPMovementStatus";
        public const string Talent_Record_Performance = "KTPPerformanceRating";
        public const string Talent_Record_Grid_Rating = "KTP9BoxesGridRating";
        public const string Talent_Record_Position = "KTPPosition";
        public const string Talent_Record_Potential = "KTPPotentialRating";
        public const string Talent_Record_Second_Development_Requirement = "KTPSecondDevelopmentRequirement";
        public const string Talent_Record_Title = "Title";
        public const string Talent_Record_Gender = "KTPGender";
        public const string Talent_Record_IsLeaver = "KTPIsLeaver";


        public const string Talent_Record_First_Development_Requirement_Category = "KTPFirstDeveReqCategory";
        public const string Talent_Record_First_Development_Requirement_SubCategory = "KTPFirstDevReqSubCategory";
        public const string Talent_Record_First_Development_Requirement_Title = "KTPFirstDevReqTitle";

        public const string Talent_Record_Second_Development_Requirement_Category = "KTPSecondDevReqCategory";
        public const string Talent_Record_Second_Development_Requirement_SubCategory = "KTPSecondDeveReqSubCategory";
        public const string Talent_Record_Second_Development_Requirement_Title = "KTPSecondDevReqTitle";
        public const string Talent_Record_ReportingUnit = "KTPReportingUnit";
        public const string Talent_Record_AreaHeadName = "KTPAreaHeaderName";
        


        public const string Talent_Record_First_Name = "KTPEmployee_Forename";
        public const string Talent_Record_Last_Name = "KTPEmployee_Surname";
        public const string Talent_Record_Manager_Name = "KTPManager_Text";


        

        public const string Talent_Record_Submission_Year = "KTPSubmissionYear";
        public const string Talent_Record_Employee = "KTPEmployee";
        public const string Talent_Record_Manager = "KTPManager";
        public const string Business_Unit_Divison = "KTPBusinessUnitDivision";
        public const string Business_Unit_Stream = "KTPBusinessUnitStream";
        public const string Business_Unit_Unit = "KTPBusinessUnitUnit";
        public const string Business_Unit_Reporting_Unit = "KTPBusinessReportingUnit";
        public const string Business_Unit_Location = "KTPBusinessUnitLocation";





        public const string Group_All_Records = "All-Talent-Records";
        public const string Group_Up_To_M3_Token = "-M3 and below";
        public const string Group_Up_To_L1_Token = "-L1";
        public const string Group_Up_To_L2_Token = "-L2";
        public const string Group_All_Token = "-All";
        public const string Group_Prefix_Token = "KTPG-";

        public const string Kier_Levels_L2 = "L2";
        public const string Kier_Levels_L1 = "L1";
        public const string Kier_Levels_M = "M";
        public const string Kier_Levels_C = "C";


        //public const string Talent_Record_Employee = "KTPEmployee";
        public const string Get_Talent_Record_By_EmployeeId_Query = @"<View><Query><Where><Eq><FieldRef Name=""KTPEmployeeID""/><Value Type = ""Text"" >EMP_ID</Value></Eq></Where><OrderBy><FieldRef Name=""KTPSubmissionYear"" Ascending=""False"" /></OrderBy></Query></View>";



    }
}