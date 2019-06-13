using EventAPI.Infrastructure;
using EventAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventAPI.Repositories
{
    public class EventRepository<T> : IEventRepository<T> where T : BaseEntity
    {
        private EventDbContext dbContext;
        private DbSet<T> entities;

        public EventRepository(EventDbContext db)
        {
            dbContext = db;
            entities = dbContext.Set<T>();
        }

        public async Task<T> AddAsync(T item)
        {
            await entities.AddAsync(item);
            await dbContext.SaveChangesAsync();
            return item;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var item = await entities.FindAsync(id);
            if (item == null)
                throw new Exception("Item not found for deletion");
            entities.Remove(item);
            await dbContext.SaveChangesAsync();
            return item;
        }

        public T Get(int id)
        {
            var item = entities.Find(id);
            return item;
        }

        public IEnumerable<T> GetAll()
        {
            return entities.ToList();
        }

        public async Task<T> UpdateAsync(int id, T item)
        {
            entities.Update(item).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return item;
        }
    }
}
