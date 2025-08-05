using Restaurante.Domain.SeedWork;
using System.Collections.Generic;

namespace Restaurante.Domain.Models
{
    public class PedidoDetail : Entity
    {
        public int Quantidade { get; set; }
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }

        //Relacionamentos 1-N
        public Pedido Pedido { get; set; }
        public Produto Produto { get; set; }
        //Verificar
        public List<Pedido> Pedidos { get; set; }
    }
}
