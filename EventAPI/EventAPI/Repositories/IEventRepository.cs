using EventAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventAPI.Repositories
{
    public interface IEventRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();

        T Get(int id);

        Task<T> AddAsync(T item);

        Task<T> UpdateAsync(int id, T item);

        Task<T> DeleteAsync(int id);
    }
}
