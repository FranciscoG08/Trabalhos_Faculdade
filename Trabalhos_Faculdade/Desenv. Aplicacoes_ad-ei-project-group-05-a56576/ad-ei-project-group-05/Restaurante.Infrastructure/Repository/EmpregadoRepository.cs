using Microsoft.EntityFrameworkCore;
using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using Restaurante.Infrastructure.Repository;
using Restaurante.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurante.Infrastructure.Repository
{
    internal class EmpregadoRepository : Repository<Empregado>, IEmpregadoRepository
    {
        public EmpregadoRepository(RestauranteDbContext dbContext) : base(dbContext)
        {
        }
        
        public async Task<List<Empregado>> GetAllAsync()
        {
            return await _dbcontext.Empregados.ToListAsync();
        }

        public async Task<Empregado> FindByNomeAsync(string n) //Esperemos nao ter 2 empregados com o mesmo nome xD
        {
            return await _dbcontext.Empregados
                .SingleOrDefaultAsync(m => m.Nome == n);
        }

        // Método para verificar o empregado e senha PT2
        public async Task<Empregado> VerificarSenhaAsync(string nome, string senha)
        {
            var empregado = await _dbcontext.Empregados
                .Where(e => e.Nome.Equals(nome, StringComparison.OrdinalIgnoreCase))
                .FirstOrDefaultAsync();

            if (empregado != null && Empregado.VerificarSenha(senha, empregado.Password))
            {
                return empregado; // Retorna o empregado se a senha for correta
            }

            return null; // Retorna null se o empregado não for encontrado ou a senha estiver errada
        }
       
        public override async Task<Empregado> FindOrCreateAsync(Empregado entity)
        {
            // Verifica se já existe uma categoria com o mesmo nome no banco de dados
            var f = await FindByUsernameAsync(entity.Nome);

            if (f == null) // Se nenhuma categoria for encontrada
            {
                Create(entity); // Cria a nova categoria
                f = entity; // Define 'f' como a entidade criada
            }

            // Retorna a categoria encontrada ou recém-criada
            return f;
        }

        //PT3
        public async Task<Empregado> FindByUsernameAsync(string username)
        {
            return await _dbcontext.Empregados.
                SingleOrDefaultAsync(x => x.Nome == username);
        }

        public override async Task<Empregado> UpsertAsync(Empregado entity)
        {
            Empregado c = null;
            Empregado existing = await FindByUsernameAsync(entity.Nome);

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
                _dbcontext.Entry(entity).State = EntityState.Detached;
                Update(entity);
                c = entity;
            }
            else
            {
                _dbcontext.Entry(entity).State = EntityState.Detached;
            }
            return c;
        }

        public async Task<Empregado> FindByUsernameAndPasswordAsync(string username, string password)
        {
            return await _dbcontext.Empregados.
                SingleOrDefaultAsync(x => x.Nome == username && x.Password == password);
        }
    }
}