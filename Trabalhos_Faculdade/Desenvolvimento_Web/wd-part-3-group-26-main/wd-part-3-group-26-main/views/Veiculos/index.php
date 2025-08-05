<?php
use app\models\Veiculos;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\widgets\Pjax;

/** @var yii\web\View $this */
/** @var app\models\VeiculosSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Veiculos';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="veiculos-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Veiculos', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>

    <div class="row">
        <?php foreach ($dataProvider->models as $model): ?>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header"><?= Html::encode($model->Marca . ' ' . $model->Modelo) ?></div>
                    <div class="card-body">
                        <p class="card-text"><strong>Preço:</strong> <?= Yii::$app->formatter->asCurrency($model->Preco, 'EUR') ?></p>
                        <p class="card-text"><strong>Ano:</strong> <?= Html::encode($model->Ano) ?></p>
                        <p class="card-text"><strong>Combustivel:</strong> <?= Html::encode($model->Combustivel) ?></p>
                        <p class="card-text"><strong>Caixa:</strong> <?= Html::encode($model->Caixa) ?></p>
                        <!--IMAGEM -->
                        
                        
                        <?= Html::a('View Details', ['view', 'Id' => $model->Id], ['class' => 'btn btn-primary']) ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <?php Pjax::end(); ?>

</div>
