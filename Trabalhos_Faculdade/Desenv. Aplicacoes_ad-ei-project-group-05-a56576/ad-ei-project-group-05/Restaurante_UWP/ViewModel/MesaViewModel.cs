using Restaurante.Domain.Models;
using Restaurante.Infrastructure;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.UI.Xaml.Controls.Primitives;

namespace Restaurante_UWP.ViewModel
{
    public  class MesaViewModel : BindableBase
    {
        public ObservableCollection<Mesa> Mesas { get; set; }

        private Mesa _mesa;
        public Mesa Mesa
        {
            get { return _mesa; }
            set
            {
                _mesa = value;
                MesaNumero = _mesa.Numero;
                MesaCapacidade =  _mesa.Capacidade;
            }
        }

        private int _mesanumero;

        public int MesaNumero
        {
            get { return _mesanumero; }
            set
            {
                Set(ref _mesanumero, value);
                OnPropertyChanged(nameof(Valid));
                OnPropertyChanged(nameof(Invalid));
            }
        }

        private int _mesacapacidade;

        public int MesaCapacidade
        {
            get { return _mesacapacidade; }
            set
            {
                Set(ref _mesacapacidade, value);
                OnPropertyChanged(nameof(Valid));
                OnPropertyChanged(nameof(Invalid));
            }
        }

        public bool Valid
        {
            get { return true; }
        }

        public bool Invalid
        {
            get { return !Valid; }
        }

        public MesaViewModel()
        {
            Mesa = new Mesa();
            Mesas = new ObservableCollection<Mesa>();
        }

        public async void LoadAllAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var dbPath = uow.GetDbPath();
                var list = await uow.MesaRepository.FindAllAsync();
                Mesas.Clear();
                foreach (var mesa in list)
                {
                    Mesas.Add(mesa);
                }
            }
        }

        internal async Task<Mesa> UpsertAsync()
        {
            Mesa res = null;

            using (var uow = new UnityOfWork())
            {
                Mesa.Numero = MesaNumero;
                Mesa.Capacidade = MesaCapacidade;
                res = await uow.MesaRepository.UpsertAsync(Mesa);
                await uow.SaveAsync();
            }
            return res;
        }

        internal async void DeleteAsync(Mesa c)
        {
            using (UnityOfWork uow = new UnityOfWork())
            {
                uow.MesaRepository.Delete(c);
                Mesas.Remove(c);
                await uow.SaveAsync();
            }
        }
    }
}
