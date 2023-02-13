<?php

namespace App\Helpers;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class CheckTokenUserHelper
{
    public static function checkAuthorization(string $token, EntityManagerInterface $em)
    {
        $userArray = TokenHelper::checkToken($token);
        $user = $em->getRepository(User::class)->findBy(["id" => $userArray['id']]);
        if (!$user) {
            throw new AuthenticationException('Authentication error', 401);
        }
    }
}