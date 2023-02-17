<?php

namespace App\GraphQL\Type;

use Youshido\GraphQL\Config\Object\ObjectTypeConfig;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\IdType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQL\Type\Scalar\BooleanType;
use Youshido\GraphQL\Type\Scalar\DateTimeType;

class MessageType extends AbstractObjectType
{

  /**
   * @param ObjectTypeConfig $config
   *
   * @return mixed
   */
  public function build($config)
  {
    $config->addFields([
      'id' => new NonNullType(new IdType()),
      'user' => new UserType(),
      'content' => new StringType(),
      'isRead' => new BooleanType(),
      'readAt' => new DateTimeType(),
      'createdAt' => new DateTimeType(),
    ]);
  }
}