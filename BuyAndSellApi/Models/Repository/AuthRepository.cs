using System;
using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BuyAndSellApi.Models.Repository {
    public class AuthRepository : IAuthRepository {
        private readonly BuyAndSellContext _context;

        public AuthRepository (BuyAndSellContext context) {
            _context = context;
        }

        public async Task<User> Login (string username, string password) {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
                return null;

            if (!VerifyPasswordHash (password, user.Password, user.Salt))
                return null;

            return user; // auth successful
        }

        private bool VerifyPasswordHash (string password, byte[] passwordHash, byte[] salt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 (salt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        private void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] salt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                salt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }

        public async Task<User> Register (User user, string password) {
            byte[] passwordHash, salt;
            CreatePasswordHash (password, out passwordHash, out salt);
            user.Password = passwordHash;
            user.Salt = salt;

            await _context.User.AddAsync (user);
            await _context.SaveChangesAsync ();

            return user;
        }

        public async Task<bool> UserExists (string Username)
        {
            return await _context.User.AnyAsync (x => x.UserName == Username);
        }

        public async Task<UserRole> UserRoles(int userId)
        {
            var userRole = await _context.UserRole.FirstOrDefaultAsync(x => x.UserId == userId);
            return userRole;
        }

        public async Task<Role> roles(int id)
        {
            var role = await _context.Role.FirstOrDefaultAsync(x => x.Id == id);
            return role;
        }

        public async Task<User> Update(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var updatedUser =  _context.User.Update(user);
            await _context.SaveChangesAsync ();
            return user;
        }
    }
}