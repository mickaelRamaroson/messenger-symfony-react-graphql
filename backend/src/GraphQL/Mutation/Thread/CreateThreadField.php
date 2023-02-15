<?php

namespace App\GraphQL\Mutation\User;


use App\Entity\Thread;
use App\Entity\User;
use App\GraphQL\Type\ThreadType;
use App\Helpers\CheckTokenUserHelper;
use App\Helpers\TokenHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\IdType;

class CreateThreadField extends AbstractField
{
  private EntityManagerInterface $entityManager;

  private SerializerInterface $serializer;
  private ?string $token;

  public function build(FieldConfig $config)
  {
    $this->entityManager = $config->getData()['entityManager'];
    $this->serializer = $config->getData()['serializer'];
    $this->token = $config->getData()['token'];

    $config->addArguments([
      'idFrom' => new NonNullType(new IdType()),
      'idTo' => new NonNullType(new IdType()),
    ]);
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    CheckTokenUserHelper::checkAuthorization($this->token, $this->entityManager);
    $userRepo = $this->entityManager->getRepository(User::class);
    $thread = new Thread();
    $thread->addParticipant($userRepo->find((int) $args['idFrom']));
    $thread->addParticipant($userRepo->find((int) $args['idTo']));

    $this->entityManager->persist($thread);
    $this->entityManager->flush();

    $serializedThred = $this->serializer->serialize($thread, 'json', ["groups" => ["participant", "create"]]);

    $theadArray = json_decode($serializedThred, true);

    return [
      'id' => $thread->getId(),
      'participants' => $theadArray['participants']
    ];
  }

  /**
   * @return AbstractObjectType|AbstractType
   */
  public function getType()
  {
    return new ThreadType();
  }

  public function getName()
  {
    return 'createThread';
  }
}