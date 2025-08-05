<?php

/** @var yii\web\View $this */
/** @var string $content */

use app\assets\AppAsset;
use app\widgets\Alert;
use yii\bootstrap5\Breadcrumbs;
use yii\bootstrap5\Html;
use yii\bootstrap5\Nav;
use yii\bootstrap5\NavBar;
use yii\helpers\Url;

AppAsset::register($this);

$this->registerCsrfMetaTags();
$this->registerMetaTag(['charset' => Yii::$app->charset], 'charset');
$this->registerMetaTag(['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1, shrink-to-fit=no']);
$this->registerMetaTag(['name' => 'description', 'content' => $this->params['meta_description'] ?? '']);
$this->registerMetaTag(['name' => 'keywords', 'content' => $this->params['meta_keywords'] ?? '']);
$this->registerLinkTag(['rel' => 'icon', 'type' => 'image/x-icon', 'href' => Yii::getAlias('@web/favicon.ico')]);
$this->registerCssFile(Yii::$app->request->baseUrl . '/web/css/standard.css', ['position' => \yii\web\View::POS_HEAD]);




?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    
    <?php $this->head() ?>
</head>
<body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>

<header id="nav_bar Navbar">
    <?php
NavBar::begin([
  'brandLabel' => Html::img(Yii::getAlias('@web').'/imagens/LOGO FINAL.png ',['alt' => 'Logo']),
  'brandUrl' => Yii::$app->homeUrl,
  'options' => ['class' => ' navbar navbar-expand-sm navbar-light bg-light navbar-brand img ']
]);
echo Nav::widget([
    'options' => ['class' => ' navbar-nav ml-auto-custom justify-content-end Navbar  '], 
    'items' => [
        ['label' => 'Nós Ajudamos', 'url' => ['/site/nosajudamos']],
        ['label' => 'Elétricos', 'url' => ['/site/eletricos']],
        ['label' => 'Contacto', 'url' => ['/site/contact']],			
        ['label' => 'Anuncia', 'url' => ['/veiculos/create']],
        ['label' => 'Veiculos', 'url' => ['/veiculos/index']],//Acrescentei para um guest poder consultar os veiculos			
        ['label' => 'Admin', 'url' =>'#',
            'visible' => Yii::$app->user->can('admin'),
            'items' => [
                ['label' => 'Utilizadores', 'url' => ['/user/admin']],
                ['label' => 'Veiculos', 'url' => ['/veiculos']],
            ]
        ],

        Yii::$app->user->isGuest
            ? ['label' => 'Login', 'url' => ['/user/login']]
            : [
                'label' => 'Logout (' . Yii::$app->user->identity->username . ')',
                'url' => ['/user/logout'], 
                'linkOptions' => ['data-method' => 'post', 'class' => 'nav-link btn btn-link logout']
            ],
    ]
]);
NavBar::end();
    ?>
</header>

<main id="main" class="flex-shrink-0" role="main">
    <div class="container-fluid g-0">
        <?php if (!empty($this->params['breadcrumbs'])): ?>
            <?= Breadcrumbs::widget(['links' => $this->params['breadcrumbs']]) ?>
        <?php endif ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>

<footer>
      <div class="row g-0 bg-info">
        <div class="col-md-6">
          <div class="footer_div d-flex align-items-center justify-content-center">
            <div>
              <a href="manutencao.html" class="hiperlinks_footer_esq">Politica de Privacidade</a>
              <a href="manutencao.html" class="hiperlinks_footer_esq">Termos e condições</a>
              <a href="manutencao.html" class="hiperlinks_footer_esq">Politica de cookies</a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="footer_div d-flex align-items-center justify-content-center">
            <div>
              <a href="manutencao.html" class="hiperlinks_footer_dir">FAQ</a>
              <a href="manutencao.html" class="hiperlinks_footer_dir">Sobre nós</a>
              <a href="http://localhost/wd-part-3-group-26/web/site/contact" class="hiperlinks_footer_dir">Contatos</a>
              <a href="https://www.livroreclamacoes.pt/Inicio/" class="hiperlinks_footer_dir">Livro de Reclamações</a>
            </div>
          </div>
        </div>
      </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>