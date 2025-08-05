<?php
//Pagina para o anuncia
/** @var yii\web\View $this */

use yii\helpers\Html;
use yii\helpers\Url;
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/estilo_anuncia.css', ['position' => \yii\web\View::POS_HEAD]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);

?>

<!doctype html>
<html lang="en">

<head>
  <title>Anuncia</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  <link rel="stylesheet" type="text/css" href="estilo_anuncia.css">
  <link rel="stylesheet" type="text/css" href="standard.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

</head>

<body>


  <main>

    <div class="container-fluid fundo">
      <div class="d-flex align-items-center justify-content-center">
        <div class="anuncie d-flex align-items-center justify-content-center">
          <h1>Anuncie o seu carro</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="dropdown-buttons d-flex flex-column">
            <select class="opcoes dropdown-button" aria-label="Marca" aria-describedby="basic-addon1"
              onchange="resetSelection(this)">
              <option value="" disabled selected hidden>Marca</option>
              <option value="Mercedes">Mercedes</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
            </select>

            <select class="opcoes dropdown-button" aria-label="Modelo" aria-describedby="basic-addon2"
              onchange="resetSelection(this)">
              <option value="" disabled selected hidden>Modelo</option>
              <option value="ClassA">Classe A</option>
              <option value="Serie1">Serie 1</option>
              <option value="A3">A3</option>
            </select>

            <select class="opcoes dropdown-button" aria-label="Ano" aria-describedby="basic-addon3"
              onchange="resetSelection(this)">
              <option value="" disabled selected hidden>Ano</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

            <select class="opcoes dropdown-button" aria-label="Ano" aria-describedby="basic-addon3"
              onchange="resetSelection(this)">
              <option value="" disabled selected hidden>Combustivel</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diesel</option>
              <option value="Eletrico">Eletrico</option>
            </select>

            <div class="input-group mb-3 largura">
              <span class="input-group-text">Valor Pedido</span>
              <input type="text" class="form-control" aria-label="Preço" aria-describedby="basic-addon4"
                placeholder="Digite o valor em euros">
              <span class="input-group-text largura_1">€</span>
            </div>

          </div>
        </div>
        <div class="col-md-6">
          <form action="/upload" method="post" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="Foto_Carro" class="form-label textt">Fotografias do Carro</label>
              <input type="file" class="form-control" id="Fotos_car" name="Fotos_car" multiple accept="image/*">
              <div id="photoHelp" class="form-text">Selecione uma ou mais imagens do carro.</div>
            </div>
          </form>
          <div class="col-md-6 offset-md-5 distancia_botao">
            <button type="submit" class="botaoEnviar botaoanim">Enviar</button>
          </div>
        </div>

      </div>

      <div class="d-flex align-items-center justify-content-center">
        <div class="confie d-flex align-items-center justify-content-center">
          <h1>Confie em nós</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="funcionarios">
            <img src="Assets/funcionario_do_mes.jpg" alt="A" title="FRANCISCO GUEDES" class="img-fluid rounded">
          </div>
        </div>
        <div class="col-md-4">
          <div class="funcionarios">
            <img src="Assets/funcionario_do_mes.jpg" alt="A" title="MARCELO ROCHA" class="img-fluid rounded">
          </div>
        </div>
        <div class="col-md-4">
          <div class="funcionarios">
            <img src="Assets/funcionario_do_mes.jpg" alt="A" title="MANUEL TEIXEIRA" class="img-fluid rounded">
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
  </script>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>

</html>