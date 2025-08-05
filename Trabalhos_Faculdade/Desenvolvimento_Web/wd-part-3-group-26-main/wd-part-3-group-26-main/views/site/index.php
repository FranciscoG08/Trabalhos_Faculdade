<?php
//Pagina para o Nos Ajudamos
/** @var yii\web\View $this */

use yii\helpers\Html;
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/estilos_home_page.css', ['position' => \yii\web\View::POS_HEAD]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);

?>

<!doctype html>
<html lang="en">

<head>
  <title>Home Page</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <!-- Font Awesome CSS -->


</head>

<body>
  
  <main>
    <div class="container-fluid bg-danger px-0 fundo">
      <div class="row g-0 bg-info position-relative"> <!--Imagem de fundo E butões-->
        <div class="col-md-12 position-relative">
          <div class="imagem_fundo position-relative">
          <?php
        
        use yii\helpers\Url;

        echo Html::img(Url::to('@web/imagens/estrada.png'), ['class' => 'imagem_fundo']);
        ?>
            <div class="frase d-flex align-items-center justify-content-center">
              <h2>O seu futuro carro está aqui na AUTO GTR</h2>
            </div>
          </div>
        </div>
        <div class="row g-0 bg-info position-relative">
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <?php
              echo Html::a('Comprar', ['site/comprar'], ['class' => 'BotaoComprar']);
            ?>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <?php
              echo Html::a('Anunciar', ['veiculos/create'], ['class' => 'BotaoAnunciar']);
            ?>
