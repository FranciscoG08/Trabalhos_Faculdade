using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    internal class MesaRepository :Repository<Mesa>, IMesaRepository
    {
        public MesaRepository(RestauranteDbContext dbcontext) : base(dbcontext)
        {
        }
        //Util para nao repetir mesas ao correr o programa pela 2 vez
        public async Task<List<Mesa>> GetAllAsync()
        {
            return await _dbcontext.Mesas.ToListAsync();
        }

        public async Task<Mesa> FindByNumeroAsync(int n)
        {
            return await _dbcontext.Mesas
                .SingleOrDefaultAsync(m => m.Numero == n);
        }

        public override async Task<Mesa> FindOrCreateAsync(Mesa entity)
        {
            // Verifica se já existe uma categoria com o mesmo nome no banco de dados
            var f = await FindByNumeroAsync(entity.Numero);

            if (f == null) // Se nenhuma categoria for encontrada
            {
                Create(entity); // Cria a nova categoria
                f = entity; // Define 'f' como a entidade criada
            }
            // Retorna a categoria encontrada ou recém-criada
            return f;
        }

        public override async Task<Mesa> UpsertAsync(Mesa entity)
        {
            Mesa m = null;
            Mesa existing = await FindByNumeroAsync(entity.Numero);

            if (existing == null)
            {
                if (entity.Id == 0)
                    Create(entity);
                else
                    Update(entity);
                m = entity;
            }
            else if (existing.Id == entity.Id)
            {
                Update(entity);
                m = entity;
            }
            else
            {
                _dbcontext.Entry(entity).State = EntityState.Detached;
            }
            return m;
        }
    }
}
