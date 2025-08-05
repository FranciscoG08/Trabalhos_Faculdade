using Restaurante_UWP.ViewModel;
using Restaurante_UWP.Views.Categorias;
using Restaurante_UWP.Views.Empregados;
using Restaurante_UWP.Views.Mesas;
using Restaurante_UWP.Views.Pedidos;
using Restaurante_UWP.Views.Produtos;
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

// O modelo de item de Página em Branco está documentado em https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x416

namespace Restaurante_UWP
{
    /// <summary>
    /// Uma página vazia que pode ser usada isoladamente ou navegada dentro de um Quadro.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public DialogsEmpregadoViewModel EmpregadoViewModel { get; set; }

        public MainPage()
        {
            this.InitializeComponent();
            EmpregadoViewModel = App.EmpregadoViewModel;
        }

        private void nvMain_ItemInvoked(NavigationView sender, NavigationViewItemInvokedEventArgs args)
        {
            var selectedItem = args.InvokedItemContainer as NavigationViewItem;
            if (selectedItem != null)
            {
                switch (selectedItem.Tag)
                {
                    case "categorias":
                        frmMain.Navigate(typeof(ManageCategoriaPage));
                        break;
                    case "produtos":
                        frmMain.Navigate(typeof(ManageProdutoPage));
                        break;
                    case "empregados":
                        frmMain.Navigate(typeof(ManageEmpregadosPage));
                        break;
                    case "pedidos":
                        frmMain.Navigate(typeof(ManagePedidosPage));
                        break;
                    case "mesas":
                        frmMain.Navigate(typeof(ManageMesaPage));
                        break;
                }
            }
        }

        private async void nvLogin_Tapped(object sender, TappedRoutedEventArgs e)
        {
            LoginDialog dlg = new LoginDialog();
            var res = await dlg.ShowAsync();
            if (res == ContentDialogResult.Primary && App.EmpregadoViewModel.IsLogged)
            {
                frmMain.Navigate(typeof(ManagePedidosPage));
            }
        }

        private void nvLogout_Tapped(object sender, TappedRoutedEventArgs e)
        {
            EmpregadoViewModel.DoLogoutAsync();
            frmMain.BackStack.Clear();
            frmMain.Content = null;
        }

        private async void nvRegister_Tapped(object sender, TappedRoutedEventArgs e)
        {
            RegisterDialog dlg = new RegisterDialog();
            var res = await dlg.ShowAsync();
            if (res == ContentDialogResult.Primary && App.EmpregadoViewModel.IsLogged)
            {
                frmMain.Navigate(typeof(ManagePedidosPage));
            }
        }
    }
}
