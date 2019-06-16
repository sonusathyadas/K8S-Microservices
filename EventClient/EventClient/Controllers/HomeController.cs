using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventClient.Models;
using Microsoft.Extensions.Options;

namespace EventClient.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private AppSettings settings;

        public SettingsController(IOptions<AppSettings> options)
        {
            this.settings = options.Value;
        }

        [HttpGet]
        public ActionResult<AppSettings> GetSettings()
        {
            return settings;
        }

        
    }
}
