<?php
//Pagina para o Manutenção
/** @var yii\web\View $this */

$this->title = 'My Yii Application';
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/estilo_ajudamos.css', ['position' => \yii\web\View::POS_HEAD]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);
?>

<!doctype html>
<html lang="en">

<head>
    <title>Manutenção</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS v5.2.1 -->
    <link rel="stylesheet" type="text/css" href="estilo_manutencao.css">
    <link rel="stylesheet" type="text/css" href="standard.css">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="standard.css">

</head>

<body>


<main>
    <div class="row g-0 bg-info fundo_animado">
        <div class="container-fluid ">
        <div class="col-md-12 d-flex align-items-center justify-content-center">
            <img src="Assets/manutencao.gif" alt="GIF animado" class="gif_animado">
        </div>
    </div>

</main>

    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
        </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
        integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
        </script>
</body>

</html>