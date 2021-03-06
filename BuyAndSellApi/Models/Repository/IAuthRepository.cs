using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);

        Task<UserRole> UserRoles(int userId);

        Task<Role> roles(int id);

        Task<User> Update(User user);
    }
}