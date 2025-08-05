using Restaurante.Domain.SeedWork;

using System.Collections.Generic;
namespace Restaurante.Domain.Models
{
    public class Mesa : Entity
    {
        public int Numero { get; set; }
        public int Capacidade { get; set; }

        // Relacionamento: Uma mesa pode ter vários pedidos.
        //public Pedido Pedido { get; set; }

        public List<Pedido> Pedidos { get; set; }
        //A mesma mesa pode aparecer em varios pedidos
        public Mesa()
        {
            Pedidos = new List<Pedido>();
        }
    }
}