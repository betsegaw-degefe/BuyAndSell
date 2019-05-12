using System.Collections;
using System.Collections.Generic;
using System.Linq;
using BuyAndSellApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BuyAndSellApi.Models.Repository
{
    public class BuyAndSellRepository : IBuyAndSellRepository
    {
        private readonly BuyAndSellContext _context;

        public BuyAndSellRepository(BuyAndSellContext context)
        {
            _context = context;
        }

        // return user entity, if the username and password sent matched with db username and password.
        public IEnumerable<User> GetUser(string userName, string password)
        {
            return _context.User
                .Where(p => p.UserName == userName && p.Password == password)
                .ToList();
        }

        public User GetUser(int id)
        {
            return _context.User
                .FirstOrDefault(u => u.Id == id);
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public void AddEntity(object model)
        {
            _context.Add(model);
        }

        // Return address entity, if the id sent matched with AddressId  
        public Address GetAddressById(int id)
        {
            return _context.Address
                .FirstOrDefault(a => a.Id == id);
        }
    }
}