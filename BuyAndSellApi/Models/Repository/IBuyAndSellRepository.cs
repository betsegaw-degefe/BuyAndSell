using System.Collections.Generic;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public interface IBuyAndSellRepository
    {
        IEnumerable<User> GetUser(string userName, string password);
        User GetUser(int id);
        
        bool SaveAll();
        void AddEntity(object model);
        
        Address GetAddressById(int id);
    }
}