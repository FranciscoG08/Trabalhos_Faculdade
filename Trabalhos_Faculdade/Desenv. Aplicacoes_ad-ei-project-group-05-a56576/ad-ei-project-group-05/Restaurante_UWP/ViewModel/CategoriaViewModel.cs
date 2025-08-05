using Restaurante.Domain.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Restaurante.Infrastructure;

namespace Restaurante_UWP.ViewModel
{
    public class CategoriaViewModel : BindableBase
    {
        public ObservableCollection<Categoria> Categorias { get; set; }

        private Categoria _categoria;

        public Categoria Categoria
        {
            get { return _categoria; }
            set
            {
                _categoria = value;
                CategoriaNome = _categoria?.Nome;
            }
        }

        private string _categoriaNome;

        public string CategoriaNome
        {
            get { return _categoriaNome; }
            set
            {
                Set(ref _categoriaNome, value);
                OnPropertyChanged(nameof(Valid));
                OnPropertyChanged(nameof(Invalid));
            }
        }

        public bool Valid
        {
            get
            {
                return !string.IsNullOrEmpty(CategoriaNome);
            }
        }

        public bool Invalid
        {
            get { return !Valid; }
        }

        public CategoriaViewModel()
        {
            Categoria = new Categoria();
            Categorias = new ObservableCollection<Categoria>();
        }

        public async void LoadAllAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var dbPath = uow.GetDbPath();
                var list = await uow.CategoriaRepository.FindAllAsync();
                Categorias.Clear();
                foreach (var category in list)
                {
                    Categorias.Add(category);
                }
            }
        }

        internal async Task<Categoria> UpsertAsync()
        {
            Categoria res = null;

            using (var uow = new UnityOfWork())
            {
                Categoria.Nome = CategoriaNome;
                res = await uow.CategoriaRepository.UpsertAsync(Categoria);
                await uow.SaveAsync();
            }
            return res;
        }

        internal async void DeleteAsync(Categoria c)
        {
            using (UnityOfWork uow = new UnityOfWork())
            {
                uow.CategoriaRepository.Delete(c);
                Categorias.Remove(c);
                await uow.SaveAsync();
            }
        }
    }
}