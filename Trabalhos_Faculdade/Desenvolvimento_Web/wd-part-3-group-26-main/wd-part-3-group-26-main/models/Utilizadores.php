<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "utilizadores".
 *
 * @property int $Id
 * @property string $UserName
 * @property string $Password
 */
class Utilizadores extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'utilizadores';
    }
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->Password);
    }

    public static function findByUsername($username)
    {
        return static::findOne(['UserName' => $username]);
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['UserName', 'Password'], 'required'],
            [['UserName', 'Password'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'Id' => 'ID',
            'UserName' => 'User Name',
            'Password' => 'Password',
        ];
    }
    //Encriptar a password
    public function beforeSave($insert)
    {
        if ($this->isNewRecord || $this->isAttributeChanged('Password')) {
            $this->Password = Yii::$app->security->generatePasswordHash($this->Password);
        }

        return parent::beforeSave($insert);
    }
}
