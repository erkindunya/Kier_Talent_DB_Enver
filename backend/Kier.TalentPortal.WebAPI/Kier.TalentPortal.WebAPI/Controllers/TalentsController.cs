using System;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using Kier.TalentPortal.SharedKernal;
using Kier.TalentPortal.SharedKernal.Models;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;

namespace Kier.TalentPortal.WebAPI.Controllers
{
    public class TalentsController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetTalent(int id, string employeeId)
        {
            Talent talent = default(Talent);
            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {

          

                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                var query = new CamlQuery();
                query.ViewXml = KTPConstants.Get_Talent_Record_By_EmployeeId_Query.Replace("EMP_ID", employeeId);
                var result = list.GetItems(query);
                ctx.Load(result);
                ctx.ExecuteQuery();
                talent = Talent.FromSPListItem(result[0]);
                if (result.ToList().Count >= 2)
                {
                   
                   talent.PreviousYear = PreviousYearRating.FromSPListItem(result[1]);
                }
            }

            return Ok(talent);
        }


        private void SetupPermissions(Talent talent)
        {
            /*
             * Check the Grade
             * if L2,L1
             * Give permission for two levels only
             *
             * if anything else
             * Give permission for 3 levels
             */
            var divisionGroup = talent.GetDivionGroupName();
            var streamGroup = talent.GetBusinessStreamGroupName();
            var unitGroup = talent.GetBusinessUnitGroupName();
            // if (talent.Grade.StartsWith("L"))
        }
        [HttpPost]
        public IHttpActionResult NewTalentRecord([FromBody] Talent talent)
        {
            var x = talent;
            var authMgr = new AuthenticationManager();
            try
            {
                using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                    ConfigurationManager.AppSettings["siteUrl"],
                    ConfigurationManager.AppSettings["clientId"],
                    ConfigurationManager.AppSettings["clientSecret"]))
                {

                    var editPermissionLevel = ctx.Web.RoleDefinitions.GetByType(RoleType.Contributor);
                    var divisionGroup = ctx.Web.SiteGroups.GetByName(talent.GetDivionGroupName());
                    var streamGroup = ctx.Web.SiteGroups.GetByName(talent.GetBusinessStreamGroupName());
                    var unitGroup = ctx.Web.SiteGroups.GetByName(talent.GetBusinessUnitGroupName());
                    ctx.Load(divisionGroup);
                    ctx.Load(streamGroup);
                    ctx.Load(unitGroup);
                    ctx.ExecuteQuery();

                    var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);

                    ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                    ListItem newItem = list.AddItem(itemCreateInfo);
                    newItem = Talent.ToSPListItem(talent, newItem);
                    newItem.Update();
                    newItem.BreakRoleInheritance(false, true);
                    RoleDefinitionBindingCollection collRoleDefinitionBinding =
                        new RoleDefinitionBindingCollection(ctx);
                    collRoleDefinitionBinding.Add(editPermissionLevel);

                    newItem.RoleAssignments.Add(divisionGroup, collRoleDefinitionBinding);
                    newItem.RoleAssignments.Add(streamGroup, collRoleDefinitionBinding);
                    if(!talent.Grade.StartsWith("L"))
                        newItem.RoleAssignments.Add(unitGroup, collRoleDefinitionBinding);




                    
                    
                    ctx.ExecuteQuery();
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(talent);
        }

        [HttpPut]
        public IHttpActionResult UpdateTalentRecord([FromBody] Talent talent)
        {
            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                var item = list.GetItemById(talent.Id);
                ctx.ExecuteQuery();

                item = Talent.ToSPListItem(talent, item);
                item.Update();
                ctx.ExecuteQuery();
            }

            return Ok();
        }
    }
}