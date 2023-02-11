<?php

namespace App\Controller;

use App\GraphQL\Schema;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Youshido\GraphQL\Execution\Processor;

class GraphqlController extends AbstractController
{
    #[Route('/graphql', name: 'app_graphql')]
    public function index(Request $request)
    {
        $processor = new Processor(new Schema());

        $body = json_decode($request->getContent(), true);

        $processor->processPayload($body['query'], isset($body['variables']) ? $body['variables'] : []);

        return new JsonResponse($processor->getResponseData());
    }
}
