using System.Configuration;
using System.Linq;
using System.Web.Http;
using Kier.TalentPortal.WebAPI.Models;
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
                query.ViewXml = Constants.Get_Talent_Record_By_EmployeeId_Query.Replace("EMP_ID", employeeId);
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

        [HttpPost]
        public IHttpActionResult NewTalentRecord([FromBody] Talent talent)
        {
            var x = talent;
            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem newItem = list.AddItem(itemCreateInfo);
                newItem = Talent.ToSPListItem(talent, newItem);
                newItem.Update();
                ctx.ExecuteQuery();
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