<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleAdminInertiaRequests;
use App\Http\Middleware\HandlePublicInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'payments/sslcommerz/success/*',
            'payments/sslcommerz/fail/*',
            'payments/sslcommerz/cancel/*',
            'payments/bkash/callback/*',
        ]);

        $middleware->redirectGuestsTo('/login');
        $middleware->alias([
            'admin' => AdminMiddleware::class,
            'inertia.admin' => HandleAdminInertiaRequests::class,
            'inertia.public' => HandlePublicInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
