using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.SharePoint.Client;

namespace Kier.TalentPortal.WebAPI.Models
{
    public class Talent
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }
        public string Name { get; set; }
        public string Manager { get; set; }
        public string AreaHead { get; set; }
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
        public Talent PreviousYear { get; set; }

        public static Talent FromSPListItem(ListItem item)
        {
            var talent = new Talent();
            talent.Division = (item[Constants.Talent_Record_Division]!=null)? item[Constants.Talent_Record_Division].ToString():"" ;
            talent.Stream = (item[Constants.Talent_Record_Business_Stream]!=null)? item[Constants.Talent_Record_Business_Stream].ToString():"" ;
            talent.Unit = (item[Constants.Talent_Record_Business_Unit] != null) ? item[Constants.Talent_Record_Business_Unit].ToString() : "";
            talent.AreaHead = (item[Constants.Talent_Record_Area_Head]!=null)? item[Constants.Talent_Record_Area_Head].ToString():"";
            talent.BusinessRisk = item[Constants.Talent_Record_Business_Risk].ToString();
            talent.Notes = (item[Constants.Talent_Record_Development_Notes] != null) ? item[Constants.Talent_Record_Development_Notes].ToString() : "";
            talent.EmployeeId = (item[Constants.Talent_Record_Employee_Id] != null) ? item[Constants.Talent_Record_Employee_Id].ToString() : "";
            talent.FlightRisk = (item[Constants.Talent_Record_Flight_Risk] != null) ? item[Constants.Talent_Record_Flight_Risk].ToString() : "";
            talent.Function = (item[Constants.Talent_Record_Function] != null) ? item[Constants.Talent_Record_Function].ToString() : "";
            talent.Grade = (item[Constants.Talent_Record_Grade] != null) ? item[Constants.Talent_Record_Grade].ToString() : "";
            talent.Location = (item[Constants.Talent_Record_Location] != null) ? item[Constants.Talent_Record_Location].ToString() : "";
            talent.Movement = (item[Constants.Talent_Record_Movement] != null) ? item[Constants.Talent_Record_Movement].ToString() : "";
            talent.Performance = (item[Constants.Talent_Record_Performance] != null) ? item[Constants.Talent_Record_Performance].ToString() : "";
            talent.Potential = (item[Constants.Talent_Record_Potential] != null) ? item[Constants.Talent_Record_Potential].ToString() : "";
            talent.IsCurrentSubmission = (item[Constants.Talent_Record_Is_Current_Submission] != null)
                ? bool.Parse(item[Constants.Talent_Record_Is_Current_Submission].ToString())
                : false;
            talent.SubmissionYear = (item[Constants.Talent_Record_Submission_Year] != null)
                ? int.Parse(item[Constants.Talent_Record_Submission_Year].ToString())
                : -1;
            talent.Id = (item["ID"]!=null)? int.Parse(item["ID"].ToString()):-1;
            talent.Name = "i:0#.f|membership|khalis@maksharepoint.onmicrosoft.com";
            talent.Manager = "i:0#.f|membership|khalis@maksharepoint.onmicrosoft.com";
            talent.Requirements_01_category = "Data";
            talent.Requirements_01_subcategory = "Data";
            talent.Requirements_02_category = "Data";
            talent.Requirements_02_subcategory = "Data";
            talent.Position = (item[Constants.Talent_Record_Position]!= null)? item[Constants.Talent_Record_Position].ToString():"";

            return talent;
        }

        public static ListItem ToSPListItem(Talent talent, ListItem listItem)
        {
  
            listItem[Constants.Talent_Record_Division] = talent.Division;
            listItem[Constants.Talent_Record_Business_Stream] = talent.Stream;
            listItem[Constants.Talent_Record_Business_Unit] = talent.Unit;
            listItem[Constants.Talent_Record_Area_Head] = talent.AreaHead;
            listItem[Constants.Talent_Record_Business_Risk] = talent.BusinessRisk;
            listItem[Constants.Talent_Record_Development_Notes] = talent.Notes;
            listItem[Constants.Talent_Record_Employee_Id] = talent.EmployeeId;
            listItem[Constants.Talent_Record_Flight_Risk] = talent.FlightRisk;
            listItem[Constants.Talent_Record_Function] = talent.Function;
            listItem[Constants.Talent_Record_Grade] = talent.Grade;
            listItem[Constants.Talent_Record_Location] = talent.Location;
            listItem[Constants.Talent_Record_Movement] = talent.Movement;
            listItem[Constants.Talent_Record_Performance] = talent.Performance;
            listItem[Constants.Talent_Record_Potential] = talent.Potential;
            listItem[Constants.Talent_Record_Submission_Year] = talent.SubmissionYear;
            listItem[Constants.Talent_Record_Position] = talent.Position;
            listItem[Constants.Talent_Record_Employee] = SharePointOnlineHelper.ResolveUser(talent.Name);
            listItem[Constants.Talent_Record_Manager] = SharePointOnlineHelper.ResolveUser(talent.Manager);
          

            //listItem["ID"] = talent.Id;
            return listItem;

            /*
             * i:0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             * i: 0#.f|membership|khalis@maksharepoint.onmicrosoft.com
             */
        }
    }
}