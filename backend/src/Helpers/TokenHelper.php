<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\ExpiredException;

class TokenHelper
{
    private static $passphrase = '1234567890';
    public static function checkToken(string $token): array
    {
        $privateKeyFile = __DIR__ . '/keypair';

        $privateKey = openssl_pkey_get_private(
            file_get_contents($privateKeyFile),
            self::$passphrase
        );

        $publicKey = openssl_pkey_get_details($privateKey)['key'];

        try {
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
        } catch (ExpiredException $e) {
            throw $e;
        } catch (SignatureInvalidException $e) {
            throw $e;
        }

        return (array) $decoded;
    }

    public static function createToken(array $playload): string
    {

        $privateKeyFile = __DIR__ . '/keypair';

        $privateKey = openssl_pkey_get_private(
            file_get_contents($privateKeyFile),
            self::$passphrase
        );

        $_payload = [
            ...$playload,
            'iss' => 'example.org',
            'aud' => 'example.com',
            'iat' => 1356999524,
            'nbf' => 1357000000,
            'exp' => time() + 60 * 60 * 24 * 60
        ];

        $jwt = JWT::encode($_payload, $privateKey, 'RS256');

        return $jwt;
    }
}