<?php

namespace App\Controller;

use App\GraphQL\Schema;
use App\Helpers\CheckTokenUserHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Youshido\GraphQL\Execution\Processor;

class GraphqlController extends AbstractController
{
    #[Route('/graphql', name: 'app_graphql')]
    public function index(
        Request $request, EntityManagerInterface $em,
        SerializerInterface $serializer
    )
    {
        $token = $request->headers->get('Authorization');

        $processor = new Processor(new Schema([
            'entityManager' => $em,
            'serializer' => $serializer,
            "token" => $token
        ]));

        $body = json_decode($request->getContent(), true);

        $processor->processPayload($body['query'], isset($body['variables']) ? $body['variables'] : []);

        return new JsonResponse($processor->getResponseData());
    }
}