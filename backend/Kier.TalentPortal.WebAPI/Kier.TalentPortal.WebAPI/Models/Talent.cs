using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
    }
}