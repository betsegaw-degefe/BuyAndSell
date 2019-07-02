using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("address", Schema = "common")]
    public partial class Address : BaseEntity
    {
        public Address()
        {
        }


        [Required] [StringLength(50)] public string Name { get; set; }

        public int? ParentId { get; set; }

        public int Level { get; set; }

        public short LastUpdatedBy { get; set; }

        [ForeignKey("ParentId")] public virtual Address Parent { get; set; }
    }
}