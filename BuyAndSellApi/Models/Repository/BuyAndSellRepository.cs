using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BuyAndSellApi.Models.Repository
{
    public class BuyAndSellRepository<T> : IBuyAndSellRepository<T> where T : BaseEntity
    {
        private readonly ILogger<T> _logger;
        private readonly BuyAndSellContext _context;
        private readonly DbSet<T> _entities;

        public BuyAndSellRepository(BuyAndSellContext context, ILogger<T> logger)
        {
            _context = context;
            _logger = logger;
            _entities = context.Set<T>();
        }

        // Search by object id.
        public T Get(object id)
        {
            return _entities.Find(id);
        }

        // Return list of object.
        public IQueryable<T> GetAll()
        {
            return _entities;
        }

        // Add the object in to the entity.
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _entities.Add(entity);
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "Insert");
        }

        public void InsertAll(ICollection<T> range)
        {
            if (range == null || range.Count < 1)
            {
                throw new ArgumentNullException(nameof(range));
            }

            _entities.AddRange(range);
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "InsertAll");
        }


        public async Task InsertAllAsync(ICollection<T> range)
        {
            if (range == null || range.Count < 1)
            {
                throw new ArgumentNullException(nameof(range));
            }

            _entities.AddRange(range);
            await SaveChangesAsync();
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "InsertAllAsync");
        }

        public async Task InsertAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _entities.Add(entity);
            await SaveChangesAsync();
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "InsertAsync");
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _context.Entry(entity).State = EntityState.Modified;
            //SaveChanges();
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "Update");
        }

        public async Task UpdateAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _context.Entry(entity).State = EntityState.Modified;
            await SaveChangesAsync();
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "UpdateAsync");
        }

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _entities.Remove(entity);
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "Delete");
            //SaveChanges();
        }

        public async Task DeleteAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            _entities.Remove(entity);
            _logger.LogDebug(999, "Generic Repository {Action} Entity", "DeleteAsync");
            await SaveChangesAsync();
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() > 0;
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


        // return user entity, if the username and password sent matched with db username and password.
        /*public IEnumerable<User> GetUser(string userName, string password)
        {
            return _context.User
                .Where(p => p.UserName == userName && p.Password == password)
                .ToList();
        }*/

        /*
        public User GetUser(int id)
        {
            return _context.User
                .FirstOrDefault(u => u.Id == id);
        }
*/

        /*public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }*/

        /*public void AddEntity(object model)
        {
            _context.Add(model);
        }*/

        // Return address entity, if the id sent matched with AddressId  
        /*public Address GetAddressById(int id)
        {
            return _context.Address
                .FirstOrDefault(a => a.Id == id);
        }*/
    }
}