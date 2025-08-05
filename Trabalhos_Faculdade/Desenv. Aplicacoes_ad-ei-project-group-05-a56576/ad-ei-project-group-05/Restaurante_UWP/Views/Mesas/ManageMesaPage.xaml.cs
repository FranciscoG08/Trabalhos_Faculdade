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

namespace Restaurante_UWP.Views.Mesas
{
    public sealed partial class ManageMesaPage : Page
    {
        public MesaViewModel MesaViewModel { get; set; }

        public ManageMesaPage()
        {
            this.InitializeComponent();
            MesaViewModel = new MesaViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            MesaViewModel.LoadAllAsync();
            base.OnNavigatedTo(e);
        }

        private void btnNew_Click(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(MesaFormPage));  // Navegar para a página de adicionar nova mesa
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            ContentDialog deleteDialog = new ContentDialog()
            {
                Title = "Apagar Mesa?",
                Content = "Se apagar não pode recurarar. Tem a certeza?",
                PrimaryButtonText = "Delete",
                CloseButtonText = "Cancel"
            };

            ContentDialogResult result = await deleteDialog.ShowAsync();
            if (result == ContentDialogResult.Primary)
            {
                // Código para excluir a mesa
                if (sender is FrameworkElement fe && fe.DataContext is Mesa m)
                {
                    MesaViewModel.DeleteAsync(m);
                }
            }
        }

        private void btnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (sender is FrameworkElement fe && fe.DataContext is Mesa m)
            {
                MesaViewModel.Mesa = m;  // Passa a mesa selecionada para o ViewModel
                Frame.Navigate(typeof(MesaFormPage), MesaViewModel);  // Navega para a página de edição
            }
        }

        private void Grid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            FlyoutBase.ShowAttachedFlyout(sender as FrameworkElement);
        }
    }
}
