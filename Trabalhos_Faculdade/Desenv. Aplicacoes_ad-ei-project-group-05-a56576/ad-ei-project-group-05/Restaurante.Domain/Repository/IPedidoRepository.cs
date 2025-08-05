using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Domain.Repository
{
    public interface IPedidoRepository : IRepository<Pedido>
    {
        // Método para obter todos os pedidos, incluindo as dependências como Cliente, Empregado, Mesa, e PedidoDetalhes
        Task<List<Pedido>> GetAllAsync();

        Task<List<Pedido>> GetByClienteIdAsync(int id);

        //Task<Pedido> FindPedidoAsync(int clienteId, int mesaId, int empregadoId, DateTime data);

        // Método para buscar um pedido pelo seu ID
        //Task<Pedido> FindByIdAsync(int id);
        Task<List<Pedido>> GetByDateAsync(DateTime dataSelecionada);
    }
}