</div>

        </div>
      </div>

      <div class="row g-0 bg-info"> <!-- Menu de pesquisa e seleção-->
        <div class="col-md-6">
          <div class="background_middle_1 d-flex align-items-center justify-content-center">
            <div class="fundo_azul d-flex align-items-center justify-content-center">
              <input type="search" list="pesquisa" class="caixa_pesquisa"
                placeholder="O que procura? (Ex: BMW Serie 1, SEAT Ibiza...)" aria-label="Username"
                aria-describedby="basic-addon1">
              <div class="row g-0 bg-info">
                <div class="coluna_1 col-md-6">
                  <div class="dropdown-buttons d-flex flex-column ">
                    <select class="dropdown_buttons_1 dropdown-button" aria-label="Marca"
                      aria-describedby="basic-addon1" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Marca</option>
                      <option value="Limpar">Limpar Seleção </option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="BMW">BMW</option>
                      <option value="Peugeot">Peugeot</option>
                      <option value="Renault">Renault</option>
                      <option value="SEAT">SEAT</option>
                      <option value="Opel">Opel</option>
                    </select>

                    <select id="ano_de_Select" class="dropdown_buttons_1 dropdown-button" aria-label="Ano_de"
                      aria-describedby="basic-addon2" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Ano de</option>
                      <option value="Limpar">Limpar Seleção </option>
                    </select>

                    <select id="precoSelect" class="dropdown_buttons_1 dropdown-button" aria-label="Dropdown 3"
                      aria-describedby="basic-addon3" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Preço até</option>
                      <option value="Limpar">Limpar Seleção </option>
                    </select>

                    <select class="dropdown_buttons_1 dropdown-button" aria-label="Dropdown 4"
                      aria-describedby="basic-addon4" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Tipo de Combustivel</option>
                      <option value="Limpar">Limpar Seleção </option>
                      <option value="Gasolina">Gasolina</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                </div>
                <div class="coluna_1 col-md-6">
                  <div class="dropdown-buttons d-flex flex-column">
                    <select class="dropdown_buttons_1 dropdown-button" aria-label="Modelo"
                      aria-describedby="basic-addon5" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Modelo</option>
                      <option value="Limpar">Limpar Seleção </option>
                      <option value="Opção 1">Modelo 1</option>
                      <option value="Opção 2">Modelo 2</option>
                      <option value="Opção 3">Modelo 3</option>
                      <option value="Opção 4">Modelo 4</option>
                    </select>

                    <select id="ano_ate_Select" class="dropdown_buttons_1 dropdown-button" aria-label="Ano_ate"
                      aria-describedby="basic-addon2" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Ano até</option>
                      <option value="Limpar">Limpar Seleção </option>
                    </select>

                    <select id="km_select" class="dropdown_buttons_1 dropdown-button" aria-label="Quilometros_até"
                      aria-describedby="basic-addon7" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Quilometros até</option>
                      <option value="Limpar">Limpar Seleção </option>
                    </select>

                    <select class="dropdown_buttons_1 dropdown-button" aria-label="Tipo de caixa"
                      aria-describedby="basic-addon8" onchange="resetSelection(this)">
                      <option value="" disabled selected hidden>Tipo de caixa</option>
                      <option value="Limpar">Limpar Seleção </option>
                      <option value="Automatica">Automatica</option>
                      <option value="Manual">Manual</option>

                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="background_middle_2 d-flex align-items-center justify-content-center">
            <div class="fundo_azul d-flex align-items-center justify-content-center">
              <div class="row">
              <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body">
                            <div class="cinzento_img"></div>
                            <div class="descricao_carro">
                                <?php
                                    
                                    $vehicleId = 5; 
                                    $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                    if ($vehicle) {
                                        echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                        // You can display other information about the vehicle using $vehicle
                                        echo '<p>';
                                        echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                        echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                        echo '</p>';
                                        echo '<div class="d-flex align-items-center justify-content-center">';
                                        echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                        echo '</div>';
                                    } else {
                                        echo '<p>Vehicle not found</p>';
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body">
                            <div class="cinzento_img"></div>
                            <div class="descricao_carro">
                                <?php
                                    // Assuming $vehicleId is the ID of the vehicle you want to showcase
                                    $vehicleId = 4; // Replace this with the actual ID you want to showcase
                                    $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                    if ($vehicle) {
                                        echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                        // You can display other information about the vehicle using $vehicle
                                        echo '<p>';
                                        echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                        echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                        echo '</p>';
                                        echo '<div class="d-flex align-items-center justify-content-center">';
                                        echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                        echo '</div>';
                                    } else {
                                        echo '<p>Vehicle not found</p>';
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
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
                <img src="Assets/whatsapp_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="https://www.instagram.com/autogtr_standonline" class="btn icon-2" role="button">
                <img src="Assets/instagram_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="#" class="btn icon-3" role="button">
                <img src="Assets/twitter_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
              <a href="#" class="btn icon-4" role="button">
                <img src="Assets/facebook_icon.svg" alt="WhatsApp" width="40" height="40">
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-0 bg-info"> <!-- Sugestões da Semana -->
        <div class="col-md-12">
          <div class="sugestoes_semana">
            <div class="row g-0 bg-info">
              <div class="col-md-4"> <!-- Titulo Sugestoes -->
                <div class="titulo_sugestoes d-flex align-items-center justify-content-center">
                  <h3>Sugestões da Semana</h3>
                </div>
              </div>
            </div>
            <div class="row g-0 bg-info"> <!-- Carrocel Sugestoes -->
              <div class="col-md-12 d-flex align-items-center justify-content-center">
                <div class="background_blue_carrocel d-flex align-items-center justify-content-center">
                  <div class="row">
                  <div class="col-md-3 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body-maior">
                            <div class="cinzento_img-maior d-flex align-items-center justify-content-center"></div>
                            <div class="descricao_carro">
                                <?php
                                // Assuming $vehicleId is the ID of the vehicle you want to showcase
                                $vehicleId = 6; // Replace this with the actual ID you want to showcase
                                $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                if ($vehicle) {
                                    echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                    // You can display other information about the vehicle using $vehicle
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                    echo '</p>';
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                    echo '</p>';
                                    echo '<div class="d-flex align-items-center justify-content-center">';
                                    echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco-maior d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                    echo '</div>';
                                } else {
                                    echo '<p>Vehicle not found</p>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="col-md-3 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body-maior">
                            <div class="cinzento_img-maior d-flex align-items-center justify-content-center"></div>
                            <div class="descricao_carro">
                                <?php
                                // Assuming $vehicleId is the ID of the vehicle you want to showcase
                                $vehicleId = 7; // Replace this with the actual ID you want to showcase
                                $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                if ($vehicle) {
                                    echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                    // You can display other information about the vehicle using $vehicle
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                    echo '</p>';
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                    echo '</p>';
                                    echo '<div class="d-flex align-items-center justify-content-center">';
                                    echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco-maior d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                    echo '</div>';
                                } else {
                                    echo '<p>Vehicle not found</p>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="col-md-3 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body-maior">
                            <div class="cinzento_img-maior d-flex align-items-center justify-content-center"></div>
                            <div class="descricao_carro">
                                <?php
                                // Assuming $vehicleId is the ID of the vehicle you want to showcase
                                $vehicleId = 10; // Replace this with the actual ID you want to showcase
                                $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                if ($vehicle) {
                                    echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                    // You can display other information about the vehicle using $vehicle
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                    echo '</p>';
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                    echo '</p>';
                                    echo '<div class="d-flex align-items-center justify-content-center">';
                                    echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco-maior d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                    echo '</div>';
                                } else {
                                    echo '<p>Vehicle not found</p>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="col-md-3 d-flex align-items-center justify-content-center">
                    <div class="card text-start">
                        <div class="card-body-maior">
                            <div class="cinzento_img-maior d-flex align-items-center justify-content-center"></div>
                            <div class="descricao_carro">
                                <?php
                                // Assuming $vehicleId is the ID of the vehicle you want to showcase
                                $vehicleId = 18; // Replace this with the actual ID you want to showcase
                                $vehicle = \app\models\Veiculos::findOne($vehicleId);

                                if ($vehicle) {
                                    echo '<h5>' . htmlspecialchars($vehicle->Marca . ' ' . $vehicle->Modelo) . '</h5>';

                                    // You can display other information about the vehicle using $vehicle
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Ano: ' . htmlspecialchars($vehicle->Ano) . ' ';
                                    echo '</p>';
                                    echo '<p>';
                                    echo '<i class="fas fa-tachometer-alt"></i> Combustivel: ' . htmlspecialchars($vehicle->Combustivel) . ' ';
                                    echo '</p>';
                                    echo '<div class="d-flex align-items-center justify-content-center">';
                                    echo '<a href="' . Yii::$app->urlManager->createUrl(['site/carro', 'id' => $vehicle->Id]) . '" class="preco-maior d-flex align-items-center justify-content-center">' . htmlspecialchars($vehicle->Preco) . '€</a>';
                                    echo '</div>';
                                } else {
                                    echo '<p>Vehicle not found</p>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
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

    </div>

  </main>

  
  <script>

    function resetSelection(selectElement) {
      if (selectElement.value === "Limpar") {
        selectElement.selectedIndex = 0;
      }
    }

    const select = document.getElementById("ano_de_Select");
    for (let year = 1965; year <= 2023; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }

    const select_2 = document.getElementById("precoSelect");
    for (let cost = 250; cost <= 50000; cost += (cost <= 4250 ? 250 : 1000)) {
      const option = document.createElement("option");
      option.value = cost;
      option.textContent = cost + '€';
      select_2.appendChild(option);
    }

    const select_3 = document.getElementById("ano_ate_Select");
    for (let year = 1965; year <= 2023; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select_3.appendChild(option);
    }

    const select_4 = document.getElementById("km_select");
    for (let km = 0; km <= 1000000; km += (km <= 28500 ? 1500 : 25000)) {
      const option = document.createElement("option");
      option.value = km;
      option.textContent = km + " km";
      select_4.appendChild(option);

    }

  </script>

  </script>
  <!-- Bootstrap JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>

</body>
</html>