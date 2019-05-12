using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Models.Repository
{
    public interface IBuyAndSellRepository<T> where T : BaseEntity
    {
        T Get(object id);
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


        //IEnumerable<User> GetUser(string userName, string password);
        //User GetUser(int id);

        //bool SaveAll();
        //void AddEntity(object model);

        //Address GetAddressById(int id);
    }
}