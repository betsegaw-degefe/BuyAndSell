using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models
{
    public partial class LookupValue
    {
        public int Id { get; set; }
        public int LcId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual LookupCategory Lc { get; set; }
    }
}
