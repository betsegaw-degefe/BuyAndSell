using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities {
    [Table ("category", Schema = "commodity")]
    public partial class Category : BaseEntity {
        public Category () {
            InverseParent = new HashSet<Category> ();
            ProductAttribute = new HashSet<ProductAttribute> ();
            Product = new HashSet<Product> ();
        }

        [Required][StringLength (75)] public string Name { get; set; }

        public int? ParentId { get; set; }

        public int Level { get; set; }

        public short LastUpdatedBy { get; set; }

        [ForeignKey ("ParentId")] public virtual Category Parent { get; set; }
        public virtual ICollection<Category> InverseParent { get; set; }
        public virtual ICollection<ProductAttribute> ProductAttribute { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}