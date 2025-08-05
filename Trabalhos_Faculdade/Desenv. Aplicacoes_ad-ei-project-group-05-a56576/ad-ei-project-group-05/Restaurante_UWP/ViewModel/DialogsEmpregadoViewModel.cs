using Microsoft.Extensions.Logging;
using Restaurante.Domain.Models;
using Restaurante.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.System;

namespace Restaurante_UWP.ViewModel
{
    public class DialogsEmpregadoViewModel : BindableBase
    {
        public Empregado Empregado { get; set; }

        private Empregado _loggedempregado;

        public Empregado LoggedEmpregado
        {
            get { return _loggedempregado; }
            set
            {
                _loggedempregado = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(IsLogged));
                OnPropertyChanged(nameof(IsNotLogged));
                OnPropertyChanged(nameof(IsAdmin));
            }
        }

        public bool IsLogged
        {
            get
            {
                return _loggedempregado != null;
            }
        }

        public bool IsNotLogged
        {
            get => !IsLogged;
        }

        private bool _showError;

        public bool ShowError
        {
            get { return _showError; }
            set
            {
                _showError = value;
                OnPropertyChanged();
            }
        }

        public bool IsAdmin => LoggedEmpregado != null && LoggedEmpregado.isAdmim;

        public DialogsEmpregadoViewModel()
        {
            Empregado = new Empregado();
        }

        internal async Task<bool> DoLoginAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var user = await uow.EmpregadoRepository.
                    FindByUsernameAndPasswordAsync(Empregado.Nome, Empregado.Password);
                LoggedEmpregado = user;//Guarda o user logado
                ShowError = user == null;

                return !ShowError;
            }
        }

        internal async Task<bool> DoRegisterAsync()
        {
            using (var uow = new UnityOfWork())
            {
                var user = await uow.EmpregadoRepository.FindByNomeAsync(Empregado.Nome);
                if (user == null)
                {
                    uow.EmpregadoRepository.Create(Empregado);
                    await uow.SaveAsync();
                    LoggedEmpregado = Empregado;

                    ShowError = Empregado == null;
                }
            }
            return !ShowError;
        }

        internal void DoLogoutAsync()
        {
            LoggedEmpregado = Empregado = new Empregado();
            LoggedEmpregado = null;
        }
    }
}