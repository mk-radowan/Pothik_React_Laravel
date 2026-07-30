<?php

namespace App\Providers;

use App\Models\Car;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Paginator::useBootstrapFive();

        if ($this->app->environment('local', 'testing') && Schema::hasTable('cars')) {
            $carCount = Car::count();

            if ($carCount === 0) {
                Artisan::call('db:seed', ['--class' => DatabaseSeeder::class]);
            }
        }
    }
}
