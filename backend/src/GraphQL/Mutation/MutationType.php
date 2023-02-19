<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Mutation\Thread\CreateMessageField;
use App\GraphQL\Mutation\Thread\CreateThreadField;
use App\GraphQL\Mutation\Thread\SetReadMessagesField;
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
            new LoginField($config->getData()),
            new CreateThreadField($config->getData()),
            new CreateMessageField($config->getData()),
            new SetReadMessagesField($config->getData())
        ]);
    }
}