using Restaurante.Infrastructure;
using Restaurante.Domain.Models;
using System;
using System.Linq;

//Empregado no Sistema = Funcionario nos Outputs**
bool exit = false;
//Guardar logo mesas e empregados ao correr a aplicaçao pela 1 vez e sem repetir dados;
using (var uow = new UnityOfWork())
{
    // Verificar se as mesas já existem, senão cria
    if (!uow.MesaRepository.GetAllAsync().Result.Any())
    {
        var mesa1 = new Mesa { Capacidade = 4, Numero = 1 };
        var mesa2 = new Mesa { Capacidade = 8, Numero = 2 };
        var mesa3 = new Mesa { Capacidade = 8, Numero = 3 };

        uow.MesaRepository.Create(mesa1);
        uow.MesaRepository.Create(mesa2);
        uow.MesaRepository.Create(mesa3);
    }

    // Verificar se os empregados já existem, senão cria
    if (!uow.EmpregadoRepository.GetAllAsync().Result.Any())
    {
        var emp1 = new Empregado { Nome = "A" ,};
        var emp2 = new Empregado { Nome = "B" };
        var emp3 = new Empregado { Nome = "C" };

        // Senha dos Empregados
        emp1.SetPassword("senha123");
        emp2.SetPassword("senha123");
        emp3.SetPassword("senha123");

        uow.EmpregadoRepository.Create(emp1);
        uow.EmpregadoRepository.Create(emp2);
        uow.EmpregadoRepository.Create(emp3);
    }

    // Guarda na base de dados
    uow.SaveAsync().Wait();
}

Empregado empregadologado = null;  // Variavel para o nome do empregado logado

// Verifica o login do empregado antes de exibir o menu
while (empregadologado == null)
{
    empregadologado = await RealizarLogin();  // Chama o método de login
}

//Por login do empregado aqui deve verificar na base de dados o nome e password
async Task<Empregado> RealizarLogin()
{
    Console.WriteLine("Digite o nome do empregado: (A|B|C)");
    string nomeEmpregado = Console.ReadLine();

    using (var uow = new UnityOfWork())
    {
        var empregados = await uow.EmpregadoRepository.GetAllAsync();
        var empregado = empregados
            .Where(e => e.Nome.Equals(nomeEmpregado, StringComparison.OrdinalIgnoreCase))
            .FirstOrDefault();

        if (empregado != null)
        {
            Console.WriteLine("Digite a senha do empregado: (todas as senhas = senha123)");
            string senhaDigitada = Console.ReadLine();

            if (Empregado.VerificarSenha(senhaDigitada, empregado.Password))
            {
                Console.WriteLine($"Bem-vindo, {empregado.Nome}!");
                return empregado;
            }
            else
            {
                Console.WriteLine("Senha incorreta. Tente novamente.");
                return null;
            }
        }
        else
        {
            Console.WriteLine("Empregado não encontrado.");
            return null;
        }
    }
}

//MENU
do
{
    Console.WriteLine();
    Console.WriteLine("============================================");
    Console.WriteLine("| Trabalho Realizado (individualmente) por:|");
    Console.WriteLine("| José Guedes (a56576)                     |");
    Console.WriteLine("============================================");
    Console.WriteLine($"| Empregado logado: {empregadologado.Nome}                      |");
    Console.WriteLine("============================================");
    Console.WriteLine("|  1. Criar Categoria (DEMO)               |");
    Console.WriteLine("|  2. Criar Produto (DEMO)                 |");
    Console.WriteLine("|  3. Criar Pedido (Inserir manualmente)   |");// Ao criar Pedido Criamos o cliente
    Console.WriteLine("|  4. Listar Categorias                    |");
    Console.WriteLine("|  5. Listar Produtos                      |");
    Console.WriteLine("|  6. Listar Pedidos                       |");
    Console.WriteLine("|  7. Editar Produto                       |");
    Console.WriteLine("|  8. Excluir Produto                      |");
    Console.WriteLine("|  9. Preço Total do Pedido                |");// Vai procurar pelo nome do Cliente
    Console.WriteLine("| 10. Faturamento do dia (DD/MM/AAAA)      |");// Inserir uma data para ver quanto faturou no dia
    Console.WriteLine("| 11. Sair da conta do Funcionario         |");
    Console.WriteLine("|  0. Exit                                 |");
    Console.WriteLine("============================================");
    Console.WriteLine("\nInsira a sua Escolha: ");

    var option = Console.ReadLine();

    switch (option)
    {
        case "1":
            CriarCategorias();
            break;
        case "2":
            CriarProdutos();
            break;
        case "3":
            CriarPedido();
            break;
        case "4":
            ListarCategorias();
            break;
        case "5":
            ListarProdutos();
            break;
        case "6":
            ListarPedidos();
            break;
        case "7":
            EditarProduto();
            break;
        case "8":
            EliminarProduto();
            break;
        case "9":
            PrecoTotal();
            break;
        case "10":
            Lucro_do_Dia();
            break;
        case "11":
            Logout();
            break;
        case "0":
            exit = true;
            break;
        default:
            Console.WriteLine("UPS... Algo de errado não esta certo :)");
            Console.ReadKey();
            break;
    }
} while (!exit);

