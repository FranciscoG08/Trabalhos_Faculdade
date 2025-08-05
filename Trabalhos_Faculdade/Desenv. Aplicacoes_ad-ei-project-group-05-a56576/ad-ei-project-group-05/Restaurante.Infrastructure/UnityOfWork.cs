using Restaurante.Domain;
using Restaurante.Domain.Repository;
using Restaurante.Infrastructure.Repository;
using System.Threading.Tasks;


namespace Restaurante.Infrastructure
{
    public class UnityOfWork : IUnityOfWork
    {
        private readonly RestauranteDbContext _dbcontext;  // Torne isso readonly e inicialize no construtor

        public UnityOfWork()
        {
            _dbcontext = new RestauranteDbContext();  // Inicialize o contexto aqui
            _dbcontext.Database.EnsureCreated(); //Cria a base de dados
        }

        public ICategoriaRepository CategoriaRepository 
            => new CategoriaRepository(_dbcontext);
        
        public IProdutoRepository ProdutoRepository 
            => new ProdutoRepository(_dbcontext);
        
        public IClienteRepository ClienteRepository
            => new ClienteRepository(_dbcontext);

        public IPedidoRepository PedidoRepository
            => new PedidoRepository(_dbcontext);

        //Pode ficar assim
        public IMesaRepository MesaRepository
            => new MesaRepository(_dbcontext);

        //Pode ficar assim
        public IEmpregadoRepository EmpregadoRepository 
            => new EmpregadoRepository(_dbcontext);

        public IPedidoDetailRepository PedidoDetailRepository
        => new PedidoDetailRepository(_dbcontext);

        public void Dispose()
        {
            _dbcontext.Dispose(); 
        }

        public async Task SaveAsync()
        {
            await _dbcontext.SaveChangesAsync(); // Salva as mudanças no banco de dados
        }

        public object GetDbPath()
        {
            return _dbcontext.DbPath; 
        }
    }
}
