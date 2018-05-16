using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;
using Kier.TalentPortal.WebAPI.Models;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using Swashbuckle.Swagger.Annotations;

namespace Kier.TalentPortal.WebAPI.Controllers
{
    public class TalentsController : ApiController
    {
        public IHttpActionResult Get(int id)
        {
            AuthenticationManager authMgr = new AuthenticationManager();
            using (ClientContext ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                //var item = list.AddItem(new ListItemCreationInformation());
                //item["Title"] = DateTime.Now.ToLongTimeString();
                //item.Update();
                var listItem = list.GetItemById(1);
                
                ctx.Load(listItem);
                ctx.ExecuteQuery();
                var x = listItem["Title"];
            }
                var talent = new Talent();
            return Ok(talent);
        }

        [HttpPost]
        public IHttpActionResult NewTalentRecord([FromBody]Talent talent)
        {
            var x = talent;
            AuthenticationManager authMgr = new AuthenticationManager();
            using (ClientContext ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem newItem = list.AddItem(itemCreateInfo);
                newItem[Constants.Talent_Record_Division] = talent.Division;
                newItem[Constants.Talent_Record_Business_Stream] = talent.Stream;
                newItem[Constants.Talent_Record_Business_Unit] = talent.Unit;
                newItem[Constants.Talent_Record_Area_Head] = talent.AreaHead;
                newItem[Constants.Talent_Record_Business_Risk] = talent.BusinessRisk;
                newItem[Constants.Talent_Record_Development_Notes] = talent.Notes;
                newItem[Constants.Talent_Record_Employee_Id] = talent.EmployeeId;
                newItem[Constants.Talent_Record_Flight_Risk] = talent.FlightRisk;
                newItem[Constants.Talent_Record_Function] = talent.Function;
                newItem[Constants.Talent_Record_Grade] = talent.Grade;
                newItem[Constants.Talent_Record_Location] = talent.Location;
                newItem[Constants.Talent_Record_Movement] = talent.Movement;
                newItem[Constants.Talent_Record_Performance] = talent.Performance;
                newItem[Constants.Talent_Record_Potential] = talent.Potential;

                newItem.Update();
                ctx.ExecuteQuery();
            }

            return Ok(talent);
        }

        [HttpPut]
        public IHttpActionResult UpdateTalentRecord([FromBody]Talent talent)
        {
         
            AuthenticationManager authMgr = new AuthenticationManager();
            using (ClientContext ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                
                var list = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["listName"]);
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem newItem = list.AddItem(itemCreateInfo);
                newItem[Constants.Talent_Record_Division] = talent.Division;
                newItem[Constants.Talent_Record_Business_Stream] = talent.Stream;
                newItem[Constants.Talent_Record_Business_Unit] = talent.Unit;
                newItem[Constants.Talent_Record_Area_Head] = talent.AreaHead;
                newItem[Constants.Talent_Record_Business_Risk] = talent.BusinessRisk;
                newItem[Constants.Talent_Record_Development_Notes] = talent.Notes;
                newItem[Constants.Talent_Record_Employee_Id] = talent.EmployeeId;
                newItem[Constants.Talent_Record_Flight_Risk] = talent.FlightRisk;
                newItem[Constants.Talent_Record_Function] = talent.Function;
                newItem[Constants.Talent_Record_Grade] = talent.Grade;
                newItem[Constants.Talent_Record_Location] = talent.Location;
                newItem[Constants.Talent_Record_Movement] = talent.Movement;
                newItem[Constants.Talent_Record_Performance] = talent.Performance;
                newItem[Constants.Talent_Record_Potential] = talent.Potential;

                newItem.Update();
                ctx.ExecuteQuery();
            }

            return Ok(talent);
        }



    }
}
