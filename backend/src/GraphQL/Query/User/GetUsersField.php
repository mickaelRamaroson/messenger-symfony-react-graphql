<?php

namespace App\GraphQL\Query\User;

use App\Entity\User;
use App\GraphQL\Type\UserType;
use App\Helpers\CheckTokenUserHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;

class GetUsersField extends AbstractField
{

  private EntityManagerInterface $entityManager;
  private SerializerInterface $serializer;
  private ?string $token;

  public function __construct(?array $config, array $data)
  {
    parent::__construct($config ?? []);
    $this->entityManager = $data['entityManager'];
    $this->serializer = $data['serializer'];
    $this->token = $data['token'];
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    CheckTokenUserHelper::checkAuthorization($this->token, $this->entityManager);
    $users = $this->entityManager->getRepository(User::class)->findBy([], ["id" => 'DESC']);
    $userJson = $this->serializer->serialize($users, 'json', ["groups" => ["users"]]);
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