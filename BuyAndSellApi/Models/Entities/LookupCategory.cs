using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class LookupCategory
    {
        public LookupCategory()
        {
            InverseParent = new HashSet<LookupCategory>();
            LookupValue = new HashSet<LookupValue>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public int Level { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual LookupCategory Parent { get; set; }
        public virtual ICollection<LookupCategory> InverseParent { get; set; }
        public virtual ICollection<LookupValue> LookupValue { get; set; }
    }
}
