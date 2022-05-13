using System;
using System.Collections.Generic;

namespace api.Models
{
    public partial class Review
    {
        public int ListingId { get; set; }
        public DateTime Date { get; set; }
    }
}
