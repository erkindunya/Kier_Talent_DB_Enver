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
            using (var ctx = SharePointOnlineHelper.GetElevatedContext())
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

        private Group _divisionSecurityGroup;
        private Group _streamSecurityGroup;
        private Group _unitSecurityGroup;
        private RoleDefinition _roleDefinition;

        [HttpPost]
        public IHttpActionResult NewTalentRecord([FromBody] Talent talent)
        {
            try
            {
                using (var ctx = SharePointOnlineHelper.GetElevatedContext())
                {
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
                return InternalServerError(e);
            }

            return Ok(talent);
        }

        private void SetPermissions(Talent talent, ListItem newItem, ClientContext ctx, RoleDefinition editPermissionLevel)
        {
            newItem.BreakRoleInheritance(false, true);
            RoleDefinitionBindingCollection collRoleDefinitionBinding =
                new RoleDefinitionBindingCollection(ctx);
            collRoleDefinitionBinding.Add(editPermissionLevel);

            newItem.RoleAssignments.Add(this._divisionSecurityGroup, collRoleDefinitionBinding);
            newItem.RoleAssignments.Add(this._streamSecurityGroup, collRoleDefinitionBinding);
            if (!talent.Grade.StartsWith("L"))
                newItem.RoleAssignments.Add(this._unitSecurityGroup, collRoleDefinitionBinding);
        }

        private void LoadSecurityMatrix(Talent talent, ClientContext ctx)
        {
            this._roleDefinition = ctx.Web.RoleDefinitions.GetByType(RoleType.Contributor);
            this._divisionSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetDivionGroupName());
            this._streamSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetBusinessStreamGroupName());
            this._unitSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetBusinessUnitGroupName());
            ctx.Load(this._divisionSecurityGroup);
            ctx.Load(this._streamSecurityGroup);
            ctx.Load(this._unitSecurityGroup);
            ctx.ExecuteQuery();
        }

        [HttpPut]
        public IHttpActionResult UpdateTalentRecord([FromBody] Talent talent)
        {
            
            using (var ctx = SharePointOnlineHelper.GetElevatedContext())
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