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

namespace Restaurante_UWP.Views.Produtos
{
    /// <summary>
    /// Uma página vazia que pode ser usada isoladamente ou navegada dentro de um Quadro.
    /// </summary>
    public sealed partial class ManageProdutoPage : Page
    {
        public ProdutoViewModel ProdutoViewModel { get; set; }

        public ManageProdutoPage()
        {
            ProdutoViewModel = new ProdutoViewModel();
            this.InitializeComponent();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            ProdutoViewModel.LoadAllAsync();
            base.OnNavigatedTo(e);
        }

        private void btnNew_Click(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(ProdutoFormPage), ProdutoViewModel);
        }

        private void Grid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            FlyoutBase.ShowAttachedFlyout(sender as FrameworkElement);
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog deleteDialog = new ContentDialog()
            {
                Title = "Apagar Produto?",
                Content = "Se apagar não pode recuperar. Tem a certeza?",
                PrimaryButtonText = "Delete",
                CloseButtonText = "Cancel"
            };

            ContentDialogResult result = await deleteDialog.ShowAsync();
            if (result == ContentDialogResult.Primary)
            {
                //Codigo para eliminar
                if (sender is FrameworkElement fe && fe.DataContext is Produto p)
                {
                    ProdutoViewModel.Produto = p;
                    ProdutoViewModel.DeleteAsync();
                }
            }
        }

        private void btnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (sender is FrameworkElement fe && fe.DataContext is Produto p)
            {
                ProdutoViewModel.Produto = p;
                Frame.Navigate(typeof(ProdutoFormPage), ProdutoViewModel);
            };
        }

        private void mainCommandBar_Opened(object sender, object e)
        {

        }
    }
}