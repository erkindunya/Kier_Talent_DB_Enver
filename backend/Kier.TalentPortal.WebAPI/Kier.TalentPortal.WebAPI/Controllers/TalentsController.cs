using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Kier.TalentPortal.WebAPI.Models;
using Swashbuckle.Swagger.Annotations;

namespace Kier.TalentPortal.WebAPI.Controllers
{
    public class TalentsController : ApiController
    {
        [SwaggerOperation("GetTalentById")]
        public IHttpActionResult Get(int id)
        {
            var talent = new Talent();
            return Ok(talent);
        }
    }
}
