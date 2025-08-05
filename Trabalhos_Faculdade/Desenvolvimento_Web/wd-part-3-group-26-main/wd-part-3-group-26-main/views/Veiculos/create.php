<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Veiculos $model */

$this->title = 'Anuncie o seu carro';
//$this->params['breadcrumbs'][] = ['label' => 'Veiculos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/estilo_anuncia.css', ['position' => \yii\web\View::POS_HEAD]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);


?>
<div class="veiculos-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
