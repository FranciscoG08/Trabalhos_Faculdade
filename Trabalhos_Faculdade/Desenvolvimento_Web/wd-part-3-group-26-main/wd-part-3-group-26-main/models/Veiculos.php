<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "veiculos".
 *
 * @property int $Id
 * @property string $Marca
 * @property string $Modelo
 * @property string $Ano
 * @property float $Preco
 * @property string $Combustivel
 * @property string $Caixa
 */
class Veiculos extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'veiculos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Marca', 'Modelo', 'Ano', 'Preco', 'Combustivel', 'Caixa'], 'required'],
            [['Ano'], 'safe'],
            [['Preco'], 'number'],
            [['Marca', 'Modelo', 'Combustivel', 'Caixa'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'Id' => 'ID',
            'Marca' => 'Marca',
            'Modelo' => 'Modelo',
            'Ano' => 'Ano',
            'Preco' => 'Preco',
            'Combustivel' => 'Combustivel',
            'Caixa' => 'Caixa',
        ];
    }

    public $Fotos_car;
}
