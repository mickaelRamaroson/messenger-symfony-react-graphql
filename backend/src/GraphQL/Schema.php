<?php

namespace App\GraphQL;

// use GraphQL\Mutation\MutationType;
use App\GraphQL\Query\QueryType;
use Youshido\GraphQL\Schema\AbstractSchema;
use Youshido\GraphQL\Config\Schema\SchemaConfig;

class Schema extends AbstractSchema
{
    public function build(SchemaConfig $config)
    {
        $config
            // ->setMutation(new MutationType())
            ->setQuery(new QueryType());
    }
}
