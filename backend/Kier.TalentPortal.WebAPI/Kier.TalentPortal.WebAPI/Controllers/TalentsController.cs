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

        private Group _divisionAllRecordsSecurityGroup;
        private Group _streamAllRecordsSecurityGroup;
        private Group _upToL1SecurityGroup;
        private Group _upToL2SecurityGroup;
        private Group _upToM3SecurityGroup;
        private Group _talentAdmins;
        private RoleDefinition _roleDefinition;

        [HttpPost]
        public IHttpActionResult NewTalentRecord([FromBody] Talent talent)
        {
            try
            {
                using (var ctx = SharePointOnlineHelper.GetElevatedContext())
                {
                    LoadSecurityMatrix(talent, ctx);
                    var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                    ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                    ListItem newItem = list.AddItem(itemCreateInfo);
                    newItem = Talent.ToSPListItem(talent, newItem);
                    newItem.Update();
                    SetPermissions(talent, newItem, ctx, this._roleDefinition);
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


            //Add access to Talent Admins and Division group
            newItem.RoleAssignments.Add(this._talentAdmins, collRoleDefinitionBinding);
            newItem.RoleAssignments.Add(this._divisionAllRecordsSecurityGroup, collRoleDefinitionBinding);
            newItem.RoleAssignments.Add(this._streamAllRecordsSecurityGroup, collRoleDefinitionBinding);

            if (talent.IsL2Employee())
                newItem.RoleAssignments.Add(this._upToL2SecurityGroup, collRoleDefinitionBinding);

            if (talent.IsL1Employee())
            {
                newItem.RoleAssignments.Add(this._upToL2SecurityGroup, collRoleDefinitionBinding);
                newItem.RoleAssignments.Add(this._upToL1SecurityGroup, collRoleDefinitionBinding);
            }

            if (talent.IsCorMEmployee())
            {
                newItem.RoleAssignments.Add(this._upToL2SecurityGroup, collRoleDefinitionBinding);
                newItem.RoleAssignments.Add(this._upToL1SecurityGroup, collRoleDefinitionBinding);
                newItem.RoleAssignments.Add(this._upToM3SecurityGroup, collRoleDefinitionBinding);
            }
        }

        private void LoadSecurityMatrix(Talent talent, ClientContext ctx)
        {
            this._roleDefinition = ctx.Web.RoleDefinitions.GetByType(RoleType.Contributor);
            this._divisionAllRecordsSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetAllDivisionRecordsGroupName());
            this._streamAllRecordsSecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetAllStreamRecordsGroupName()); 
            this._upToL1SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUptoL1GroupName());
            this._upToL2SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUptoL2GroupName());
            this._upToM3SecurityGroup = ctx.Web.SiteGroups.GetByName(talent.GetUpToM3GroupName());
            this._talentAdmins = ctx.Web.SiteGroups.GetByName(talent.GetTalentAdminsGroupName());

            ctx.Load(this._divisionAllRecordsSecurityGroup);
            ctx.Load(this._upToL1SecurityGroup);
            ctx.Load(this._upToL2SecurityGroup);
            ctx.Load(this._upToM3SecurityGroup);
            ctx.Load(this._talentAdmins);

            ctx.ExecuteQuery();
        }

        [HttpPut]
        public IHttpActionResult UpdateTalentRecord([FromBody] Talent talent)
        {

            using (var ctx = SharePointOnlineHelper.GetElevatedContext())
            {
                LoadSecurityMatrix(talent, ctx);
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                var item = list.GetItemById(talent.Id);
                ctx.ExecuteQuery();

                item = Talent.ToSPListItem(talent, item);
                item.Update();
                item.ResetRoleInheritance();
                SetPermissions(talent, item, ctx, this._roleDefinition);
                ctx.ExecuteQuery();
            }

            return Ok();
        }
    }
}