async void CriarCategorias()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path:  {uow.GetDbPath()}");

        // Create categories
        var c1 = new Categoria { Nome = "Entradas" };
        var c2 = new Categoria { Nome = "Pratos" };
        var c3 = new Categoria { Nome = "Sobremesas" };
        var c4 = new Categoria { Nome = "Bebidas" };

        // Verificar se as categorias já existem antes de adicioná-las
        var existingCategory1 = await uow.CategoriaRepository.FindByNameAsync(c1.Nome);
        var existingCategory2 = await uow.CategoriaRepository.FindByNameAsync(c2.Nome);
        var existingCategory3 = await uow.CategoriaRepository.FindByNameAsync(c3.Nome);
        var existingCategory4 = await uow.CategoriaRepository.FindByNameAsync(c4.Nome);

        bool createdAnyCategory = false;
        // Se a categoria não existir, criar a categoria
        if (existingCategory1 == null)
        {
            await uow.CategoriaRepository.FindOrCreateAsync(c1);
            createdAnyCategory = true;
        }
        if (existingCategory2 == null)
        {
            await uow.CategoriaRepository.FindOrCreateAsync(c2);
            createdAnyCategory = true;
        }
        if (existingCategory3 == null)
        {
            await uow.CategoriaRepository.FindOrCreateAsync(c3);
            createdAnyCategory = true;
        }
        if (existingCategory4 == null)
        {
            await uow.CategoriaRepository.FindOrCreateAsync(c4);
            createdAnyCategory = true;
        }

        // Salvar as mudanças se qualquer categoria foi criada
        if (createdAnyCategory)
        {
            await uow.SaveAsync();
        }
        Console.WriteLine();
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine("|       Categorias criadas com sucesso! |");
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine();
    }
}

async void CriarProdutos()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path:  {uow.GetDbPath()}");

        var entradas = await uow.CategoriaRepository.FindByNameAsync("Entradas");
        var pratos = await uow.CategoriaRepository.FindByNameAsync("Pratos");
        var sobremesas = await uow.CategoriaRepository.FindByNameAsync("Sobremesas");
        var bebidas = await uow.CategoriaRepository.FindByNameAsync("Bebidas");

        if (entradas == null || pratos == null || sobremesas == null || bebidas == null)
        {
            Console.WriteLine("Categorias não encontradas. Crie as categorias primeiro!");
            return;
        }

        var produtos = new List<Produto>
        {
            new Produto { Nome = "Salada", Preco = 15.5f, Categoria = entradas },
            new Produto { Nome = "Rissois", Preco = 12.0f, Categoria = entradas },
            new Produto { Nome = "Arroz de Pato", Preco = 15.5f, Categoria = pratos },
            new Produto { Nome = "Salmão", Preco = 12.0f, Categoria = pratos },
            new Produto { Nome = "Pudim", Preco = 8.0f, Categoria = sobremesas },
            new Produto { Nome = "Petit Gâteau", Preco = 10.0f, Categoria = sobremesas },
            new Produto { Nome = "Água", Preco = 2.5f, Categoria = bebidas },
            new Produto { Nome = "Refrigerante", Preco = 3.0f, Categoria = bebidas }
        };

        foreach (var produto in produtos)
        {
            await uow.ProdutoRepository.FindOrCreateAsync(produto);
        }

        await uow.SaveAsync();
        Console.WriteLine();
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine("|       Produtos criados com sucesso!   |");
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine();
    }
}

