<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\VeiculosSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="veiculos-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
        'options' => [
            'data-pjax' => 1
        ],
    ]); ?>

    <?= $form->field($model, 'Id') ?>

    <?= $form->field($model, 'Marca') ?>

    <?= $form->field($model, 'Modelo') ?>

    <?= $form->field($model, 'Ano') ?>

    <?= $form->field($model, 'Preco') ?>

    <?php // echo $form->field($model, 'Combustivel') ?>

    <?php // echo $form->field($model, 'Caixa') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
