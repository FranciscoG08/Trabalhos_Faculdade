using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Threading.Tasks;

namespace Restaurante.Domain.Repository
{
    public interface IClienteRepository : IRepository<Cliente>
    {
        // Método para encontrar um cliente pelo NIF
        Task<Cliente> FindByNifAsync(string nif);

        //Procura pelo Nome para ver o Total da Conta
        Task<Cliente> FindByNameAsync(string nif);

        // Método para criar ou retornar um cliente existente baseado no NIF
        Task<Cliente> FindOrCreateAsync(Cliente entity);

        //Nao interessa.
        // Método para fazer o Upsert (atualizar ou inserir)
        Task<Cliente> UpsertAsync(Cliente entity);
    }
}
