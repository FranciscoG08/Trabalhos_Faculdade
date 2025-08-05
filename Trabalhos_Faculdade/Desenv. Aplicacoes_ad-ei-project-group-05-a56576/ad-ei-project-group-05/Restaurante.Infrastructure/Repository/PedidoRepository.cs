using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    public class PedidoRepository : Repository<Pedido>, IPedidoRepository
    {
        public PedidoRepository(RestauranteDbContext dbcontext) : base(dbcontext)
        {
        }

        //Nao vou usar
        public override Task<Pedido> FindOrCreateAsync(Pedido entity)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Pedido>> GetAllAsync()
        {
            return await _dbcontext.Pedidos
                .Include(p => p.Clientes)
                .Include(p => p.Empregados)
                .Include(p => p.Mesas)
                .Include(p => p.PedidoDetalhes)
                .ThenInclude(pd => pd.Produto)
                .ToListAsync();
        }

        public async Task<List<Pedido>> GetByClienteIdAsync(int clienteId)
        {
            return await _dbcontext.Pedidos
                .Where(p => p.Clientes.Id == clienteId) 
                .Include(p => p.Clientes)
                .Include(p => p.Empregados)
                .Include(p => p.Mesas)
                .Include(p => p.PedidoDetalhes)
                .ThenInclude(pd => pd.Produto)
                .ToListAsync();
        }


        //Util para nao criar pedido Repetidos; Usado ao criar pedido; Nao aplicado
        public Task<Pedido> FindPedidoAsync(int clienteId, int mesaId, int empregadoId, DateTime data)
        {
            return _dbcontext.Pedidos.SingleOrDefaultAsync(p =>
                    p.ClienteId == clienteId &&
                    p.MesaId == mesaId &&
                    p.EmpregadoId == empregadoId &&
                    p.Data.Date == data.Date); // Comparar apenas a data
        }
        
        //Receber todos os pedidos do dia x, Util para saber o faturamento que o Restaurante teve

        public async Task<List<Pedido>> GetByDateAsync(DateTime dataSelecionada)
        {
            return await _dbcontext.Pedidos
                .Where(p => p.Data.Date == dataSelecionada.Date) // Compare only the date part
                .Include(p => p.Clientes)
                .Include(p => p.Empregados)
                .Include(p => p.Mesas)
                .Include(p => p.PedidoDetalhes)
                .ThenInclude(pd => pd.Produto)
                .ToListAsync();
        }


        public override async Task<Pedido> UpsertAsync(Pedido entity)
        {
            Pedido p = null;

            // Verifica se já existe um pedido para o mesmo cliente e mesa
            Pedido existing = await FindPedidoAsync(entity.ClienteId, entity.MesaId, entity.EmpregadoId, entity.Data.Date);

            if (existing == null)
            {
                // Se o pedido não existir, cria um novo
                if (entity.Id == 0)
                {
                    // Configura o pedido com a data atual, caso não tenha ID
                    entity.Data = DateTime.Now;
                    _dbcontext.Pedidos.Add(entity);  // Adiciona o pedido novo
                }
                else
                {
                    // Atualiza um pedido existente, se necessário
                    _dbcontext.Pedidos.Update(entity); // Atualiza o pedido
                }
                p = entity;
            }
            else if (existing.Id == entity.Id)
            {
                // Se o pedido já existe, faz a atualização
                _dbcontext.Pedidos.Update(entity);
                p = entity;
            }
            else
            {
                // Caso haja outro pedido para o mesmo cliente e mesa, desconecte a entidade para evitar conflito
                _dbcontext.Entry(entity).State = EntityState.Detached;
            }

            // Retorna o pedido atualizado ou criado
            return p;
        }


        Task<List<Pedido>> IPedidoRepository.GetAllAsync()
        {
            return GetAllAsync();
        }

        Task<List<Pedido>> IPedidoRepository.GetByClienteIdAsync(int id)
        {
            return GetByClienteIdAsync(id);
        }
    }
}