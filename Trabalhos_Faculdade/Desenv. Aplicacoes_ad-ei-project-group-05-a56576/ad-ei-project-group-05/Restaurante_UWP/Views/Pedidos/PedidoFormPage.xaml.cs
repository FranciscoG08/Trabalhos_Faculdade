using Restaurante.Domain.Models;
using Restaurante_UWP.ViewModel;
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
    public sealed partial class PedidoFormPage : Page
    {
        public PedidoViewModel PedidoViewModel { get; set; }

        public ProdutoViewModel ProdutoViewModel { get; set; }

        public PedidoFormPage()
        {
            this.InitializeComponent();
            PedidoViewModel = new PedidoViewModel();
            ProdutoViewModel = new ProdutoViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            if (e.Parameter != null)
            {
                var model = e.Parameter as Pedido;
                PedidoViewModel.RefreshItem(model);
            }
            base.OnNavigatedTo(e);
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            if (await PedidoViewModel.UpsertAsync() != null)
            {
                Frame.GoBack();
            }
            else
            {
                FlyoutBase.ShowAttachedFlyout(sender as FrameworkElement);
            }
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            Frame.GoBack();
        }
    }
}
