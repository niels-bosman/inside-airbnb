#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Repositories;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _repository;

        public ListingController(IListingRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListing()
        {
            return Ok(await _repository.GetAll());
        }
    }
}
