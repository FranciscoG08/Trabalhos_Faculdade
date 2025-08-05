using Restaurante_UWP.ViewModel;
using System;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace Restaurante_UWP.Views.Mesas
{
    public sealed partial class MesaFormPage : Page
    {
        public MesaViewModel MesaViewModel { get; set; }

        public MesaFormPage()
        {
            this.InitializeComponent();
            MesaViewModel = new MesaViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            if (e.Parameter != null)
            {
                MesaViewModel = e.Parameter as MesaViewModel;
            }
            base.OnNavigatedTo(e);
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            if (await MesaViewModel.UpsertAsync() != null)
            {
                Frame.GoBack();
            }
            else
            {
                Flyout.ShowAttachedFlyout(sender as FrameworkElement);
            }
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            Frame.GoBack();
        }
    }
}
