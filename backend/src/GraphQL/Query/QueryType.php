<?php

namespace App\GraphQL\Query;

use App\GraphQL\Query\Thread\UserTreadsField;
use App\GraphQL\Query\User\GetUsersField;
use Youshido\GraphQL\Config\Object\ObjectTypeConfig;
use Youshido\GraphQL\Type\Object\AbstractObjectType;

class QueryType extends AbstractObjectType
{
    /**
     * @param ObjectTypeConfig $config
     *
     * @return mixed
     */
    public function build($config)
    {
        $config->addFields([
            new GetUsersField(null, $config->getData()),
            new UserTreadsField(null, $config->getData())
        ]);
    }
}