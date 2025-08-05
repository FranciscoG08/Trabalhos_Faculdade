using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Domain.SeedWork
{
    public interface IRepository<T> where T : Entity
    {
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> FindOrCreateAsync(T entity);
        Task<T> FindByIdAsync(int id);
        Task<List<T>> FindAllAsync();
        //Pt 3 UWP
        Task<T> UpsertAsync(T entity);
    }
}