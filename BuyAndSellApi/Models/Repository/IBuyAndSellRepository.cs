using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public interface IBuyAndSellRepository<T> where T : BaseEntity
    {
        T Get(object id);

        //T Get(object name);
        IQueryable<T> GetAll();
        void Insert(T entity);
        void InsertAll(ICollection<T> range);
        Task InsertAllAsync(ICollection<T> range);
        Task InsertAsync(T entity);
        void Update(T entity);
        Task UpdateAsync(T entity);
        void Delete(T entity);
        Task DeleteAsync(T entity);
        bool SaveChanges();
        Task SaveChangesAsync();
        
    }
}