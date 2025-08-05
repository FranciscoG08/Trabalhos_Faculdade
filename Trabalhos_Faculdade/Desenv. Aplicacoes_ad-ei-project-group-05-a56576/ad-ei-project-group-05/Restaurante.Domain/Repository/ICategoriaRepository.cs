using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;
//Metodos(apenas Interfaces) para interagir com as categorias
namespace Restaurante.Domain.Repository
{
    public interface ICategoriaRepository : IRepository<Categoria>
    {
        Task<Categoria> FindByNameAsync(string nome);
        Task<List<Categoria>> FindAllByNameStartedWithAsync(string nome);
        Task<List<Categoria>> FindAllWithDependenceisAsync();
    }
}