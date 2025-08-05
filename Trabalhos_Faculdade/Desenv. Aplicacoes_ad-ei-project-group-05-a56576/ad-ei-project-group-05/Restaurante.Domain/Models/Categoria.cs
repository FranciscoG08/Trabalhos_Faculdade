using Restaurante.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Restaurante.Domain.Models
{
    public class Categoria : Entity
    {
        public string Nome { get; set; }

        public List<Produto> Produtos { get; set; }//A categoria tem uma Lista de Produtos

        public Categoria()
        {
            Produtos = new List<Produto>();
        }

        public override string ToString()
        {
            return Nome;
        }
    }
}