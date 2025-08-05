<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Utilizadores $model */

$this->title = 'Registar na AUTO GTR';
$this->params['breadcrumbs'][] = ['label' => 'Utilizadores', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="utilizadores-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
