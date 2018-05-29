﻿using Microsoft.SharePoint.Client;

namespace Kier.TalentPortal.SharedKernal.Models
{
    public class User
    {
        public string value { get; set; }
        public string text { get; set; }
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
        public string Requirements_02_category { get; set; }
        public string Requirements_02_subcategory { get; set; }
        public string Notes { get; set; }
        public int SubmissionYear { get; set; }
        public bool IsCurrentSubmission { get; set; }
        public string Position { get; set; }
        public PreviousYearRating PreviousYear { get; set; }

        public static Talent FromSPListItem(ListItem item)
        {
            var talent = new Talent();
            talent.Division = (item[KTPConstants.Talent_Record_Division]!=null)? item[KTPConstants.Talent_Record_Division].ToString():"" ;
            talent.Stream = (item[KTPConstants.Talent_Record_Business_Stream]!=null)? item[KTPConstants.Talent_Record_Business_Stream].ToString():"" ;
            talent.Unit = (item[KTPConstants.Talent_Record_Business_Unit] != null) ? item[KTPConstants.Talent_Record_Business_Unit].ToString() : "";
            talent.AreaHead = (item[KTPConstants.Talent_Record_Area_Head]!=null)? SharePointOnlineHelper.GetUser( item[KTPConstants.Talent_Record_Area_Head].ToString()):new User();
            talent.BusinessRisk = item[KTPConstants.Talent_Record_Business_Risk].ToString();
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
            talent.Id = (item["ID"]!=null)? int.Parse(item["ID"].ToString()):-1;
            talent.Name = (item[KTPConstants.Talent_Record_Employee] != null) ? SharePointOnlineHelper.GetUser(((FieldUserValue)item[KTPConstants.Talent_Record_Employee]).LookupValue.ToString()) : new User();
            talent.Manager = (item[KTPConstants.Talent_Record_Manager] != null) ? SharePointOnlineHelper.GetUser(((FieldUserValue)item[KTPConstants.Talent_Record_Manager]).LookupValue.ToString()) : new User();
            talent.Requirements_01_category = "Data";
            talent.Requirements_01_subcategory = "Data";
            talent.Requirements_02_category = "Data";
            talent.Requirements_02_subcategory = "Data";
            talent.Position = (item[KTPConstants.Talent_Record_Position]!= null)? item[KTPConstants.Talent_Record_Position].ToString():"";

            return talent;
        }

        public static ListItem ToSPListItem(Talent talent, ListItem listItem)
        {
  
            listItem[KTPConstants.Talent_Record_Division] = talent.Division;
            listItem[KTPConstants.Talent_Record_Business_Stream] = talent.Stream;
            listItem[KTPConstants.Talent_Record_Business_Unit] = talent.Unit;
            listItem[KTPConstants.Talent_Record_Area_Head] = talent.AreaHead;
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
            listItem[KTPConstants.Talent_Record_Employee] = SharePointOnlineHelper.ResolveUser(talent.Name.value);
            listItem[KTPConstants.Talent_Record_Manager] = SharePointOnlineHelper.ResolveUser(talent.Manager.value);
          

            //listItem["ID"] = talent.Id;
            return listItem;

            /*
             * i:0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             * i: 0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             */
        }
    }
}