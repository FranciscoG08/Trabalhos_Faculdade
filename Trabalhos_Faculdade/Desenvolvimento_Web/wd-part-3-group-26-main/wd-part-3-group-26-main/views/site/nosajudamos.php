<?php
//Pagina para o Nos Ajudamos
/** @var yii\web\View $this */

$this->title = 'Nos ajudamos';
$this->params['breadcrumbs'][] = $this->title;
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/estilo_ajudamos.css', ['position' => \yii\web\View::POS_HEAD]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);
?>

<!doctype html>
<html lang="en">

<head>
  <title>Nós Ajudamos!</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>

  <main>

    <div class="fundo1 ">
    <div class="container-fluid g-0  px-0  ">
    <div class="d-flex flex-column">
      <div class="align-items-center">
        <br>
        <h1>Nós Ajudamos!</h1>
        <br>
      </div>

      <textoNa class="box_texto p-5 mb-3 rounded fundotexto">
        <p>Está com dúvidas na escolha do seu automóvel?</p>
        A AutoGTR está aqui para tornar essa decisão mais fácil e acertada!
        Nós compreemos que a seleção do carro ideal pode ser uma tarefa desafiante,
        e é por isso que estamos prontos para ajudar.
      </textoNa>

      <div id="accordion1" class="espacamento_cards">
        <div class="card">
          <div class="card-header fundo_cards" data-bs-toggle="collapse" data-bs-target="#collapseOne">
            <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
              <h5>A importância dos quilómetros semanais na escolha de um automóvel.</h5>
            </a>
          </div>
          <div id="collapseOne" class="collapse" data-bs-parent="#accordion1">
            <div class="card-body fundo_in_cards">
              <p>Na escolha de um automóvel, os quilômetros percorridos semanalmente representam um fator crucial a
                ser considerado. A quantidade de quilômetros que um carro é capaz de percorrer semanalmente não
                apenas
                influencia o desgaste dos componentes do veículo, mas também impacta diretamente em questões
                financeiras, na eficiência do combustível e na durabilidade geral do automóvel.</p>
              <p>A escolha entre um carro a gasolina, diesel, elétrico ou híbrido também deve ser ponderada em
                relação
                à quilometragem semanal esperada. Por exemplo, veículos elétricos podem ser ideais para aqueles que
                percorrem distâncias mais curtas, enquanto carros a diesel são conhecidos por sua eficiência em
                viagens mais longas.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="accordion2" class="espacamento_cards">
        <div class="card">
          <div class="card-header fundo_cards" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
            <a class="btn" data-bs-toggle="collapse" href="#collapseTwo">
              <h5>Tamanho do carro</h5>
            </a>
          </div>
          <div id="collapseTwo" class="collapse" data-bs-parent="#accordion2">
            <div class="card-body fundo_in_cards">
              <p>Na escolha entre um coupé, um SUV ou uma carrinha, é crucial considerar as necessidades individuais
                e
                o estilo de vida. Coupés oferecem design esportivo e condução ágil, sendo ideais para quem valoriza
                estilo e performance. SUVs proporcionam robustez, versatilidade e espaço interno, sendo ótimos para
                famílias e uso diário. Carrinhas oferecem ampla capacidade de carga, sendo ideais para transporte de
                cargas maiores ou famílias numerosas. A escolha depende das preferências pessoais, espaço necessário
                e
                uso pretendido do veículo. Cada tipo de carroceria tem vantagens específicas, permitindo que a
                decisão
                final seja baseada nas prioridades individuais do comprador.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="accordion3" class="espacamento_cards">
    <div class="card">
        <div class="card-header fundo_cards" data-bs-toggle="collapse" data-bs-target="#collapseTree">
            <a class="btn" data-bs-toggle="collapse" href="#collapseTree">
                <h5>Preocupação ambiental</h5>
            </a>
        </div>
        <div id="collapseTree" class="collapse" data-bs-parent="#accordion3">
            <div class="card-body fundo_in_cards">
                <p>Os automóveis são produtos que provocam preocupações sustentáveis. Empresas do setor automotivo
                    estão buscando reduzir a produção de poluentes e o consumo de recursos naturais em suas fábricas.
                    A poluição automotiva é uma das principais preocupações ambientais. As emissões de CO2 dos carros
                    contribuem para o aquecimento global e para a poluição do ar.
                    A mobilidade urbana é uma preocupação em diferentes países. A forma como os carros são utilizados
                    nas cidades afeta diretamente a qualidade do ar e a sustentabilidade do ambiente urbano.
                    Os consumidores também estão cada vez mais preocupados com o impacto ambiental dos carros. Pesquisas
                    indicam que muitos portugueses consideram a preocupação ambiental na hora de escolher um veículo.
                </p>
            </div>
        </div>
    </div>