async void CriarPedido()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path:  {uow.GetDbPath()}");

        // Criar Cliente
        Console.WriteLine("Nome: ");
        var clienteNome = Console.ReadLine();
        Console.WriteLine("NIF: ");
        var clienteNIF = Console.ReadLine();
        var cliente = new Cliente { Nome = clienteNome, NIF = clienteNIF };

        // Verifica se o cliente já existe
        var clienteExistente = await uow.ClienteRepository.FindByNifAsync(clienteNIF);
        if (clienteExistente == null)
        {
            uow.ClienteRepository.Create(cliente); // Cria o cliente na base de dados
        }
        else
        {
            cliente = clienteExistente; // Se o cliente já existe, usa o cliente existente
        }

        // Escolher Funcionario(melhor palavra que empregado)
        Console.WriteLine("Funcionario: [A, B, C]: ");
        var emp = Console.ReadLine();
        Empregado empregadoEscolhido = emp switch
        {
            "A" => await uow.EmpregadoRepository.FindByNomeAsync("A"),
            "B" => await uow.EmpregadoRepository.FindByNomeAsync("B"),
            "C" => await uow.EmpregadoRepository.FindByNomeAsync("C"),
        };

        if (empregadoEscolhido == null)
        {
            Console.WriteLine("Funcionario inválido.");
            return;
        }

        // Escolher Mesa
        Console.WriteLine("Mesa: [1, 2, 3]: ");
        var mesa = Console.ReadLine();
        Mesa mesaEscolhida = mesa switch
        {
            "1" => await uow.MesaRepository.FindByNumeroAsync(1),
            "2" => await uow.MesaRepository.FindByNumeroAsync(2),
            "3" => await uow.MesaRepository.FindByNumeroAsync(3),
        };

        if (mesaEscolhida == null)
        {
            Console.WriteLine("Mesa inválida.");
            return;
        }

        // Exibir lista de produtos para escolher
        var produtos = await uow.ProdutoRepository.FindAllAsync();
        Console.WriteLine("\nEscolher Produtos: (Número do produto e Quantidade, ou '0' para finalizar):");

        int produtoId = 1;
        foreach (var produto in produtos)
        {
            Console.WriteLine($"{produtoId}. {produto.Nome} | Preço: {produto.Preco} €");
            produtoId++;
        }

        // Lista de produtos escolhidos
        var detalhesPedido = new List<PedidoDetail>();

        // Escolher produtos e quantidades
        while (true)
        {
            Console.WriteLine("Número do produto ou '0' para finalizar:");
            var produtoEscolhido = Console.ReadLine();
            if (produtoEscolhido == "0")
            {
                break; // Finalizar pedido
            }

            if (int.TryParse(produtoEscolhido, out int produtoNumero) && produtoNumero > 0 && produtoNumero <= produtos.Count)
            {
                var produtoSelecionado = produtos[produtoNumero - 1];

                // Pedir a quantidade do produto
                Console.WriteLine($"Quantidade: {produtoSelecionado.Nome}?");
                var quantidade = Console.ReadLine();
                if (int.TryParse(quantidade, out int qtd) && qtd > 0)
                {
                    detalhesPedido.Add(new PedidoDetail
                    {
                        Produto = produtoSelecionado,
                        Quantidade = qtd
                    });
                }
                else
                {
                    Console.WriteLine("Quantidade inválida");
                }
            }
            else
            {
                Console.WriteLine("Número de produto inválido.");
            }
        }

        // Verifica se há produtos no pedido
        if (!detalhesPedido.Any())
        {
            Console.WriteLine("Nenhum produto escolhido. Pedido não criado.");
            return;
        }

        // Nao faz sentido verifica se o pedido já existe
        //var existingPedido = await uow.PedidoRepository.FindPedidoAsync(cliente.Id, mesaEscolhida.Id, empregadoEscolhido.Id, DateTime.Now);
        //if (existingPedido == null)
        //{
        // Criar o pedido
        var pedido = new Pedido
        {
            Clientes = cliente,
            Empregados = empregadoEscolhido,
            Mesas = mesaEscolhida,
            Data = DateTime.Now,
            PedidoDetalhes = detalhesPedido
        };

        // Adicionar o pedido à base de dados
        uow.PedidoRepository.Create(pedido);
        await uow.SaveAsync();

        Console.WriteLine();
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine("|        Pedido criado com sucesso.     |");
        Console.WriteLine("-----------------------------------------");
        Console.WriteLine();
        
        //}
    }
}

