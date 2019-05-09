using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BuyAndSellApi.Models.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        [Required, DefaultValue("true")] public bool? Active { get; set; }
    }
}