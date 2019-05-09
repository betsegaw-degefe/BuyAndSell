using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("role", Schema = "account")]
    public partial class Role : BaseEntity
    {
        public Role()
        {
            UserRole = new HashSet<UserRole>();
        }


        [Required]
        [StringLength(50)]
        public string Name { get; set; }


        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}