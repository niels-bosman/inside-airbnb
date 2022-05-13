#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
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

        public ListingController(IListingRepository repository) => _repository = repository;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListingDto>>> GetListing()
        {
            return Ok(await _repository.GetAll());
        }
    }
}
