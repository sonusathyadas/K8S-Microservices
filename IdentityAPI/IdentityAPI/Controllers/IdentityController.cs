using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityAPI.Infrastructure;
using IdentityAPI.Models;
using IdentityAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IdentityAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private IIdentityManager idManager;

        public IdentityController(IIdentityManager identityManager)
        {
            this.idManager = identityManager;
        }
        
        //POST /api/identity/register
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<dynamic>> Register([FromBody]User user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result=await idManager.AddUserAsync(user);
            return Created("",result);
        }

        //POST /api/identity/token
        [HttpPost("token")]
        public ActionResult<string> Token([FromBody]LoginModel login)
        {
            var token= idManager.ValidateUser(login);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Invalid userid and password");
            }
            return Ok(token);
        }

    }
}