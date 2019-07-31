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
<<<<<<< HEAD
        {            
            this.settings = options.Value;
            Console.WriteLine(options.Value.EventApiUrl);
=======
        {
            this.settings = options.Value;
>>>>>>> a02995eb2724286f928d6e75a9137507aed8c1d0
        }

        [HttpGet]
        public ActionResult<AppSettings> GetSettings()
        {
            return settings;
        }

        
    }
}
