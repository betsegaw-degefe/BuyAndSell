using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
    }
}