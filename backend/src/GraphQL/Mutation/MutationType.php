<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Mutation\User\LoginField;
use App\GraphQL\Mutation\User\UserCreateField;
use Youshido\GraphQL\Config\Object\ObjectTypeConfig;
use Youshido\GraphQL\Type\Object\AbstractObjectType;

class MutationType extends AbstractObjectType
{

    /**
     * @param ObjectTypeConfig $config
     *
     * @return mixed
     */
    public function build($config)
    {
        $config->addFields([
            new UserCreateField($config->getData()),
            new LoginField($config->getData())
        ]);
    }
}