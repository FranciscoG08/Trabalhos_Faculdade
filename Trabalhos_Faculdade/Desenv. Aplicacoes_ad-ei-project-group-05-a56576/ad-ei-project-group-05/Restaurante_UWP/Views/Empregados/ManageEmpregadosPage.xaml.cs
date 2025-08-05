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

namespace Restaurante_UWP.Views.Empregados
{
    /// <summary>
    /// Uma página vazia que pode ser usada isoladamente ou navegada dentro de um Quadro.
    /// </summary>
    public sealed partial class ManageEmpregadosPage : Page
    {
        public EmpregadoViewModel ListaEmpregados { get; set; }

        public ManageEmpregadosPage()
        {
            this.InitializeComponent();
            ListaEmpregados = new EmpregadoViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            ListaEmpregados.LoadAllAsync();
            base.OnNavigatedTo(e);
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            if (sender is FrameworkElement fe && fe.DataContext is Empregado emp)
            {
                // Verifica se o empregado é administrador
                if (emp.isAdmim == true) // Supondo que Admin seja um inteiro e 1 signifique "administrador"
                {
                    ContentDialog errorDialog = new ContentDialog()
                    {
                        Title = "Action Denied",
                        Content = "Administrators cannot be deleted.",
                        CloseButtonText = "OK"
                    };
                    await errorDialog.ShowAsync();
                    return; // Sai do método sem realizar a exclusão
                }

                // Confirmação de exclusão
                ContentDialog deleteDialog = new ContentDialog()
                {
                    Title = "Apagar Empregado Permanentemente?",
                    Content = "Se apagar não pode recurarar. Tem a certeza?",
                    PrimaryButtonText = "Delete",
                    CloseButtonText = "Cancel"
                };

                ContentDialogResult result = await deleteDialog.ShowAsync();
                if (result == ContentDialogResult.Primary)
                {
                    // Exclui o empregado se não for administrador
                    ListaEmpregados.DeleteAsync(emp);
                }
            }
        }


        private void Grid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            FlyoutBase.ShowAttachedFlyout(sender as FrameworkElement);
        }
    }
}
