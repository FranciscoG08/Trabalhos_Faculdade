using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using System;

namespace Restaurante.Infrastructure
{
    public class RestauranteDbContext : DbContext
    {
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Mesa> Mesas { get; set; }
        public DbSet<Empregado> Empregados { get; set; }
        public DbSet<PedidoDetail> PedidoDetalhes { get; set; }

        public string DbPath { get; }

        public RestauranteDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            //DbPath = System.IO.Path.Combine(path, "RestauranteDB.db"); // PARA a PARTE 2
            DbPath = System.IO.Path.Combine(path, "RestauranteDB_PT3.db"); // PARA a PARTE 3
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração para Categoria
            modelBuilder.Entity<Categoria>()
                .Property(c => c.Nome)
                .IsRequired()
                .HasMaxLength(50);

            // Configuração para Produto
            modelBuilder.Entity<Produto>()
                .Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Preco)
                .IsRequired();

            // Configuração para Cliente
            modelBuilder.Entity<Cliente>()
                .Property(c => c.Nome)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.NIF)
                .IsRequired()
                .HasMaxLength(15);

            // Configuração para Mesa
            modelBuilder.Entity<Mesa>()
                .Property(m => m.Numero)
                .IsRequired();

            modelBuilder.Entity<Mesa>()
                .Property(m => m.Capacidade)
                .IsRequired();

            // Configuração para Empregado
            modelBuilder.Entity<Empregado>()
                .Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(50);

            // Configuraçao para Pedido
            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.Clientes) // Pedido tem um Cliente
                .WithMany(c => c.Pedidos) // Cliente pode ter muitos Pedidos
                .HasForeignKey(p => p.ClienteId); // Chave estrangeira é ClienteId

            // Configuração da tabela intermediária PedidoDetail
            modelBuilder.Entity<PedidoDetail>()
                .HasOne(pd => pd.Pedido) // PedidoDetail tem um Pedido
                .WithMany(p => p.PedidoDetalhes) // Pedido pode ter vários PedidoDetail
                .HasForeignKey(pd => pd.PedidoId); // Chave estrangeira é PedidoId

            modelBuilder.Entity<PedidoDetail>()
                .Property(pd => pd.Quantidade)
                .IsRequired();

             //Parte 3
            //Adicionar Categoria
            modelBuilder.Entity<Categoria>().HasData(
               new Categoria { Id = 1, Nome = "Entrada" },
               new Categoria { Id = 2, Nome = "Bebida" },
               new Categoria { Id = 3, Nome = "Prato" },
               new Categoria { Id = 4, Nome = "Sobremesa" });

            //Adicionar Produtos
            modelBuilder.Entity<Produto>().HasData(
                // Categoria: Entrada
                new Produto { Id = 1, Nome = "Rissol", Preco = 2.2F, CategoriaId = 1 },
                new Produto { Id = 2, Nome = "Pao", Preco = 0.9F, CategoriaId = 1 },
                new Produto { Id = 3, Nome = "Sopa de Legumes", Preco = 4.0F, CategoriaId = 1 },
                // Categoria: Bebida
                new Produto { Id = 4, Nome = "Agua", Preco = 1.3F, CategoriaId = 2 },
                new Produto { Id = 5, Nome = "Sumol", Preco = 3.3F, CategoriaId = 2 },
                new Produto { Id = 6, Nome = "Refrigerante", Preco = 1.5F, CategoriaId = 2 },
                new Produto { Id = 7, Nome = "Arroz de Pato", Preco = 13.98F, CategoriaId = 3 },
                new Produto { Id = 8, Nome = "Marisco", Preco = 18.9F, CategoriaId = 3 },
                new Produto { Id = 9, Nome = "Camarões", Preco = 15.5F, CategoriaId = 3 },
                new Produto { Id = 10, Nome = "Bifana", Preco = 4.5F, CategoriaId = 3 },
                new Produto { Id = 11, Nome = "Batata Frita", Preco = 3.0F, CategoriaId = 3 },
                // Categoria: Sobremesa
                new Produto { Id = 12, Nome = "Bolo", Preco = 3.65F, CategoriaId = 4 },
                new Produto { Id = 13, Nome = "Fruta", Preco = 0.56F, CategoriaId = 4 },
                new Produto { Id = 14, Nome = "Laranja", Preco = 0.45F, CategoriaId = 4 });

            //Adicionar Empregado
            modelBuilder.Entity<Empregado>().HasData(
                new Empregado
                {
                    Id = 1,
                    Nome = "admin",
                    Password = "admin",
                    isAdmim = true
                },
                new Empregado { Id = 2, Nome = "ola", Password = "ola",isAdmim=false});

            //Adicionar mesa
            modelBuilder.Entity<Mesa>().HasData(
                new Mesa { Id = 1, Numero = 1, Capacidade = 4 },
                new Mesa { Id = 2, Numero = 2, Capacidade = 8 });

            //Adicionar Cliente
            modelBuilder.Entity<Cliente>().HasData(
                new Cliente { Id = 1, Nome = "José", NIF = "111123213"},
                new Cliente { Id = 2, Nome = "Antonio", NIF = "42342342"},
                new Cliente { Id = 3, Nome = "Ana", NIF = "42342342"},
                new Cliente { Id = 4, Nome = "Carolina", NIF = "989898898"});

            //Adicionar Pedido
            modelBuilder.Entity<Pedido>().HasData(
                new Pedido { Id = 1, Data = new DateTime(2025, 1, 1, 15, 30, 0), MesaId = 1, EmpregadoId = 2, ClienteId = 1 },
                new Pedido { Id = 2, Data = new DateTime(2025, 1, 2, 15, 30, 0), MesaId = 1, EmpregadoId = 2, ClienteId = 1 },
                new Pedido { Id = 3, Data = new DateTime(2025, 1, 3, 15, 30, 0), MesaId = 2, EmpregadoId = 1, ClienteId = 2 },
                new Pedido { Id = 4, Data = new DateTime(2025, 1, 4, 15, 45, 0), MesaId = 2, EmpregadoId = 1, ClienteId = 2 });


            //Adicionar PedidoDetail
            modelBuilder.Entity<PedidoDetail>().HasData(
                new PedidoDetail { Id = 1, PedidoId = 1, ProdutoId = 1, Quantidade = 2 },
                new PedidoDetail { Id = 2, PedidoId = 1, ProdutoId = 2, Quantidade = 2 },
                new PedidoDetail { Id = 3, PedidoId = 1, ProdutoId = 3, Quantidade = 2 },
                new PedidoDetail { Id = 4, PedidoId = 2, ProdutoId = 5, Quantidade = 2 });
        }
    }
}