async void ListarCategorias()
{
    using (var uow = new UnityOfWork())
    {
        // Usando o método FindAllAsync para obter todas as categorias
        var list = await uow.CategoriaRepository.FindAllAsync();

        if (!list.Any())
        {
            Console.WriteLine("\nNenhuma categoria encontrada.");
        }
        else
        {
            Console.WriteLine("\n============================================");
            Console.WriteLine("|               Categorias                  |");
            Console.WriteLine("============================================");
            foreach (var categoria in list)
            {
                Console.WriteLine($"| - {categoria.Nome.PadRight(40)}|");
            }
            Console.WriteLine("============================================");
        }
    }
}

async void ListarProdutos()
{
    using (var uow = new UnityOfWork())
    {
        // Usando o método FindAllAsync para obter todos os produtos
        var list = await uow.ProdutoRepository.FindAllAsync();

        if (!list.Any())
        {
            Console.WriteLine("\nNenhum produto encontrado.");
        }
        else
        {
            Console.WriteLine("\n============================================");
            Console.WriteLine("|                 Produtos                 |");
            Console.WriteLine("============================================");

            foreach (var produto in list)
            {
                Console.WriteLine($"| - {produto.Nome.PadRight(25)} | Preço: {produto.Preco,8:0.00} € |");
            }

            Console.WriteLine("============================================");
        }

    }
}

async void ListarPedidos()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path: {uow.GetDbPath()}");

        // Listar todos os pedidos do banco de dados
        var pedidos = await uow.PedidoRepository.GetAllAsync();

        if (!pedidos.Any())
        {
            Console.WriteLine("Nenhum pedido encontrado!");
        }
        else
        {
            Console.WriteLine("\n=========================================");
            Console.WriteLine("|              Lista de Pedidos         |");
            Console.WriteLine("=========================================");

            foreach (var pedido in pedidos)
            {
                Console.WriteLine($"\n-----------------------------------------");
                Console.WriteLine($"| Pedido ID: {pedido.Id.ToString().PadRight(30)}|");
                Console.WriteLine($"-----------------------------------------");
                Console.WriteLine($"  Cliente:     {pedido.Clientes?.Nome ?? "N/A"}");
                Console.WriteLine($"  Mesa:        {pedido.Mesas?.Numero ?? 0}");
                Console.WriteLine($"  Empregado:   {pedido.Empregados?.Nome ?? "N/A"}");
                Console.WriteLine($"  Data:        {pedido.Data:G}");
                Console.WriteLine("  Detalhes do Pedido:");
                Console.WriteLine("  ------------------------------------");

                foreach (var detalhe in pedido.PedidoDetalhes)
                {
                    Console.WriteLine($"    - Produto: {detalhe.Produto?.Nome ?? "N/A"}");
                    Console.WriteLine($"      Quantidade: {detalhe.Quantidade}");
                }
            }
        }
        Console.WriteLine("\nPressione qualquer tecla para voltar ao menu.");
        Console.ReadKey();
    }
}

async void EditarProduto()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path: {uow.GetDbPath()}");
        Produto produto = null;

        // Loop para buscar o produto até que seja encontrado ou o usuário desista
        while (produto == null)
        {
            Console.WriteLine("Digite o nome do produto a editar: ");
            var nomeProduto = Console.ReadLine();

            // Procurar o produto no banco de dados
            produto = await uow.ProdutoRepository.FindByNameAsync(nomeProduto);

            if (produto == null)
            {
                Console.WriteLine("Produto não encontrado. Deseja tentar novamente? (s/n)");
                var resposta = Console.ReadLine()?.ToLower();
                if (resposta != "s")
                {
                    Console.WriteLine("Operação cancelada.");
                    return;
                }
            }
        }

        // Produto encontrado
        Console.WriteLine($"Produto encontrado: {produto.Nome} | Preço: {produto.Preco}");
        Console.WriteLine("Digite o novo nome do produto (ou pressione Enter para manter o atual): ");
        var novoNome = Console.ReadLine();

        Console.WriteLine("Digite o novo preço (ou pressione Enter para manter o atual): ");
        var novoPreco = Console.ReadLine();

        // Atualizar os valores se o usuário inserir dados válidos
        if (!string.IsNullOrWhiteSpace(novoNome))
        {
            produto.Nome = novoNome;
        }

        if (!string.IsNullOrWhiteSpace(novoPreco) && float.TryParse(novoPreco, out float novo_Preco))
        {
            produto.Preco = (float)Math.Round(novo_Preco, 2);
        }

        // Salvar a atualização no banco de dados
        var updatedProduto = await uow.ProdutoRepository.UpsertAsync(produto);

        if (updatedProduto != null)
        {
            await uow.SaveAsync(); // Atualiza no banco de dados
            Console.WriteLine("Produto atualizado com sucesso.");
        }
        else
        {
            Console.WriteLine("Não foi possível atualizar o produto. O nome pode já estar em uso por outro produto.");
        }
    }
}

