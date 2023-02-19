<?php

namespace App\Controller;

use App\Entity\Thread;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class MercureController extends AbstractController
{
    #[Route('/publish-new-message/{user}/{thread}', name: 'publish_new_message', methods: ["POST"])]
    public function publishNewMessage(MessageBusInterface $bus, User $user, Thread $thread): Response
    {
        $update = new Update("http://monsite.com/{$user->getId()}/{$thread->getId()}", "[]");
        $bus->dispatch($update);
        return new Response('new message', 200);
    }

    #[Route('/publish-new-thread/{user}', name: 'publish_thread', methods: ["POST"])]
    public function publishThread(MessageBusInterface $bus, User $user): Response
    {
        $update = new Update("http://monsite.com/{$user->getId()}", "[]");
        $bus->dispatch($update);
        return new Response('new thread', 200);
    }
}