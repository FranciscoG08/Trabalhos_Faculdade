using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace Restaurante.Infrastructure.Repository
{
    internal class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(RestauranteDbContext dbcontext) : base(dbcontext)
        {
        }

        // Método para encontrar um cliente pelo seu NIF pode retornar 
        public Task<Cliente> FindByNifAsync(string nif)
        {
            return _dbcontext.Clientes
                .SingleOrDefaultAsync(c => c.NIF == nif); // Procura um cliente pelo NIF
        }

        //Procura pelo Nome para ver o Total da Conta
        public Task<Cliente> FindByNameAsync(string nome)
        {
            return _dbcontext.Clientes
                .SingleOrDefaultAsync(c => c.Nome == nome); // Procura um cliente pelo nome
        }

        // Método para criar ou retornar um cliente existente baseado no NIF
        public override async Task<Cliente> FindOrCreateAsync(Cliente entity)
        {
            // Verifica se o cliente já existe no banco de dados pelo NIF
            var existingCliente = await FindByNifAsync(entity.NIF);

            if (existingCliente == null)
            {
                // Se o cliente não existir, cria um novo cliente
                Create(entity);
                existingCliente = entity;
            }

            // Retorna o cliente (novo ou existente)
            return existingCliente;
        }

        // Método Upsert (atualizar )
        public override Task<Cliente> UpsertAsync(Cliente entity)
        {
            throw new NotImplementedException(); // Implementar se for necessário
        }
    }
}
