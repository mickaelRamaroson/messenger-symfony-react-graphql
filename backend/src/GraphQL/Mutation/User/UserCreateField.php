<?php

namespace App\GraphQL\Mutation\User;


use App\Entity\User;
use App\GraphQL\Type\UserRegisterResponseType;
use App\Helpers\TokenHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

class UserCreateField extends AbstractField
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;
    public function build(FieldConfig $config)
    {
        $this->entityManager = $config->getData()['entityManager'];
        $this->serializer = $config->getData()['serializer'];

        $config->addArguments([
            'firstname' => new NonNullType(new StringType()),
            'lastname' => new NonNullType(new StringType()),
            'email' => new NonNullType(new StringType()),
            'password' => new NonNullType(new StringType()),
        ]);
    }

    public function resolve($value, array $args, ResolveInfo $info)
    {
        $user = $this->serializer->deserialize(json_encode([...$args, 'password' => md5($args['password'])]), USER::class, 'json');
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'token' => TokenHelper::createToken(["id" => $user->getId(), "email" => $user->getEmail()]),
        ];
    }

    /**
     * @return AbstractObjectType|AbstractType
     */
    public function getType()
    {
        return new UserRegisterResponseType();
    }

    public function getName()
    {
        return 'registerUser';
    }
}