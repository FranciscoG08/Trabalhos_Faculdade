using Restaurante.Domain.Models;
using Restaurante_UWP.ViewModel;
using Restaurante_UWP.Views.Categorias;
using Restaurante_UWP.Views.Produtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// O modelo de item de Página em Branco está documentado em https://go.microsoft.com/fwlink/?LinkId=234238

namespace Restaurante_UWP.Views.Pedidos
{
    /// <summary>
    /// Uma página vazia que pode ser usada isoladamente ou navegada dentro de um Quadro.
    /// </summary>
    public sealed partial class ManagePedidosPage : Page
    {
        public PedidoViewModel PedidoViewModel { get; set; }

        public ManagePedidosPage()
        {
            this.InitializeComponent();
            PedidoViewModel = new PedidoViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            PedidoViewModel.LoadAllAsync();
        }

        private void btnNew_Click(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(PedidoFormPage));
        }

        private void ListView_ItemClick(object sender, ItemClickEventArgs e)
        {
            if (e.ClickedItem is Pedido selectedPedido)
            {
                PedidoViewModel.RefreshItem(selectedPedido);
                // Abre detalhes do pedido selecionado ou edição.
            }
        }

        private void btnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (sender is FrameworkElement fe && fe.DataContext is Pedido p)
            {
                PedidoViewModel.Pedido = p;
                Frame.Navigate(typeof(PedidoFormPage), PedidoViewModel);
            };
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog deleteDialog = new ContentDialog()
            {
                Title = "Apagar permanentemente?",
                Content = "Se apagar não pode recurarar. Tem a certeza?",
                PrimaryButtonText = "Delete",
                CloseButtonText = "Cancel"
            };

            ContentDialogResult result = await deleteDialog.ShowAsync();
            if (result == ContentDialogResult.Primary)
            {
                //Codigo para eliminar
                if (sender is FrameworkElement fe && fe.DataContext is Pedido c)
                {
                    _ = PedidoViewModel.DeleteAsync(c);
                }
            }
        }
    }
}