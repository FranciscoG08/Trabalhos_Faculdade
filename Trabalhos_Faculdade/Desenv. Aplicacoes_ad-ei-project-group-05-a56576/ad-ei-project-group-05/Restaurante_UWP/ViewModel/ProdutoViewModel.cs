using Restaurante.Domain.Models;
using Restaurante.Infrastructure;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurante_UWP.ViewModel
{
    public class ProdutoViewModel : BindableBase
    {
        public ObservableCollection<Produto> Produtos { get; set; }

        private Produto _produto;
        public Produto Produto
        { 
            get { return _produto; }
            set
            {
                _produto = value;
                CategoriaNome = _produto?.Categoria?.Nome;
                ProdutoNome = _produto?.Nome;
                Thumb = _produto?.Thumb;
                Preco = (float)(_produto?.Preco);
            }
        }
        
        private string _produtoNome;
        public string ProdutoNome
        {
            get { return _produtoNome; }
            set
            {
                Set(ref _produtoNome, value);
                OnPropertyChanged(nameof(Valid));
                OnPropertyChanged(nameof(Invalid));
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

        private byte[] _thumb;
        public byte[] Thumb
        {
            get { return _thumb; }
            set
            {
                Set(ref _thumb, value);
            }
        }

        private float _preco;
        public float Preco
        {
            get { return _preco; }
            set
            {
                Set(ref _preco, value);
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

        private string _title;
        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        public ProdutoViewModel()
        {
            Produtos = new ObservableCollection<Produto>();
            Produto = new Produto();
            Title = "Produtos";
            //PedidoProdutos = new ObservableCollection<PedidoProduto>();
        }

        public async void LoadAllAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var dbPath = uow.GetDbPath();

                var list = await uow.ProdutoRepository.FindAllAsync();
                Produtos.Clear();
                foreach (var item in list)
                {
                    Produtos.Add(item);
                }
            }
        }

        internal async Task<ObservableCollection<Categoria>> LoadCategoriesByNameStartedWithAsync(string categoryName)
        {
            ObservableCollection<Categoria> res = null;
            using (var uow = new UnityOfWork())
            {
                var list = await uow.CategoriaRepository.FindAllByNameStartedWithAsync(categoryName);
                res = new ObservableCollection<Categoria>(list);
            }
            return res;
        }

        internal async Task<Produto> UpsertAsync()
        {
            using (var uow = new UnityOfWork())
            {
                //Get Category
                Categoria category = new Categoria() { Nome = CategoriaNome };
                Categoria categoryUpdated = await uow.CategoriaRepository.FindOrCreateAsync(category);
                
                await uow.SaveAsync();

                //Save Product
                Produto.CategoriaId = categoryUpdated.Id;
                Produto.Categoria = null; //Trick to prevent double insert;
                Produto.Nome = ProdutoNome;
                Produto.Thumb = Thumb;
                Produto.Preco = Preco;
                Produto productUpdated = await uow.ProdutoRepository.UpsertAsync(Produto);
                await uow.SaveAsync();

                return productUpdated;
            }
        }

        internal async void DeleteAsync()
        {
            using (var uow = new UnityOfWork())
            {
                uow.ProdutoRepository.Delete(Produto);
                Produtos.Remove(Produto);
                await uow.SaveAsync();
            }
        }
    }
}