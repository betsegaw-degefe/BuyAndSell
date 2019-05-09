using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("lookup_category", Schema = "common")]
    public partial class LookupCategory : BaseEntity
    {
        public LookupCategory()
        {
            InverseParent = new HashSet<LookupCategory>();
            LookupValue = new HashSet<LookupValue>();
        }


        [Required] [StringLength(50)] public string Name { get; set; }

        public int? ParentId { get; set; }
        public int Level { get; set; }


        [ForeignKey("ParentId")] public virtual LookupCategory Parent { get; set; }
        public virtual ICollection<LookupCategory> InverseParent { get; set; }
        public virtual ICollection<LookupValue> LookupValue { get; set; }
    }
}