using System;
using Microsoft.SharePoint.Client;

namespace Kier.TalentPortal.SharedKernal.Models
{
    public class PreviousYearRating
    {
        public string Performance { get; set; }
        public string Potential { get; set; }
        public int Year { get; set; }
        public string By { get; set; }
        public DateTime At { get; set; }

        public static PreviousYearRating FromSPListItem(ListItem item)
        {

            var talent = new PreviousYearRating();
            talent.Performance = (item[KTPConstants.Talent_Record_Performance] != null) ? item[KTPConstants.Talent_Record_Performance].ToString() : "";
            talent.Potential = (item[KTPConstants.Talent_Record_Potential] != null) ? item[KTPConstants.Talent_Record_Potential].ToString() : "";
            talent.At = DateTime.Today;
            talent.By = "Mohamed Khalil";
            talent.Year = (item[KTPConstants.Talent_Record_Submission_Year] != null)
                ? int.Parse(item[KTPConstants.Talent_Record_Submission_Year].ToString())
                : -1;
            return talent;
        }
    }
}