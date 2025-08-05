using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    internal class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(RestauranteDbContext dbcontext) : base(dbcontext)
        {
        }
        // Implementa o método conforme a assinatura exata da interface 
        public Task<Produto> FindByNameAsync(string Name)
        {
            return _dbcontext.Produtos.
                SingleOrDefaultAsync(p => p.Nome == Name);
        }

        public override async Task<Produto> FindOrCreateAsync(Produto entity)
        {
            var existingProduct = await FindByNameAsync(entity.Nome);
            if (existingProduct == null)
            {
                Create(entity);
                existingProduct = entity;
            }
            return existingProduct;
        }

        //Atualizar nome do produto
        public override async Task<Produto> UpsertAsync(Produto entity)
        {
            Produto p = null;
            Produto existing = await FindByNameAsync(entity.Nome);

            if (existing == null)
            {
                if (entity.Id == 0)
                    Create(entity);
                else
                    Update(entity);
                p = entity;
            }
            else if (existing.Id == entity.Id)
            {
                if (existing.Nome != entity.Nome || existing.CategoriaId != entity.CategoriaId || existing.Thumb != entity.Thumb || existing.Preco != entity.Preco)
                {
                    _dbcontext.Entry(existing).State = EntityState.Detached;
                    Update(entity);
                }
                p = entity;
            }
            else
            {
                _dbcontext.Entry(entity).State = EntityState.Detached;
            }
            return p;
        }

        public override Task<List<Produto>> FindAllAsync()
        {
            return _dbcontext.Produtos
                .Include(x => x.Categoria)
                .ToListAsync();
        }
    }
}