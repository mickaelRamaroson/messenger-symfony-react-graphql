<?php

namespace App\GraphQL\Mutation\Thread;

use App\Entity\Message;
use App\Helpers\CheckTokenUserHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\BooleanType;
use Youshido\GraphQL\Type\Scalar\IdType;

class SetReadMessagesField extends AbstractField
{
  private EntityManagerInterface $entityManager;

  private MessageBusInterface $bus;
  private ?string $token;

  public function build(FieldConfig $config)
  {
    $this->entityManager = $config->getData()['entityManager'];
    $this->token = $config->getData()['token'];
    $this->bus = $config->getData()['bus'];

    $config->addArguments([
      'messageIds' => new ListType(new IdType()),
    ]);
  }

  public function resolve($value, array $args, ResolveInfo $info)
  {
    CheckTokenUserHelper::checkAuthorization($this->token, $this->entityManager);
    try {
      foreach ($args['messageIds'] as $id) {
        $message = $this->entityManager->getRepository(Message::class)->find((int) $id);
        if ($message) {
          $message->setIsRead(true);
          $message->setReadAt(new \DateTime());
          $this->entityManager->persist($message);
          $this->entityManager->flush();

          $update = new Update("http://monsite.com/message/{$message->getId()}", "[]");
          $this->bus->dispatch($update);
        }
      }
    } catch (\Exception $e) {
      throw new \Exception($e->getMessage());
    }

    return true;
  }

  /**
   * @return AbstractObjectType|AbstractType
   */
  public function getType()
  {
    return new BooleanType();
  }

  public function getName()
  {
    return 'setReadMessages';
  }
}