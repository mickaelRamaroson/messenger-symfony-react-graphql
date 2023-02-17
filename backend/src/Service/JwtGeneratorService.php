<?php

namespace App\Service;

use Firebase\JWT\JWT;

class JwtGeneratorService
{

  private string $secret;
  public function __construct(string $secret)
  {
    $this->secret = $secret;
  }

  public function __invoke()
  {
    $payload = [
      "mercure" => [
        "publish" => ['*']
      ]
    ];
    return JWT::encode($payload, $this->secret, 'HS256');
  }
}