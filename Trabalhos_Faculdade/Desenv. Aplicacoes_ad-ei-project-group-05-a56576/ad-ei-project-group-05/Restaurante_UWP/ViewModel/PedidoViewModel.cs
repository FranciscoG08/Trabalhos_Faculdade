using Restaurante.Domain.Models;
using Restaurante.Domain.Repository;
using Restaurante.Infrastructure;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurante_UWP.ViewModel
{
    public class PedidoViewModel
    {
        public Pedido Pedido { get; set; }
        public ObservableCollection<Pedido> Pedidos { get; set; }

        public PedidoViewModel()
        {
            Pedido = new Pedido();
            Pedidos = new ObservableCollection<Pedido>();
        }

        // Carregar todos os pedidos
        public async void LoadAllAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var pedidos = await uow.PedidoRepository.GetAllAsync();
                Pedidos.Clear();

                foreach (var item in pedidos)
                {
                    var pedidoDetalhes = await uow.PedidoDetailRepository.GetDetailsByPedidoIdAsync(item.Id);
                    item.PedidoDetalhes = pedidoDetalhes;

                    Pedidos.Add(item);
                }
            }
        }

        // Inserir ou atualizar um pedido
        public async Task<Pedido> UpsertAsync()
        {
            using (var uow = new UnityOfWork())
            {
                if (Pedido.Id == 0)
                {
                    Pedido.Data = DateTime.Now;
                }

                var updatedPedido = await uow.PedidoRepository.UpsertAsync(Pedido);
                await uow.SaveAsync();
                return updatedPedido;
            }
        }

        // Atualizar o item selecionado
        public void RefreshItem(Pedido model)
        {
            if (model != null)
            {
                Pedido = model;
            }
        }

        // Deletar um pedido
        public async Task<bool> DeleteAsync(Pedido model)
        {
            using (var uow = new UnityOfWork())
            {
                if (model.PedidoDetalhes.Count == 0)
                {
                    uow.PedidoRepository.Delete(model);
                    await uow.SaveAsync();
                    Pedidos.Remove(model);
                    return true;
                }
                return false;
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
    }
}
