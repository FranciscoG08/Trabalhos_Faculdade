<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Veiculos;

/**
 * VeiculosSearch represents the model behind the search form of `app\models\Veiculos`.
 */
class VeiculosSearch extends Veiculos
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Id'], 'integer'],
            [['Marca', 'Modelo', 'Ano', 'Combustivel', 'Caixa'], 'safe'],
            [['Preco'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Veiculos::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'Id' => $this->Id,
            'Ano' => $this->Ano,
            'Preco' => $this->Preco,
        ]);

        $query->andFilterWhere(['like', 'Marca', $this->Marca])
            ->andFilterWhere(['like', 'Modelo', $this->Modelo])
            ->andFilterWhere(['like', 'Combustivel', $this->Combustivel])
            ->andFilterWhere(['like', 'Caixa', $this->Caixa]);

        return $dataProvider;
    }
}
