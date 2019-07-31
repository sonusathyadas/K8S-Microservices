using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using EventAPI.Models;
using EventAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventAPI.Controllers
{
    [Authorize]
    [FormatFilter]
    //[Produces("application/json")]
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventRepository<EventData> eventRepo;

        public EventsController(IEventRepository<EventData> eventRepo)
        {
            this.eventRepo = eventRepo;
        }

        //GET /api/events
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [AllowAnonymous]
        public ActionResult<IEnumerable<EventData>> GetEvents()
        {
            var events = eventRepo.GetAll();
            return events.ToList();
        }

        //GET /api/events/{id}.{format}
        [HttpGet("{id}.{format?}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public ActionResult<EventData> GetById([FromRoute]int id)
        {
            var item = eventRepo.Get(id);
            //if (item == null)
            //    return NotFound(); //404

            return item; //200
        }

        //POST /api/events        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EventData>> AddAsync([FromBody]EventData ev)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await eventRepo.AddAsync(ev);
            //return Created($"/api/events/{result.Id}", result); // Adds a location header in the response
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);

        }
    }
}