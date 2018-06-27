using Microsoft.SharePoint.Client;
using System.Collections.Generic;
using System.Configuration;
using List = Microsoft.Graph.List;

namespace Kier.TalentPortal.SharedKernal.Models
{
    public class User
    {
        public User()
        {
            this.value = string.Empty;
            this.text = string.Empty;
            this.ForeName = string.Empty;
            this.Surname = string.Empty;
        }
        public string value { get; set; }
        public string text { get; set; }
        public string ForeName { get; set; }
        public string Surname { get; set; }
    }
    public class Talent
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }
        public User Name { get; set; }
        public User Manager { get; set; }
        public User AreaHead { get; set; }
        public string Function { get; set; }
        public string Division { get; set; }
        public string ReportingUnit { get; set; }
        public string Unit { get; set; }
        public string Stream { get; set; }
        public string Location { get; set; }
        public string BusinessRisk { get; set; }
        public string FlightRisk { get; set; }
        public string Performance { get; set; }
        public string Potential { get; set; }
        public string Grade { get; set; }
        public string Movement { get; set; }
        public string Requirements_01_category { get; set; }
        public string Requirements_01_subcategory { get; set; }
        public string Requirements_01_title { get; set; }
        public string Requirements_02_category { get; set; }
        public string Requirements_02_subcategory { get; set; }
        public string Requirements_02_title { get; set; }
        public string Notes { get; set; }
        public int SubmissionYear { get; set; }
        public bool IsCurrentSubmission { get; set; }
        public string Position { get; set; }
        public string GridRating { get; set; }
        public PreviousYearRating PreviousYear { get; set; }
        public string ManagerName { get; set; }
        public string AreaHeadName { get; set; }
        private Dictionary<string, string> _ratingsDictionary = default(Dictionary<string, string>);
        public string Gender { get; set; }
        public bool IsLeaver { get; set; }


        public Talent()
        {
            _ratingsDictionary = new Dictionary<string, string>();
            _ratingsDictionary.Add("A1", "A3");
            _ratingsDictionary.Add("B1", "B3");
            _ratingsDictionary.Add("C1", "C3");
            _ratingsDictionary.Add("A2", "A2");
            _ratingsDictionary.Add("A3", "A2");
            _ratingsDictionary.Add("B2", "B2");
            _ratingsDictionary.Add("B3", "B2");
            _ratingsDictionary.Add("C2", "C2");
            _ratingsDictionary.Add("C3", "C2");
            _ratingsDictionary.Add("A4", "A1");
            _ratingsDictionary.Add("A5", "A1");
            _ratingsDictionary.Add("B4", "B1");
            _ratingsDictionary.Add("B5", "B1");
            _ratingsDictionary.Add("C4", "C1");
            _ratingsDictionary.Add("C5", "C1");
            _ratingsDictionary.Add("New", "New");
        }


        public static Talent FromSPListItem(ListItem item)
        {

            var talent = new Talent();
            talent.Division = (item[KTPConstants.Talent_Record_Division] != null) ? item[KTPConstants.Talent_Record_Division].ToString() : "";
            talent.Stream = (item[KTPConstants.Talent_Record_Business_Stream] != null) ? item[KTPConstants.Talent_Record_Business_Stream].ToString() : "";
            talent.Unit = (item[KTPConstants.Talent_Record_Business_Unit] != null) ? item[KTPConstants.Talent_Record_Business_Unit].ToString() : "";
            
            talent.BusinessRisk = (item[KTPConstants.Talent_Record_Business_Risk] != null) ? item[KTPConstants.Talent_Record_Business_Risk].ToString() : "";
            talent.Notes = (item[KTPConstants.Talent_Record_Development_Notes] != null) ? item[KTPConstants.Talent_Record_Development_Notes].ToString() : "";
            talent.EmployeeId = (item[KTPConstants.Talent_Record_Employee_Id] != null) ? item[KTPConstants.Talent_Record_Employee_Id].ToString() : "";
            talent.FlightRisk = (item[KTPConstants.Talent_Record_Flight_Risk] != null) ? item[KTPConstants.Talent_Record_Flight_Risk].ToString() : "";
            talent.Function = (item[KTPConstants.Talent_Record_Function] != null) ? item[KTPConstants.Talent_Record_Function].ToString() : "";
            talent.Grade = (item[KTPConstants.Talent_Record_Grade] != null) ? item[KTPConstants.Talent_Record_Grade].ToString() : "";
            talent.Location = (item[KTPConstants.Talent_Record_Location] != null) ? item[KTPConstants.Talent_Record_Location].ToString() : "";
            talent.Movement = (item[KTPConstants.Talent_Record_Movement] != null) ? item[KTPConstants.Talent_Record_Movement].ToString() : "";
            talent.Performance = (item[KTPConstants.Talent_Record_Performance] != null) ? item[KTPConstants.Talent_Record_Performance].ToString() : "";
            talent.Potential = (item[KTPConstants.Talent_Record_Potential] != null) ? item[KTPConstants.Talent_Record_Potential].ToString() : "";
            talent.IsCurrentSubmission = (item[KTPConstants.Talent_Record_Is_Current_Submission] != null)
                ? bool.Parse(item[KTPConstants.Talent_Record_Is_Current_Submission].ToString())
                : false;
            talent.SubmissionYear = (item[KTPConstants.Talent_Record_Submission_Year] != null)
                ? int.Parse(item[KTPConstants.Talent_Record_Submission_Year].ToString())
                : -1;
            talent.Id = (item["ID"] != null) ? int.Parse(item["ID"].ToString()) : -1;
            
            talent.ManagerName = (item[KTPConstants.Talent_Record_Manager_Name] != null) ? item[KTPConstants.Talent_Record_Manager_Name].ToString() : "";
            talent.AreaHeadName = (item[KTPConstants.Talent_Record_AreaHeadName] != null) ? item[KTPConstants.Talent_Record_AreaHeadName].ToString() : "";
            
               

            //talent.Name = string.Concat(surname, ", " + forename);
            talent.Name = (item[KTPConstants.Talent_Record_Employee] != null) ? SharePointOnlineHelper.GetUser(((FieldUserValue)item[KTPConstants.Talent_Record_Employee]).Email.ToString()) : new User();
            if (talent.Name != null)
            {
                talent.Name.ForeName = (item[KTPConstants.Talent_Record_First_Name] != null)
                    ? item[KTPConstants.Talent_Record_First_Name].ToString()
                    : string.Empty;
                talent.Name.Surname= (item[KTPConstants.Talent_Record_Last_Name] != null)
                    ? item[KTPConstants.Talent_Record_Last_Name].ToString()
                    : string.Empty;
            }
            talent.AreaHead = (item[KTPConstants.Talent_Record_Area_Head] != null) ? SharePointOnlineHelper.GetUser(((FieldUserValue)item[KTPConstants.Talent_Record_Area_Head]).Email.ToString()) : new User();
            talent.Manager = (item[KTPConstants.Talent_Record_Manager] != null) ? SharePointOnlineHelper.GetUser(((FieldUserValue)item[KTPConstants.Talent_Record_Manager]).Email.ToString()) : new User();
            talent.Requirements_01_category = (item[KTPConstants.Talent_Record_First_Development_Requirement_Category] != null) ? item[KTPConstants.Talent_Record_First_Development_Requirement_Category].ToString() : "";
            talent.Requirements_01_subcategory = (item[KTPConstants.Talent_Record_First_Development_Requirement_SubCategory] != null) ? item[KTPConstants.Talent_Record_First_Development_Requirement_SubCategory].ToString() : "";
            talent.Requirements_01_title = (item[KTPConstants.Talent_Record_First_Development_Requirement_Title] != null) ? item[KTPConstants.Talent_Record_First_Development_Requirement_Title].ToString() : "";

            talent.Requirements_02_category = (item[KTPConstants.Talent_Record_Second_Development_Requirement_Category] != null) ? item[KTPConstants.Talent_Record_Second_Development_Requirement_Category].ToString() : "";
            talent.Requirements_02_subcategory = (item[KTPConstants.Talent_Record_Second_Development_Requirement_SubCategory] != null) ? item[KTPConstants.Talent_Record_Second_Development_Requirement_SubCategory].ToString() : "";
            talent.Requirements_02_title = (item[KTPConstants.Talent_Record_Second_Development_Requirement_Title] != null) ? item[KTPConstants.Talent_Record_Second_Development_Requirement_Title].ToString() : "";
            talent.Position = (item[KTPConstants.Talent_Record_Position] != null) ? item[KTPConstants.Talent_Record_Position].ToString() : "";
            talent.GridRating = (item[KTPConstants.Talent_Record_Grid_Rating] != null) ? item[KTPConstants.Talent_Record_Grid_Rating].ToString() : "";
            talent.ReportingUnit = (item[KTPConstants.Talent_Record_ReportingUnit] != null) ? item[KTPConstants.Talent_Record_ReportingUnit].ToString() : "";
            talent.Gender = (item[KTPConstants.Talent_Record_Gender] != null) ? item[KTPConstants.Talent_Record_Gender].ToString() : "";

            talent.IsLeaver = (item[KTPConstants.Talent_Record_IsLeaver] != null)
               ? bool.Parse(item[KTPConstants.Talent_Record_IsLeaver].ToString())
               : false;

            return talent;
        }

        public static ListItem ToSPListItem(Talent talent, ListItem listItem)
        {

            //var Names = talent.Name.text.Split(ConfigurationManager.AppSettings["name_delimiter"][0]);
            //var firstNamePosition = int.Parse(ConfigurationManager.AppSettings["first_name_position"].ToString());
            //var lastNamePosition = int.Parse(ConfigurationManager.AppSettings["last_name_position"].ToString());
            int firstNamePosition, lastNamePosition = default(int);
                string forename, surname = default(string);
            string[] Names = default(string[]);
            if (!string.IsNullOrEmpty(talent.Name.value))
            {
                Names = talent.Name.text.Split(ConfigurationManager.AppSettings["name_delimiter"][0]);
                firstNamePosition = int.Parse(ConfigurationManager.AppSettings["first_name_position"].ToString());
                lastNamePosition = int.Parse(ConfigurationManager.AppSettings["last_name_position"].ToString());

                forename = Names[firstNamePosition];
                surname = Names[lastNamePosition];
            }
            else
            {
                forename = talent.Name.ForeName;
                surname = talent.Name.Surname;
            }

            listItem[KTPConstants.Talent_Record_Division] = talent.Division;
            listItem[KTPConstants.Talent_Record_Business_Stream] = talent.Stream;
            listItem[KTPConstants.Talent_Record_Business_Unit] = talent.Unit;
            listItem[KTPConstants.Talent_Record_Business_Risk] = talent.BusinessRisk;
            listItem[KTPConstants.Talent_Record_Development_Notes] = talent.Notes;
            listItem[KTPConstants.Talent_Record_Employee_Id] = talent.EmployeeId;
            listItem[KTPConstants.Talent_Record_Flight_Risk] = talent.FlightRisk;
            listItem[KTPConstants.Talent_Record_Function] = talent.Function;
            listItem[KTPConstants.Talent_Record_Grade] = talent.Grade;
            listItem[KTPConstants.Talent_Record_Location] = talent.Location;
            listItem[KTPConstants.Talent_Record_Movement] = talent.Movement;
            listItem[KTPConstants.Talent_Record_Performance] = talent.Performance;
            listItem[KTPConstants.Talent_Record_Potential] = talent.Potential;
            listItem[KTPConstants.Talent_Record_Submission_Year] = talent.SubmissionYear;
            listItem[KTPConstants.Talent_Record_Position] = talent.Position;
            listItem[KTPConstants.Talent_Record_Title] = talent.EmployeeId;
            listItem[KTPConstants.Talent_Record_Gender] = talent.Gender;
            listItem[KTPConstants.Talent_Record_ReportingUnit] = talent.ReportingUnit;
            listItem[KTPConstants.Talent_Record_IsLeaver] = talent.IsLeaver;
            listItem[KTPConstants.Talent_Record_Is_Current_Submission] = talent.IsCurrentSubmission;
            //listItem[KTPConstants.Talent_Record_AreaHeadName] = talent.AreaHeadName;
            listItem[KTPConstants.Talent_Record_Manager_Name] = talent.ManagerName;

            listItem[KTPConstants.Talent_Record_Area_Head] = (talent.AreaHead != null) ? SharePointOnlineHelper.ResolveUser(talent.AreaHead.value) : null;
            if (talent.AreaHead != null)
            {
                if (string.IsNullOrEmpty(talent.AreaHead.value))
                    listItem[KTPConstants.Talent_Record_AreaHeadName] =
                        talent.AreaHead.Surname + ", " + talent.AreaHead.ForeName;
                else
                    listItem[KTPConstants.Talent_Record_AreaHeadName] = talent.AreaHead.text;
            }

            listItem[KTPConstants.Talent_Record_Manager] = SharePointOnlineHelper.ResolveUser(talent.Manager.value);
        



            if ( !string.IsNullOrEmpty(talent.Name.value))
            listItem[KTPConstants.Talent_Record_Employee] = SharePointOnlineHelper.ResolveUser(talent.Name.value);
            

            listItem[KTPConstants.Talent_Record_Manager] = SharePointOnlineHelper.ResolveUser(talent.Manager.value);
            if (string.IsNullOrEmpty(talent.Manager.value))
                listItem[KTPConstants.Talent_Record_Manager_Name] =
                    talent.Manager.Surname + ", " + talent.Manager.ForeName;
            
            else
            {
                listItem[KTPConstants.Talent_Record_Manager_Name] = talent.Manager.text;
            }

            listItem[KTPConstants.Talent_Record_First_Name] = forename.Trim();
            listItem[KTPConstants.Talent_Record_Last_Name] = surname.Trim();
            listItem[KTPConstants.Talent_Record_Grid_Rating] = talent.CalculateGridRating();

            listItem[KTPConstants.Talent_Record_First_Development_Requirement_Category] =
                talent.Requirements_01_category;
            listItem[KTPConstants.Talent_Record_First_Development_Requirement_SubCategory] =
                talent.Requirements_01_subcategory;
            listItem[KTPConstants.Talent_Record_First_Development_Requirement_Title] =
                talent.Requirements_01_title;

            listItem[KTPConstants.Talent_Record_Second_Development_Requirement_Category] =
                talent.Requirements_02_category;
            listItem[KTPConstants.Talent_Record_Second_Development_Requirement_SubCategory] =
                talent.Requirements_02_subcategory;
            listItem[KTPConstants.Talent_Record_Second_Development_Requirement_Title] =
                talent.Requirements_02_title;


            listItem[KTPConstants.Talent_Record_Position] = talent.Position;



            //listItem["ID"] = talent.Id;
            return listItem;

            /*
             * i:0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             * i: 0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             */
        }

        public string CalculateGridRating()
        {
            var result = default(string);
            if (IsBothPotentialAndPerformanceRatingAvailable())
            {
                var combined = string.Concat(Potential, Performance);
                if (Potential.Contains("New") || Performance.Contains("New"))
                    result = "New";
                else
                    result = this._ratingsDictionary[combined];
            }
            return result;
        }

        private bool IsBothPotentialAndPerformanceRatingAvailable()
        {
            return !(string.IsNullOrEmpty(this.Performance)) && !(string.IsNullOrEmpty(this.Potential));
        }
    }
}