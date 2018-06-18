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
using Kier.TalentPortal.SharedKernal;

namespace Kier.TalentPortal.DummyDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            StreamReader sr = new StreamReader(@"C:\Dev\talent-portal-refresh\Kier_Talent_DB\Provisioning\Demo_Dummy_Data.csv");
            var csv = new CsvReader(sr);
            //csv.Read(); //Skip Header
            Console.WriteLine(DateTime.Now.ToLongTimeString());
            while (csv.Read())
            {
                var employeeId = csv.GetField<string>(0);
                var firstName = csv.GetField<string>(1);
                var lastName = csv.GetField<string>(2);
                var fullName = string.Concat(lastName + ", " + firstName);
                var employeeEmail = csv.GetField<string>(20);
                var gender = csv.GetField<string>(4);
                var divison = csv.GetField<string>(5);
                var stream = csv.GetField<string>(6);
                var unit = csv.GetField<string>(7);
                var reportingUnit = csv.GetField<string>(8);
                var position = csv.GetField<string>(9);
                var grade = csv.GetField<string>(10);
                var managerName = csv.GetField<string>(11);
                var managerEmail = csv.GetField<string>(21);
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
                            Name = new SharedKernal.Models.User() { value = employeeEmail, text = fullName },
                            Manager = new SharedKernal.Models.User() { value = managerEmail, text = managerName },
                            Division = divison,
                            Stream = stream,
                            Unit = unit,
                            ReportingUnit = reportingUnit,
                            
                            
                            Function = function,
                            Grade = grade,
                            Location = location,

                            Performance = performance,
                            Potential = potential,
                            BusinessRisk = businessRisk,
                            FlightRisk = flightRisk,


                            SubmissionYear = 2017,
                            IsCurrentSubmission = false,
                            Position = position,
                            Gender = gender,
                            IsLeaver = false
                        };

                        var _roleDefinition = ctx.Web.RoleDefinitions.GetByType(RoleType.Reader);
                        var _divisionAllRecordsSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetAllDivisionRecordsGroupName());
                        var _streamAllRecordsSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetAllStreamRecordsGroupName());
                        var _upToL1SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUptoL1GroupName());
                        var _upToL2SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUptoL2GroupName());
                        var _upToM3SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUpToM3GroupName());
                        var _talentAdmins = ctx.Web.SiteGroups.GetByName(talent.GetTalentAdminsGroupName());

                        ctx.Load(_divisionAllRecordsSecurityGroup);
                        ctx.Load(_upToL1SecurityGroup);
                        ctx.Load(_upToL2SecurityGroup);
                        ctx.Load(_upToM3SecurityGroup);
                        ctx.Load(_talentAdmins);

                        ctx.ExecuteQuery();

                        var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                        ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                        ListItem newItem = list.AddItem(itemCreateInfo);
                        newItem = Talent.ToSPListItem(talent, newItem);
                        newItem.Update();


                        newItem.BreakRoleInheritance(false, true);
                        RoleDefinitionBindingCollection collRoleDefinitionBinding =
                            new RoleDefinitionBindingCollection(ctx);
                        collRoleDefinitionBinding.Add(_roleDefinition);


                        //Add access to Talent Admins and Division group
                        newItem.RoleAssignments.Add(_talentAdmins, collRoleDefinitionBinding);
                        newItem.RoleAssignments.Add(_divisionAllRecordsSecurityGroup, collRoleDefinitionBinding);
                        newItem.RoleAssignments.Add(_streamAllRecordsSecurityGroup, collRoleDefinitionBinding);

                        if (talent.IsL2Employee())
                            newItem.RoleAssignments.Add(_upToL2SecurityGroup, collRoleDefinitionBinding);

                        if (talent.IsL1Employee())
                        {
                            newItem.RoleAssignments.Add(_upToL2SecurityGroup, collRoleDefinitionBinding);
                            newItem.RoleAssignments.Add(_upToL1SecurityGroup, collRoleDefinitionBinding);
                        }

                        if (talent.IsCorMEmployee())
                        {
                            newItem.RoleAssignments.Add(_upToL2SecurityGroup, collRoleDefinitionBinding);
                            newItem.RoleAssignments.Add(_upToL1SecurityGroup, collRoleDefinitionBinding);
                            newItem.RoleAssignments.Add(_upToM3SecurityGroup, collRoleDefinitionBinding);
                        }


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
            Console.WriteLine(DateTime.Now.ToLongTimeString());
            Console.Read();

        }
    }
}
