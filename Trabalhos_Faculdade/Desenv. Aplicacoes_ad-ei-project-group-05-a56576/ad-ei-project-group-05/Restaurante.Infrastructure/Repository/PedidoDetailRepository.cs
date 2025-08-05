using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Restaurante.Infrastructure.Repository
{
    internal class PedidoDetailRepository : Repository<PedidoDetail>, IPedidoDetailRepository
    {
        public PedidoDetailRepository(RestauranteDbContext dbcontext) : base(dbcontext)
        {
        }

        // Obter detalhes de um pedido específico
        public Task<List<PedidoDetail>> GetDetailsByPedidoIdAsync(int pedidoId)
        {
            return _dbcontext.PedidoDetalhes
                .Where(pd => pd.PedidoId == pedidoId)
                .Include(pd => pd.Produto)
                .ToListAsync();
        }

        //NAO NECESSARIO
        public override Task<PedidoDetail> FindOrCreateAsync(PedidoDetail entity)
        {
            throw new NotImplementedException(); // Implementar se necessário
        }
        //NAO NECESSARIO
        public override Task<PedidoDetail> UpsertAsync(PedidoDetail entity)
        {
            throw new NotImplementedException(); // Implementar se necessário
        }

        Task<List<PedidoDetail>> IPedidoDetailRepository.GetDetailsByPedidoIdAsync(int pedidoId)
        {
            return GetDetailsByPedidoIdAsync(pedidoId);
        }
    }
}
