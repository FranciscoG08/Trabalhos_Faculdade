using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Domain.Repository
{
    public interface IPedidoDetailRepository : IRepository<PedidoDetail>
    {
        Task<List<PedidoDetail>> GetDetailsByPedidoIdAsync(int pedidoId);
    }
}
