using Restaurante.Domain.Repository;
using System;
using System.Threading.Tasks;

namespace Restaurante.Domain
{
    public interface IUnityOfWork : IDisposable
    {
        ICategoriaRepository CategoriaRepository { get; }
        IProdutoRepository ProdutoRepository { get; }
        IClienteRepository ClienteRepository { get; }
        IMesaRepository MesaRepository { get; }
        IPedidoRepository PedidoRepository { get; }
        IPedidoDetailRepository PedidoDetailRepository { get; }
        IEmpregadoRepository EmpregadoRepository { get; }
        Task SaveAsync();
    }
}
