using Restaurante.Domain.SeedWork;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Restaurante.Domain.Models
{
    public class Empregado : Entity
    {
        public string Nome { get; set; }
        public string Password { get; set; }

        public bool isAdmim { get; set; } // PT3

        public List<Pedido> Pedidos { get; set; }
        //O mesmo Empregado pode aparecer em varios pedidos
        public Empregado()
        {
            Pedidos = new List<Pedido>();
        }

        //Tentativa de gerar password criptografada
        public void SetPassword(string password)
        {
            Password = HashPassword(password);
        }

        // Função para verificar se a senha digitada corresponde à senha criptografada
        public static bool VerificarSenha(string senhaDigitada, string senhaArmazenada)
        {
            string senhaHash = HashPassword(senhaDigitada);
            return senhaHash == senhaArmazenada;
        }

        // Função de hash usando SHA256 (pode ser substituída por algo mais seguro como bcrypt ou Argon2)
        private static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}