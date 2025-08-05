using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Domain.Repository
{
    public interface IEmpregadoRepository : IRepository<Empregado>
    {
        Task<List<Empregado>> GetAllAsync();
        Task<Empregado> FindByNomeAsync(string n);
        Task<Empregado> FindByUsernameAndPasswordAsync(string nome, string password);
    }
}