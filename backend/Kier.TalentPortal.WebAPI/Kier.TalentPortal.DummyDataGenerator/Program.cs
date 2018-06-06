using CsvHelper;
using Kier.TalentPortal.SharedKernal.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kier.TalentPortal.DummyDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            StreamReader sr = new StreamReader(@"C:\Dev\talent-portal-refresh\Kier_Talent_DB\Provisioning\Data_Load_Test_30Records.csv");
            var csv = new CsvReader(sr);        
            while (csv.Read())
            {
                var employeeId = csv.GetField<string>(0);
                var firstName = csv.GetField<string>(1);
                var lastName = csv.GetField<string>(2);
                var fullName = csv.GetField<string>(3);
                var gender = csv.GetField<string>(4);
                var divison = csv.GetField<string>(5);
                var stream = csv.GetField<string>(6);
                var unit = csv.GetField<string>(7);
                var reportingUnit = csv.GetField<string>(8);
                var position = csv.GetField<string>(9);
                var grade = csv.GetField<string>(10);
                var managerName = csv.GetField<string>(11);
                var location = csv.GetField<string>(13);
                var performance = csv.GetField<string>(14);
                var potential = csv.GetField<string>(15);
                var flightRisk = csv.GetField<string>(16);
                var businessRisk = csv.GetField<string>(17);
                var movement = csv.GetField<string>(18);
                var function = csv.GetField<string>(19);


                try
                {
                    using (var ctx = SharePointOnlineHelper.GetElevatedContext())
                    {
                        var talent = new Talent() {
                            EmployeeId = employeeId,
                            Name = new SharedKernal.Models.User() { value = fullName, text = fullName },
                            Manager = new SharedKernal.Models.User() { value = managerName, text = managerName },
                            Division = divison,
                            Stream = stream,
                            Unit = unit,
                            ReportingUnit = reportingUnit,
                            BusinessRisk = businessRisk,
                            FlightRisk = flightRisk,
                            Function = function,
                            Grade = grade,
                            Location = location,
                            Movement = movement,
                            Performance = performance,
                            Potential = potential,
                            SubmissionYear = 2017,
                            IsCurrentSubmission = false,
                            Position = position,
                            Gender = gender,
                            IsLeaver = false
                        };
                        //LoadSecurityMatrix(talent, ctx);
                        var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                        ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                        ListItem newItem = list.AddItem(itemCreateInfo);
                        newItem = Talent.ToSPListItem(talent, newItem);
                        newItem.Update();
                        //SetPermissions(talent, newItem, ctx, this._roleDefinition);
                        ctx.ExecuteQuery();
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }

            }


            //csv.Configuration.HeaderValidated = null;
            //csv.Configuration.MissingFieldFound = null;
            //var records = csv.GetRecords<Talent>().ToList();
            Console.Read();

        }
    }
}
