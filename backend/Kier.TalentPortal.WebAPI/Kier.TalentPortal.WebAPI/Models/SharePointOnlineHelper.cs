using System.Configuration;
using System.Linq;
using System.Web.Http;
using Kier.TalentPortal.WebAPI.Models;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;

namespace Kier.TalentPortal.WebAPI.Models
{
    public class SharePointOnlineHelper

    {
        public static ClientContext GetElevatedContext()
        {
            var authMgr = new AuthenticationManager();
            var ctx = authMgr.GetAppOnlyAuthenticatedContext(
                ConfigurationManager.AppSettings["siteUrl"],
                ConfigurationManager.AppSettings["clientId"],
                ConfigurationManager.AppSettings["clientSecret"]);
            return ctx;
        }

        public static int RetrieveUserId(string key)
        {
            var ctx = SharePointOnlineHelper.GetElevatedContext();
            using (ctx)
            {                
                var user = ctx.Web.EnsureUser(key);
                ctx.Load(user);
                ctx.ExecuteQuery();
                return user.Id;
            }
        }

        public static FieldUserValue ResolveUser(string key)
        {
            var fieldValue = new FieldUserValue();
            var userId = RetrieveUserId(key);
            fieldValue.LookupId = userId;
            return fieldValue;
        }
    }
}