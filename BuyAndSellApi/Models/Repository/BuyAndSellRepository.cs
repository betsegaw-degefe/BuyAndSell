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
    }
}