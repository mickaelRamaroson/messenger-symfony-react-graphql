<?php

namespace App\GraphQL\Query\Thread;

use App\Entity\Thread;
use App\GraphQL\Type\MessageType;
use App\GraphQL\Type\ThreadType;
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

class GetLastMessageThreadField extends AbstractField
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

  public function build(FieldConfig $config)
  {
    $config->addArguments([
      'threadId' => new NonNullType(new IdType()),
    ]);
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    CheckTokenUserHelper::checkAuthorization($this->token, $this->entityManager);
    $thread = $this->entityManager->getRepository(Thread::class)->find((int) $args['threadId']);
    $data = json_decode($this->serializer->serialize($thread->getMessages()->last(), 'json', ["groups" => ["message", "participant"]]), true);
    return $data;
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
    return 'lastMessageThread';
  }
}