async void EliminarProduto()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine($"DB Path: {uow.GetDbPath()}");

        Console.WriteLine("Digite o nome do produto a eliminar: ");
        var nomeProduto = Console.ReadLine();

        //Verificar se produto existe
        var produto = await uow.ProdutoRepository.FindByNameAsync(nomeProduto);
        if (produto == null)
            Console.WriteLine("Produto nao encontrado");
        else
        {
            Console.WriteLine($"Produto encontrado: {produto.Nome}");
            Console.WriteLine("Tem certeza que deseja eliminar? (s/n)");
            var confirmacao = Console.ReadLine();

            if (confirmacao == "s" || confirmacao == "S")
            {
                uow.ProdutoRepository.Delete(produto);
                await uow.SaveAsync();
            }
            else
            {
                Console.WriteLine("Operaçao Cancelada");
            }
        }
    }
}

async void PrecoTotal()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine("Digite o Nome do cliente: ");
        var nome = Console.ReadLine();

        // Verifica se o cliente existe
        var cliente = await uow.ClienteRepository.FindByNameAsync(nome);

        if (cliente == null)
        {
            Console.WriteLine("Cliente não encontrado.");
            return;
        }
        else
        {
            // Obter os pedidos associados ao cliente pelo ID
            var pedidos = await uow.PedidoRepository.GetByClienteIdAsync(cliente.Id);

            if (!pedidos.Any())
            {
                Console.WriteLine($"Nenhum pedido associado a {cliente.Nome}.");
            }
            else
            {
                // Valor Total dos Pedidos
                float valorTotal = 0;
                foreach (var pedido in pedidos)
                {
                    if (pedido.PedidoDetalhes != null)
                    {
                        valorTotal += pedido.PedidoDetalhes.Sum(pd => pd.Quantidade * pd.Produto.Preco);
                    }
                }

                Console.WriteLine("\n***************************************");
                Console.WriteLine("|        Valor Total dos Pedidos          |");
                Console.WriteLine("***************************************");
                Console.WriteLine($"| Cliente: {cliente.Nome.PadRight(30)}|");
                Console.WriteLine("***************************************");
                Console.WriteLine($"| Valor Total: {valorTotal.ToString("F2")} [EUR] |");//Nao aceita simbolo €
                Console.WriteLine("***************************************\n");

            }
        }
    }
}

async void Lucro_do_Dia()
{
    using (var uow = new UnityOfWork())
    {
        Console.WriteLine("Digite o dia (DD/MM/AAAA): ");
        var inputData = Console.ReadLine();

        if (!DateTime.TryParse(inputData, out DateTime dataSelecionada))
        {
            Console.WriteLine("Dia Invalido! Certifique-se que usou o formato DD/MM/AAAA.");
            return;
        }

        // Buscar os pedidos da data selecionada
        var pedidos = await uow.PedidoRepository.GetByDateAsync(dataSelecionada);
        //SE for null ou zero nao tem pedidos para o dia
        if (pedidos == null || !pedidos.Any())
        {
            Console.WriteLine($"Nenhum pedido encontrado para o dia {dataSelecionada:dd/MM/yyyy}.");
            return;
        }

        // Faturamento Total
        float faturamentoTotal = pedidos
            .SelectMany(p => p.PedidoDetalhes)
            .Sum(d => d.Quantidade * d.Produto.Preco);

        Console.WriteLine("\n***************************************");
        Console.WriteLine($"|    Faturamento do dia {dataSelecionada:dd/MM/yyyy}    |");
        Console.WriteLine("***************************************");
        Console.WriteLine($"| Faturamento Total: {faturamentoTotal.ToString("F2")} EUR       |");
        Console.WriteLine("***************************************");
    }
}

//Corrigido
async void Logout()
{
    empregadologado = null;

    Console.Clear();
    Console.WriteLine("Sessão encerrada com sucesso!");

    while (empregadologado == null)
    {
        empregadologado = await RealizarLogin();
    }

}