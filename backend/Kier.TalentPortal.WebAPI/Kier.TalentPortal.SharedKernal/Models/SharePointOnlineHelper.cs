using System;
using System.Configuration;
using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;

namespace Kier.TalentPortal.SharedKernal.Models
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


        public static User GetUser(string key)

        {
            var ctx = SharePointOnlineHelper.GetElevatedContext();
            using (ctx)
            {
                var user = ctx.Web.EnsureUser(key);
                ctx.Load(user);
                ctx.ExecuteQuery();                
                return new User() {value = user.LoginName, text = user.Title};
            }
        }

        public static FieldUserValue ResolveUser(string key)
        {
            var fieldValue = default(FieldUserValue);
            try
            {
                var userId = RetrieveUserId(key);
                fieldValue = new FieldUserValue();    
                fieldValue.LookupId = userId;
            }
            catch (Exception e)
            {
            }
            return fieldValue;
        }
    }
}