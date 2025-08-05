using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Restaurante.Domain.Repository
{
    public interface IMesaRepository : IRepository<Mesa>
    {
        Task<List<Mesa>> GetAllAsync();
        Task<Mesa> FindByNumeroAsync(int num);
    }
}
