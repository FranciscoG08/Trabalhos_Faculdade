<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

// Fazer DropList para combustiveis
$caixa = [
    'Manual' => 'Manual',
    'Automatica' => 'Automatica',
];
$combustivel = [
    'Gasolina' => 'Gasolina',
    'Gasóleo' => 'Gasóleo',
    'PHEV' => 'PHEV',
    'Elétrico' => 'Elétrico',
]
/** @var yii\web\View $this */
/** @var app\models\Veiculos $model */
/** @var yii\widgets\ActiveForm $form */
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
                    <?php $form = ActiveForm::begin(); ?>

                    <?= $form->field($model, 'Marca')->textInput(['maxlength' => true]) ?>

                    <?= $form->field($model, 'Modelo')->textInput(['maxlength' => true]) ?>

                    <?= $form->field($model, 'Ano')->textInput() ?>

                    <?= $form->field($model, 'Preco')->textInput() ?>

                    <?= $form->field($model, 'Combustivel')->dropDownList($combustivel, ['prompt' => 'Seleciona o combustível']) ?>

                    <?= $form->field($model, 'Caixa')->dropDownList($caixa, ['prompt' => 'Seleciona o tipo de caixa']) ?>

                    <div class="form-group">
                        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
                    </div>

                    <?php ActiveForm::end(); ?>
                </div>
                <div class="col-md-6">
                    <form action="/upload" method="post" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="Foto_Carro" class="form-label textt">Fotografias do Carro</label>
                            <input type="file" class="form-control" id="Fotos_car" name="Fotos_car" multiple
                                accept="image/*">
                            <div id="photoHelp" class="form-text">Selecione uma ou mais imagens do carro.</div>
                        </div>
                    </form>
                    <div class="col-md-6 offset-md-5 distancia_botao">
                        <button type="submit" class="botaoEnviar botaoanim">Enviar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rest of your HTML code -->

        <script>
            function resetSelection(selectElement) {
                if (selectElement.value === "Limpar") {
                    selectElement.selectedIndex = 0;
                }
            }
        </script>

        <!-- Include your JS and CSS dependencies -->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
            crossorigin="anonymous"></script>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
            integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz"
            crossorigin="anonymous"></script>
    </body>

</html>
