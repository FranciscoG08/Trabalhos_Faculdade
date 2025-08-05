using Restaurante_UWP.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage.Pickers;
using Windows.Storage;
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
    public sealed partial class ProdutoFormPage : Page
    {
        public ProdutoViewModel ProdutoViewModel { get; set; }

        private string _categoriaNome;

        public ProdutoFormPage()
        {
            this.InitializeComponent();
            ProdutoViewModel = new ProdutoViewModel();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            //CategoryViewModel.LoadAllAsync();
            if (e.Parameter != null)
            {
                ProdutoViewModel = e.Parameter as ProdutoViewModel;
            }
            base.OnNavigatedTo(e);
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            if (await ProdutoViewModel.UpsertAsync() != null)
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

        private async void asbCategories_TextChanged(AutoSuggestBox sender, AutoSuggestBoxTextChangedEventArgs args)
        {
            var list = await ProdutoViewModel.LoadCategoriesByNameStartedWithAsync(sender.Text);
            sender.ItemsSource = list;
        }

        private void asbCategories_QuerySubmitted(AutoSuggestBox sender, AutoSuggestBoxQuerySubmittedEventArgs args)
        {
            if (args.ChosenSuggestion != null)
            {
                sender.Text = args.ChosenSuggestion.ToString();

            }
        }

        private void asbCategories_SuggestionChosen(AutoSuggestBox sender, AutoSuggestBoxSuggestionChosenEventArgs args)
        {
            sender.Text = args.SelectedItem.ToString();
        }

        private async void btnUpload_Tapped(object sender, TappedRoutedEventArgs e)
        {
            FileOpenPicker openPicker = new FileOpenPicker();
            openPicker.SuggestedStartLocation = PickerLocationId.PicturesLibrary;
            openPicker.ViewMode = PickerViewMode.Thumbnail;
            //TODO
            openPicker.FileTypeFilter.Clear();
            openPicker.FileTypeFilter.Add(".png");
            openPicker.FileTypeFilter.Add(".jpeg");
            openPicker.FileTypeFilter.Add(".jpg");


            StorageFile file = await openPicker.PickSingleFileAsync();
            if (file != null)
            {
                using (Stream stream = await file.OpenStreamForReadAsync())
                {
                    byte[] bytes = new byte[stream.Length];
                    await stream.ReadAsync(bytes, 0, bytes.Length);
                    ProdutoViewModel.Thumb = bytes;
                }
            }
        }
    }
}
