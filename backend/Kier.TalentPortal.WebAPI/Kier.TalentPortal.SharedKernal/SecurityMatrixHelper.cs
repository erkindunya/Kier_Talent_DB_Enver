using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Kier.TalentPortal.SharedKernal;
using Kier.TalentPortal.SharedKernal.Models;
using Microsoft.SharePoint.Client;

namespace Kier.TalentPortal.SharedKernal
{
    public class SecurityMatrixHelper
    {

        private static string DELIMITER = "-";
        public static IList<string> GetGroupsToCreat(IDictionary groupsFromSharePoint, IList<string> groupNames)
        {
            var result = new List<string>();
            foreach (var name in groupNames)
            {
                if (GroupNotCreatedYet(groupsFromSharePoint, name))
                {
                    result.Add(name);
                }
            }
            return result;
        }

        public static bool GroupNotCreatedYet(IDictionary groupsFromSharePoint, string name)
        {
            return !groupsFromSharePoint.Contains(name);
        }

        public static async Task<IList<Lookup>> GetBusinessUnits()
        {

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://kiertalentportalwebapi20180517103444.azurewebsites.net/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            IList<Lookup> lookups = default(IList<Lookup>);
            HttpResponseMessage response = await client.GetAsync(
                "api/referenceData/GetBusinessUnitsLookups");
            if (response.IsSuccessStatusCode)
            {
                lookups = await response.Content.ReadAsAsync<IList<Lookup>>();
            }
            return lookups;
        }

        

        public static void CreateSecurityGroups(IList<string> groupNames)
        {
            var context = SharePointOnlineHelper.GetElevatedContext();
            var results = new Dictionary<string, int>();

            try
            {
                using (context)
                {
                    foreach (var group in groupNames)
                    {
                        try
                        {
                            var groupInfo = new GroupCreationInformation();
                            groupInfo.Title = @group;
                            context.Web.SiteGroups.Add(groupInfo);
                            context.ExecuteQuery();
                        }
                        catch (Exception e)
                        {
                            var c = e.Message;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                var message = e.Message;
            }
        }

        public static IList<string> BuildSecurityGroupNamesFromBusinessUnits(IList<Lookup> businessUnits)
        {
            var result = new List<string>();
            foreach (var division in businessUnits)
            {
                result.Add(division.label.PrepString());
                foreach (var stream in division.children)
                {
                    result.Add(string.Concat(division.label.PrepString(), (string) DELIMITER,stream.label.PrepString()));

                    foreach (var unit in stream.children)
                    {
                        result.Add(string.Concat(division.label.PrepString(), DELIMITER, stream.label.PrepString(), DELIMITER, unit.label.PrepString()));
                       
                    }
                }
            }
            return result;
        }

        public static IDictionary GetSecurityGroupsFromSharePoint()
        {
            var context = SharePointOnlineHelper.GetElevatedContext();
            var results = new Dictionary<string, int>();
            using (context)
            {

                var groupsFromSharePoint = context.Web.SiteGroups;
                context.Load(groupsFromSharePoint);
                context.ExecuteQuery();
                groupsFromSharePoint.ToList().ForEach(group => results.Add(@group.Title, @group.Id));
            }
            return results;

        }
    }
}