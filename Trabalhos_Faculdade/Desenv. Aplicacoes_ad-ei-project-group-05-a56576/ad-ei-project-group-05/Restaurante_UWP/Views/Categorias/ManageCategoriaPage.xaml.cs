using Restaurante.Domain.Models;
using Restaurante_UWP.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
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

namespace Restaurante_UWP.Views.Categorias
{
    /// <summary>
    /// Uma página vazia que pode ser usada isoladamente ou navegada dentro de um Quadro.
    /// </summary>
    public sealed partial class ManageCategoriaPage : Page
    {
        public CategoriaViewModel CategoriaViewModel { get; set; }

        public ManageCategoriaPage()
        {
            this.InitializeComponent();
            CategoriaViewModel = new CategoriaViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            CategoriaViewModel.LoadAllAsync();
            base.OnNavigatedTo(e);
        }

        private void btnNew_Click(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(CategoriaFormPage));
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog deleteDialog = new ContentDialog()
            {
                Title = "Apagar Categoria?",
                Content = "Se apagar não pode recuperar. Tem certeza?",
                PrimaryButtonText = "Delete",
                CloseButtonText = "Cancel"
            };

            ContentDialogResult result = await deleteDialog.ShowAsync();
            if (result == ContentDialogResult.Primary)
            {
                //Codigo para eliminar
                if (sender is FrameworkElement fe && fe.DataContext is Categoria c)
                {
                    CategoriaViewModel.DeleteAsync(c);
                }
            }
        }

        private void btnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (sender is FrameworkElement fe && fe.DataContext is Categoria c)
            {
                CategoriaViewModel.Categoria = c;
                Frame.Navigate(typeof(CategoriaFormPage), CategoriaViewModel);
            }
        }

        private void Grid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            FlyoutBase.ShowAttachedFlyout(sender as FrameworkElement);
        }
    }
}