</div>

      <div id="accordion4" class="espacamento_cards2">
        <div class="card">
          <div class="card-header fundo_cards" data-bs-toggle="collapse" data-bs-target="#collapseFour">
            <a class="btn" data-bs-toggle="collapse" href="#collapseFour">
              <h5>Novo ou usado? </h5>
            </a>
          </div>
          <div id="collapseFour" class="collapse" data-bs-parent="#accordion4">
            <div class="card-body fundo_in_cards">
              <p>Carro novo:
                <br>
                - Garantia de fábrica para proteção contra defeitos;<br>- Tecnologias mais recentes e eficiência
                energética;<br> - Possibilidade de personalização de acordo com suas preferências;
                <br>
                <br>
                Carro usado:
                <br>
                - Mais atrativo e economia de dinheiro;
                <br>
                - Desvalorização ao longo do tempo;
                <br>
                - Maior variedade de modelos e opções disponíveis;
                <br>
                - Economias em seguro e impostos;
                <br>
                <br>
                A escolha entre um carro novo ou usado depende das suas necessidades e preferências individuais.
                Considere cuidadosamente seus objetivos e recursos financeiros antes de tomar uma decisão.
                No nosso site de venda de carros, oferecemos uma ampla seleção de veículos novos e usados para
                atender a todos os clientes.
                Encontre o carro dos seus sonhos conosco!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="row">
          <div class="col-md-6 margem_pequena">
            <p>Quantos quilómetros costuma fazer por semana:</p>
            <div class="radio">
              <input type="radio" id="eletrico" name="Quilometro">
              <label for="eletrico">Menos de 20km</label><br>
              <input type="radio" id="eletrico" name="Quilometro">
              <label for="eletrico">Entre 20-50 km</label><br>
              <input type="radio" id="gasolina" name="Quilometro">
              <label for="gasolina">Entre 50-75 km</label><br>
              <input type="radio" id="diesel" name="Quilometro">
              <label for="diesel">Mais de 80 km</label><br>
            </div>
          </div>

          <div class="col-md-6 margem_pequena">
            <p>Quantos passageiros viajam no carro:</p>
            <div class="radio">
              <input type="radio" id="nenhum" name="passageiros">
              <label for="nenhum">1 ou 2</label><br>
              <input type="radio" id="tres" name="passageiros">
              <label for="tres">Entre 3-5</label><br>
              <input type="radio" id="mais_de_cinco" name="passageiros">
              <label for="mais_de_cinco">Mais de 5</label>
              <p> </p>
              <p> </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 margem_pequena">
            <p>Preocupação Ambiental:</p>
            <div class="radio">
              <input type="radio" id="Sim" name="Ambiental">
              <label for="Sim">Sim</label><br>
              <input type="radio" id="Não" name="Ambiental">
              <label for="Não">Não</label><br>
              <input type="radio" id="Indiferente" name="Ambiental">
              <label for="Indiferente">Indiferente</label>
            </div>
          </div>


          <div class="col-md-6 margem_pequena">
            <p>Novo/Usado:</p>
            <div class="radio">
              <input type="radio" id="novo" name="novousado">
              <label for="novo">Novo</label><br>
              <input type="radio" id="usado" name="novousado">
              <label for="usado">Usado</label><br>
            </div>
          </div>

          <div class="botao d-flex align-items-center justify-content-center ">
            <button type="button" class="botaoajudamos botaoanim">Encontrar o carro ideal!</button>
          </div>

        </div>
      </div>
      <br>
    </div>
  </div>

  <div class="row g-0 bg-info"> <!-- Redes Sociais-->
    <div class="col-md-12">
      <div class="redes d-flex align-items-center">
        <h4>Segue-nos nas nossas redes!</h4>
      </div>
      <div class="icons d-flex align-items-center justify-content-end">
        <div class="butao_icon d-grid gap-2 d-md-block">
        <a href="#" class="btn icon-1" role="button">
        <a href="#" class="btn icon-1" role="button">
                <img src="<?= Yii::$app->request->baseUrl ?>/Assets/whatsapp_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="https://www.instagram.com/autogtr_standonline" class="btn icon-2" role="button">
                <img src="<?= Yii::$app->request->baseUrl ?>/Assets/instagram_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="#" class="btn icon-3" role="button">
                <img src="<?= Yii::$app->request->baseUrl ?>/Assets/twitter_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="#" class="btn icon-4" role="button">
                <img src="<?= Yii::$app->request->baseUrl ?>/Assets/facebook_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-0 bg-info"> <!-- Coluna de pesquisa rapida -->
    <div class="col-md-12">
      <div class="background_orange d-flex flex-column">
        <h3>Marcas mais populares</h3>
        <div class="row_hiperlinks">
          <a href="#" class="FIM">BMW</a>
          <a href="#" class="FIM">Audi</a>
          <a href="#" class="FIM">Mercedes</a>
          <a href="#" class="FIM">Opel</a>
          <a href="#" class="FIM">Porsche</a>
          <a href="#" class="FIM">Toyota</a>
          <a href="#" class="FIM">Dacia</a>
          <a href="#" class="FIM">Citroën</a>
          <a href="#" class="FIM">Peugeot</a>
          <a href="#" class="FIM">Renault</a>
        </div>
        <h3>Modelos de carros populares</h3>
        <div class="row_hiperlinks">
          <a href="#" class="FIM">BMW Serie 1</a>
          <a href="#" class="FIM">Peugeot 2008</a>
          <a href="#" class="FIM">Peugeot 208</a>
          <a href="#" class="FIM">Renault Clio</a>
          <a href="#" class="FIM">Opel Corsa</a>
          <a href="#" class="FIM">Mercedes-Benz Classe A</a>
        </div>
        <h3>Os nossos stands</h3>
        <div class="row_hiperlinks">
          <a href="#" class="FIM">Águas Santas</a>
          <a href="#" class="FIM">Sao João da Madeira</a>
          <a href="#" class="FIM">Marco de Canaveses</a>
          <a href="#" class="FIM">Bragança</a>
          <a href="#" class="FIM">Leiria</a>
          <a href="#" class="FIM">Sintra</a>
        </div>
        <h3>Distritos e Regiões</h3>
        <div class="row_hiperlinks">
          <a href="#" class="FIM">Aveiro</a>
          <a href="#" class="FIM">Beja</a>
          <a href="#" class="FIM">Braga</a>
          <a href="#" class="FIM">Bragança</a>
          <a href="#" class="FIM">Castelo Branco</a>
          <a href="#" class="FIM">Coimbra</a>
          <a href="#" class="FIM">Évora</a>
          <a href="#" class="FIM">Faro</a>
          <a href="#" class="FIM">Guarda</a>
          <a href="#" class="FIM">Leiria</a>
          <a href="#" class="FIM">Lisbon</a>
          <a href="#" class="FIM">Portalegre</a>
          <a href="#" class="FIM">Porto</a>
          <a href="#" class="FIM">Santarém</a>
          <a href="#" class="FIM">Setúbal</a>
          <a href="#" class="FIM">Viana do Castelo</a>
          <a href="#" class="FIM">Vila Real</a>
          <a href="#" class="FIM">Viseu</a>
          <a href="#" class="FIM">Azores</a>
          <a href="#" class="FIM">Madeira</a>
        </div>
      </div>
    </div>
  </div>

  </main>


    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
      integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
      </script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // Adiciona um ouvinte de evento ao seu botão
    document.querySelector('#accordion3 .card-header').addEventListener('click', function () {
        // Obtém o elemento de colapso correspondente
        var collapseElement = document.querySelector(this.getAttribute('data-bs-target'));

        // Verifica se o elemento de colapso está atualmente visível
        var isVisible = window.getComputedStyle(collapseElement).display !== 'none';

        // Se estiver visível, fecha-o; se estiver oculto, abre-o
        if (isVisible) {
            bootstrap.Collapse.getInstance(collapseElement).hide();
        } else {
            bootstrap.Collapse.getInstance(collapseElement).show();
        }
    });
</script>
</body>

</html>

