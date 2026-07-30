<?php

namespace App\Console\Commands;

use App\Models\Car;
use App\Support\CarImageCatalog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SyncCarImages extends Command
{
    protected $signature = 'cars:sync-images';

    protected $description = 'Point all cars to downloaded photos in public/images/cars/models';

    public function handle(): int
    {
        $updated = 0;

        foreach (Car::all() as $car) {
            if (empty($car->brand) || empty($car->model)) {
                continue;
            }

            $slug = CarImageCatalog::slug($car->brand, $car->model);

            foreach (['jpg', 'png', 'webp'] as $ext) {
                if (File::exists(CarImageCatalog::localPath($slug, $ext))) {
                    $car->image = CarImageCatalog::pathFor($car->brand, $car->model, $ext);
                    $car->save();
                    $updated++;
                    break;
                }
            }
        }

        $this->info("Synced {$updated} cars to local photo files.");

        return self::SUCCESS;
    }
}
