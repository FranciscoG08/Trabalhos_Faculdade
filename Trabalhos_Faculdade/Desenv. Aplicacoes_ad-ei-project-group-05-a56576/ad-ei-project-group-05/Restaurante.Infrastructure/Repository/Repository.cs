using Restaurante.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    public abstract class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly RestauranteDbContext _dbcontext;

        public Repository(RestauranteDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void Create(T entity)
        {
            _dbcontext.Add(entity);
        }

        public void Update(T entity)
        {
            _dbcontext.Update(entity);
        }

        public void Delete(T entity)
        {
            _dbcontext.Remove(entity);
        }

        public virtual Task<List<T>> FindAllAsync()
        {
            return _dbcontext.Set<T>().ToListAsync();
        }

        public Task<T> FindByIdAsync(int id)
        {
            return _dbcontext.Set<T>().SingleAsync(x => x.Id == id);
        }

        public abstract Task<T> FindOrCreateAsync(T entity);

        public abstract Task<T> UpsertAsync(T entity);
    }
}