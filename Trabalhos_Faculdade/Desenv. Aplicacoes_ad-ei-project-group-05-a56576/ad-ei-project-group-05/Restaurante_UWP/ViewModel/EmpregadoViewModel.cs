using Restaurante.Domain.Models;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Restaurante.Infrastructure;

namespace Restaurante_UWP.ViewModel
{
    public class EmpregadoViewModel : BindableBase
    {
        // Coleção Observável para exibir e manipular empregados
        public ObservableCollection<Empregado> Empregados { get; private set; }

        // Nome do empregado selecionado ou em edição
        private string _empregadoNome;
        public string EmpregadoNome
        {
            get { return _empregadoNome; }
            set
            {
                Set(ref _empregadoNome, value);
                OnPropertyChanged(nameof(Valid));
                OnPropertyChanged(nameof(Invalid));
            }
        }

        // Empregado atualmente selecionado ou em edição
        private Empregado _empregado;
        public Empregado Empregado
        {
            get { return _empregado; }
            set
            {
                _empregado = value;
                EmpregadoNome = _empregado?.Nome;
                OnPropertyChanged();
            }
        }

        // Validações
        public bool Valid
        {
            get
            {
                return !string.IsNullOrEmpty(EmpregadoNome);
            }
        }

        public bool Invalid
        {
            get { return !Valid; }
        }

        // Construtor
        public EmpregadoViewModel()
        {
            Empregado = new Empregado();
            Empregados = new ObservableCollection<Empregado>();
        }

        // Carregar todos os empregados
        public async void LoadAllAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var list = await uow.EmpregadoRepository.FindAllAsync();
                Empregados.Clear();
                foreach (var emp in list)
                {
                    Empregados.Add(emp);
                }
            }
        }

        // Atualizar ou criar um empregado
        public async Task<Empregado> UpsertAsync()
        {
            Empregado res = null;
            using (var uow = new UnityOfWork())
            {
                Empregado.Nome = EmpregadoNome;
                res = await uow.EmpregadoRepository.UpsertAsync(Empregado);
                await uow.SaveAsync();
            }

            if (res != null && !Empregados.Contains(res))
            {
                Empregados.Add(res);
            }
            return res;
        }

        // Eliminar um empregado
        public async void DeleteAsync(Empregado empregado)
        {
            using (var uow = new UnityOfWork())
            {
                uow.EmpregadoRepository.Delete(empregado);
                Empregados.Remove(empregado);
                await uow.SaveAsync();
            }
        }
    }
}
