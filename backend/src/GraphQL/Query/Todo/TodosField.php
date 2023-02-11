<?php

/**
 * Date: 31.10.16
 *
 * @author Portey Vasil <portey@gmail.com>
 */

namespace App\GraphQL\Query\Todo;


use App\GraphQL\Type\TodoType;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;

class TodosField extends AbstractField
{

    public function resolve($value, array $args, ResolveInfo $info)
    {
        return [["id" => "2132189", "title" => "example"]];
    }

    /**
     * @return AbstractObjectType|AbstractType
     */
    public function getType()
    {
        return new ListType(new TodoType());
    }

    public function getName()
    {
        return 'todos';
    }
}
