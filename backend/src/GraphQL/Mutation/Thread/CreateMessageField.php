<?php

namespace App\GraphQL\Mutation\Thread;

use App\Entity\Message;
use App\Entity\Thread;
use App\Entity\User;
use App\GraphQL\Type\MessageType;
use App\Helpers\CheckTokenUserHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\IdType;
use Youshido\GraphQL\Type\Scalar\StringType;

class CreateMessageField extends AbstractField
{
  private EntityManagerInterface $entityManager;

  private SerializerInterface $serializer;
  private ?string $token;

  public function build(FieldConfig $config)
  {
    $this->entityManager = $config->getData()['entityManager'];
    $this->token = $config->getData()['token'];
    $this->serializer = $config->getData()['serializer'];

    $config->addArguments([
      'threadId' => new NonNullType(new IdType()),
      'fromId' => new NonNullType(new IdType()),
      'content' => new NonNullType(new StringType())
    ]);
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    CheckTokenUserHelper::checkAuthorization($this->token, $this->entityManager);
    $message = new Message();
    $message->setContent($args['content']);
    $message->setCreatedAt(new \DateTime());
    $message->setUser($this->entityManager->getRepository(User::class)->find((int) $args['fromId']));
    $message->setThread($this->entityManager->getRepository(Thread::class)->find((int) $args['threadId']));

    $this->entityManager->persist($message);
    $this->entityManager->flush();

    return json_decode($this->serializer->serialize($message, 'json', ["groups" => ["message", "participant"]]), true);
  }

  /**
   * @return AbstractObjectType|AbstractType
   */
  public function getType()
  {
    return new MessageType();
  }

  public function getName()
  {
    return 'createMessage';
  }
}