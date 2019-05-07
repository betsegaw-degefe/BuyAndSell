using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class Address
    {
        public Address()
        {
            InverseParent = new HashSet<Address>();
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public int Level { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public short LastUpdatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual Address Parent { get; set; }
        public virtual ICollection<Address> InverseParent { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
