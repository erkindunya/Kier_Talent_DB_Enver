using System;
using System.Diagnostics;
using System.Text;
using Kier.TalentPortal.SharedKernal;

namespace Kier.TalentPortal.SecurityMatrixBuilder
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
             * Connect to Web Api
             * Get Business Unit Tree
             * Connect to SharePoint
             * Get All User Groups
             * Build Kier Matrix User Groups
             * Corss-check with Groups Retrived From SP
             * Create the new groups
             */

            try
            {

                var businessUnits = SecurityMatrixHelper.GetBusinessUnits().GetAwaiter().GetResult();
                var groupsFromSharePoint = SecurityMatrixHelper.GetSecurityGroupsFromSharePoint();
                var groupNames = SecurityMatrixHelper.BuildSecurityGroupNamesFromBusinessUnits(businessUnits);
                var groupsToCreate = SecurityMatrixHelper.GetGroupsToCreat(groupsFromSharePoint, groupNames);
                Stopwatch stopwatch = Stopwatch.StartNew(); //creates and start the instance of Stopwatch

                SecurityMatrixHelper.CreateSecurityGroups(groupsToCreate);
                stopwatch.Stop();
                Console.WriteLine(stopwatch.ElapsedMilliseconds);
                Console.WriteLine("End");
                Console.Read();

            }
            catch (Exception e)
            {
                var x = e;
            }

        }
    }
}
