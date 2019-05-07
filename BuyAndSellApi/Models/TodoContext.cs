using Microsoft.EntityFrameworkCore;
//using TodoApi.Models;

namespace BuyAndSellApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}