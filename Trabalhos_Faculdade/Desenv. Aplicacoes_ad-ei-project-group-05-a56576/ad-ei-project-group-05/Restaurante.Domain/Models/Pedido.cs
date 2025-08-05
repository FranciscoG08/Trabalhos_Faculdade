using Restaurante.Domain.Models;
using Restaurante.Domain.SeedWork;
using System;
using System.Collections.Generic;

namespace Restaurante.Domain.Models
{
    public class Pedido : Entity
    {
        public DateTime Data { get; set; } = DateTime.Now;

        public Mesa Mesas { get; set; }
        public Empregado Empregados { get; set; }
        public Cliente Clientes { get; set; }

      
        public int MesaId { get; set; }
        public int EmpregadoId { get; set; }
        public int ClienteId { get; set; }
        // Lista de detalhes do pedido
        public List<PedidoDetail> PedidoDetalhes { get; set; }

        public Pedido()
        {
            PedidoDetalhes = new List<PedidoDetail>();
        }
    }
}
