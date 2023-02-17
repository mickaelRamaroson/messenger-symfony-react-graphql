<?php

namespace App\GraphQL;

use App\GraphQL\Mutation\MutationType;
use App\GraphQL\Query\QueryType;
use Youshido\GraphQL\Config\Schema\SchemaConfig;
use Youshido\GraphQL\Schema\AbstractSchema;

class Schema extends AbstractSchema
{

    public function build(SchemaConfig $config)
    {
        $config
            ->setQuery(new QueryType($config->getData()))
            ->setMutation(new MutationType($config->getData()));
    }
}