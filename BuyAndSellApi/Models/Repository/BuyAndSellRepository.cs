using System.Collections;
using System.Collections.Generic;
using System.Linq;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public class BuyAndSellRepository: IBuyAndSellRepository
    {
        private readonly BuyAndSellContext _context;

        public BuyAndSellRepository(BuyAndSellContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetUser(string userName, string password)
        {
            return _context.User
                .Where(p => p.UserName == userName && p.Password == password)
                .ToList();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}