using Restaurante.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace Restaurante.Domain.Models
{
    public class Produto : Entity
    {
        public string Nome { get; set; }
        public float Preco { get; set; }
        public byte[] Thumb { get; set; } = Array.Empty<byte>(); // Imagem
        public int CategoriaId { get; set; }

        // 
        public Categoria Categoria { get; set; }

        public List<PedidoDetail> PedidoDetalhes { get; set; }
        public Produto()
        {
            PedidoDetalhes = new List<PedidoDetail>();
        }

        public override string ToString()
        {
            return Nome;
        }
    }
}
