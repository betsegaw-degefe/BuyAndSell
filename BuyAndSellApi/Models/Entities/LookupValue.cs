using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("lookup_value", Schema = "common")]
    public partial class LookupValue : BaseEntity
    {
        public LookupValue()
        {
            Product = new HashSet<Product>();
        }

        public int LcId { get; set; }

        [Required] [StringLength(50)] public string Name { get; set; }

        [Required] [StringLength(50)] public string Value { get; set; }


        [ForeignKey("LcId")] public virtual LookupCategory Lc { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}