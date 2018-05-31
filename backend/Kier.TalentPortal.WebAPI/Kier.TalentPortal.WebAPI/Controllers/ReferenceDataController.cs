using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using Kier.TalentPortal.SharedKernal;
using Kier.TalentPortal.SharedKernal.Models;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;



namespace Kier.TalentPortal.WebAPI.Controllers
{
    public class ReferenceDataController : ApiController
    {
        [HttpGet]
        //[Route("BusinessUnits")]
        [Route("api/Reference/BusinessUnits")]
        public IList<Lookup> GetBusinessUnitsLookups()
        {
            IList<Lookup> result = new List<Lookup>();

            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var businessUnitsList = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["businessUnitsList"]);
                var query = CamlQuery.CreateAllItemsQuery();


        var items = businessUnitsList.GetItems(query);
                ctx.Load(items);
                ctx.ExecuteQuery();


                var converted = items.ToList();
                var divisons = converted.ToList().Select(i => i[KTPConstants.Business_Unit_Divison]).Distinct();

                foreach (var division in divisons)
                {
                    Lookup divisonLookup = new Lookup()
                    {
                        label = division.ToString().PrepString(),
                        value = division.ToString().PrepString()
                    };
                    var filteredByDivision = converted.Where(i =>
                        i[KTPConstants.Business_Unit_Divison].ToString() == division.ToString());
                    var currentDivisonStreams = filteredByDivision.ToList()
                        .Select(i => i[KTPConstants.Business_Unit_Stream]).Distinct();
                    foreach (var stream in currentDivisonStreams)
                    {
                        Lookup streamLookup = new Lookup()
                        {
                            label = stream.ToString().PrepString(),
                            value = stream.ToString().PrepString()
                        };
                        var filteredByStream = filteredByDivision.ToList().Where(i =>
                            i[KTPConstants.Business_Unit_Stream].ToString() == stream.ToString());
                        var currentStreamUnits = filteredByStream.ToList().Select(i => i[KTPConstants.Business_Unit_Unit])
                            .Distinct();

                        foreach (var unit in currentStreamUnits)
                        {
                            Lookup unitLookup = new Lookup()
                            {
                                label = unit.ToString().PrepString(),
                                value = unit.ToString().PrepString()
                            };

                            var filteredByUnit = filteredByStream.ToList().Where(i =>
                                i[KTPConstants.Business_Unit_Unit].ToString() == unit.ToString());
                            var currentUnitLocations = filteredByUnit.ToList()
                                .Select(i => i[KTPConstants.Business_Unit_Location]).Distinct();

                            foreach (var location in currentUnitLocations)
                            {
                                var locationLookup = new Lookup()
                                {
                                    label = location.ToString().PrepString(),
                                    value = location.ToString().PrepString()
                                };
                                unitLookup.children.Add(locationLookup);
                            }

                            streamLookup.children.Add(unitLookup);
                        }

                        divisonLookup.children.Add(streamLookup);
                    }

                    result.Add(divisonLookup);
                }
            }

            //Retrive all items from Business Units list
            // Get data from configuration
            //Group data using something

            return result;
        }

        [HttpGet]
       // [Route("BusinessFunctions")]
        [Route("api/Reference/Functions")]
        public IList<Lookup> GetBusinessFunctionsLookups()
        {
            IList<Lookup> result = new List<Lookup>();

            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var businessFunctionsList =
                    ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["businessFunctionsList"]);
                var query = CamlQuery.CreateAllItemsQuery();
                var items = businessFunctionsList.GetItems(query);
                ctx.Load(items);
                ctx.ExecuteQuery();

                items.ToList().ForEach(item =>
                {
                    var lookupValue = item["Title"].ToString();
                    var lookup = new Lookup() {label = lookupValue, value = lookupValue};
                    result.Add(lookup);
                });
            }

            return result;
        }


        [HttpGet]
        //[Route("Grade")]
        [Route("api/Reference/Grades")]
        public IList<Lookup> GetGradesLookups()
        {
            IList<Lookup> result = new List<Lookup>();

            var authMgr = new AuthenticationManager();
            using (var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]))
            {
                var gradesList = ctx.Web.Lists.GetByTitle(ConfigurationManager.AppSettings["GradesList"]);
                var query = CamlQuery.CreateAllItemsQuery();
                var items = gradesList.GetItems(query);
                ctx.Load(items);
                ctx.ExecuteQuery();

                items.ToList().ForEach(item =>
                {
                    var lookupValue = item["Title"].ToString();
                    var lookup = new Lookup() { label = lookupValue, value = lookupValue };
                    result.Add(lookup);
                });
            }

            return result;
        }
    }
}