<?php

namespace App\GraphQL\Query\User;

use App\Entity\User;
use App\GraphQL\Type\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;

class GetUsersField extends AbstractField
{

  public EntityManagerInterface $entityManager;
  public SerializerInterface $serializer;
  public function build(FieldConfig $config)
  {
    $this->entityManager = $config->getData()['entityManager'];
    $this->serializer = $config->getData()['serializer'];
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    $users = $this->entityManager->getRepository(User::class)->findBy([], ["id" => 'DESC']);
    $userJson = $this->serializer->serialize($users, 'json', ["users"]);
    return json_decode($userJson);
  }

  /**
   * @return AbstractObjectType|AbstractType
   */
  public function getType()
  {
    return new ListType(new UserType());
  }

  public function getName()
  {
    return 'users';
  }
}