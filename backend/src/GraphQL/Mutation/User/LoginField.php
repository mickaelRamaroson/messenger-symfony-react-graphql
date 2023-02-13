<?php

namespace App\GraphQL\Mutation\User;


use App\Entity\User;
use App\GraphQL\Type\LoginType;
use App\Helpers\TokenHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

class LoginField extends AbstractField
{
  private EntityManagerInterface $entityManager;

  public function build(FieldConfig $config)
  {
    $this->entityManager = $config->getData()['entityManager'];

    $config->addArguments([
      'email' => new NonNullType(new StringType()),
      'password' => new NonNullType(new StringType()),
    ]);
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    $user = $this->entityManager->getRepository(User::class)->findOneBy(["email" => $args['email']]);
    if ($user && $user->getPassword() == md5($args['password'])) {
      return [
        "id" => $user->getId(),
        "firstname" => $user->getFirstname(),
        "lastname" => $user->getLastname(),
        "email" => $user->getEmail(),
        "token" => TokenHelper::createToken(["id" => $user->getId(), "email" => $user->getEmail()])
      ];
    }

    throw new AuthenticationException("Authentication Error", 401);
  }

  /**
   * @return AbstractObjectType|AbstractType
   */
  public function getType()
  {
    return new LoginType();
  }

  public function getName()
  {
    return 'login';
  }
}