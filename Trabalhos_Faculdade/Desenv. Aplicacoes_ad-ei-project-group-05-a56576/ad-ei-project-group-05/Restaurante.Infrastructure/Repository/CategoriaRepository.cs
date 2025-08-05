using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    internal class CategoriaRepository : Repository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(RestauranteDbContext dbContext) : base (dbContext)
        {
        }

        public Task<List<Categoria>>FindAllByNameStartedWithAsync(string text)
        {
            // Consulta no banco de dados para filtrar categorias que começam com o texto especificado
            return _dbcontext.Categorias
            .Where(x => x.Nome.StartsWith(text)) // Filtra categorias onde o nome começa com 'text'
                .OrderBy(x => x.Nome) // Ordena os resultados alfabeticamente pelo nome
                .ToListAsync(); // Converte o resultado em uma lista assíncrona
        }

        public Task<Categoria> FindByNameAsync(string nome)
        {
            return _dbcontext.Categorias
               .SingleOrDefaultAsync(x => x.Nome == nome);
        }


        public Task<List<Categoria>> FindAllWithDependenceisAsync()
        {
            // Consulta no banco de dados incluindo o relacionamento de produtos associados a cada categoria
            return _dbcontext.Categorias
                .Include(x => x.Produtos) // Realiza o *eager loading* para carregar os produtos relacionados
                .ToListAsync(); // Converte o resultado em uma lista assíncrona
        }

        public override async Task<Categoria> FindOrCreateAsync(Categoria entity)
        {
            // Verifica se já existe uma categoria com o mesmo nome no banco de dados
            var f = await FindByNameAsync(entity.Nome);

            if (f == null) // Se nenhuma categoria for encontrada
            {
                Create(entity); // Cria a nova categoria
                f = entity; // Define 'f' como a entidade criada
            }
            // Retorna a categoria encontrada ou recém-criada
            return f;
        }

        //UWP pt3
        //Para dar update
        public override async Task<Categoria> UpsertAsync(Categoria entity)
        {
            Categoria c = null;
            Categoria existing = await FindByNameAsync(entity.Nome);

            if (existing == null)
            {
                if (entity.Id == 0)
                    Create(entity);
                else
                    Update(entity);
                c = entity;
            }
            else if (existing.Id == entity.Id)
            {
                Update(entity);
                c = entity;
            }
            else
            {
                _dbcontext.Entry(entity).State = EntityState.Detached;
            }
            return c;
        }
    }
}