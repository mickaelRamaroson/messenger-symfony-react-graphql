<?php

use App\Kernel;

require_once dirname(__DIR__) . '/vendor/autoload_runtime.php';

return function (array $context) {
    error_reporting(E_ALL ^ E_DEPRECATED);
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
