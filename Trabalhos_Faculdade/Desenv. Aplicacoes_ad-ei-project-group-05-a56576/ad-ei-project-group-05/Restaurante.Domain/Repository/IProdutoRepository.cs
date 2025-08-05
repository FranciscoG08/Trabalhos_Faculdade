using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Threading.Tasks;

namespace Restaurante.Domain.Repository
{
    public interface IProdutoRepository : IRepository<Produto>
    {
        Task<Produto> FindByNameAsync(string Name);
    }
}