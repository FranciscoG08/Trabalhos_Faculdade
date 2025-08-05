
using Restaurante.Domain.SeedWork;
using System.Collections.Generic;

namespace Restaurante.Domain.Models
{
    public class Cliente : Entity
    {
        public string Nome { get; set; }
        public string NIF { get; set; }
        
        // Relacionamento: Um cliente faz vários pedidos.
        //public Pedido Pedido { get; set; }
        public List<Pedido> Pedidos { get; set; }
        //O mesmo cliente pode aparecer em varios pedidos
        public Cliente()
        {
            Pedidos = new List<Pedido>();
        }
    }
}