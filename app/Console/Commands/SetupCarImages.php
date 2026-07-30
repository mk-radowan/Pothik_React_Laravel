<?php

namespace App\Console\Commands;

use App\Models\Car;
use App\Support\CarImageCatalog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class SetupCarImages extends Command
{
    protected $signature = 'cars:setup-images {--force : Re-download even if file exists}';

    protected $description = 'Download real car photos from Wikimedia Commons and update the database (~30 seconds)';

    public function handle(): int
    {
        $dir = public_path('images/cars/models');
        File::ensureDirectoryExists($dir);

        $files = CarImageCatalog::wikimediaFiles();
        $titles = implode('|', array_map(fn ($f) => 'File:'.$f, array_values($files)));

        $this->info('Fetching image URLs from Wikimedia Commons...');

        $response = Http::withHeaders([
            'User-Agent' => 'PothikCarRental/1.0 (Laravel academic project; local dev)',
        ])->timeout(60)->get('https://commons.wikimedia.org/w/api.php', [
            'action' => 'query',
            'titles' => $titles,
            'prop' => 'imageinfo',
            'iiprop' => 'url',
            'iiurlwidth' => 800,
            'format' => 'json',
        ]);

        if (!$response->successful()) {
            $this->error('Could not reach Wikimedia API. Check your internet connection.');

            return self::FAILURE;
        }

        $pages = $response->json('query.pages', []);
        $urlBySlug = [];

        foreach ($pages as $page) {
            if (empty($page['title']) || str_contains($page['title'] ?? '', 'missing')) {
                continue;
            }

            $url = $page['imageinfo'][0]['thumburl']
                ?? $page['imageinfo'][0]['url']
                ?? null;

            if (!$url) {
                continue;
            }

            $normalized = self::normalizeWikiTitle($page['title']);
            foreach ($files as $slug => $filename) {
                if (self::normalizeWikiTitle('File:'.$filename) === $normalized) {
                    $urlBySlug[$slug] = $url;
                    break;
                }
            }
        }

        $this->info('Downloading real car photos...');
        $bar = $this->output->createProgressBar(count($files));
        $downloaded = 0;

        foreach ($files as $slug => $filename) {
            $url = $urlBySlug[$slug] ?? null;

            $ext = str_ends_with(strtolower($filename), '.png') ? 'png' : 'jpg';
            $localFile = CarImageCatalog::localPath($slug, $ext);

            if (!$url && isset(CarImageCatalog::searchQueries()[$slug])) {
                $url = $this->searchWikimediaImage(CarImageCatalog::searchQueries()[$slug]);
            }

            if ($url && ($this->option('force') || !File::exists($localFile))) {
                $bytes = $this->downloadImage($url);
                if ($bytes !== null) {
                    File::put($localFile, $bytes);
                    $downloaded++;
                } else {
                    $this->warn("Failed download: {$slug}");
                }
            } elseif (File::exists($localFile)) {
                $downloaded++;
            } else {
                $this->warn("No image found for: {$filename}");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Downloaded/verified {$downloaded} images.");
        $this->info('Updating database...');

        $updated = 0;
        foreach (Car::all() as $car) {
            if (empty($car->brand) || empty($car->model)) {
                continue;
            }

            $slug = CarImageCatalog::slug($car->brand, $car->model);
            $jpg = CarImageCatalog::localPath($slug, 'jpg');
            $png = CarImageCatalog::localPath($slug, 'png');

            if (File::exists($jpg)) {
                $car->image = CarImageCatalog::pathFor($car->brand, $car->model, 'jpg');
            } elseif (File::exists($png)) {
                $car->image = CarImageCatalog::pathFor($car->brand, $car->model, 'png');
            } else {
                $car->image = '/images/cars/'.strtolower($car->category).'.svg';
            }

            $car->save();
            $updated++;
        }

        $this->info("Done! {$updated} cars updated with real photos.");
        $this->line('Refresh your browser (Ctrl+F5).');

        return self::SUCCESS;
    }

    private static function normalizeWikiTitle(string $title): string
    {
        return strtolower(str_replace('_', ' ', $title));
    }

    private function searchWikimediaImage(string $query): ?string
    {
        $response = Http::withHeaders([
            'User-Agent' => 'PothikCarRental/1.0 (Laravel academic project)',
        ])->timeout(30)->get('https://commons.wikimedia.org/w/api.php', [
            'action' => 'query',
            'generator' => 'search',
            'gsrsearch' => $query,
            'gsrnamespace' => 6,
            'gsrlimit' => 3,
            'prop' => 'imageinfo',
            'iiprop' => 'url',
            'iiurlwidth' => 800,
            'format' => 'json',
        ]);

        if (!$response->successful()) {
            return null;
        }

        foreach ($response->json('query.pages', []) as $page) {
            $mime = $page['imageinfo'][0]['mime'] ?? '';
            if (!str_starts_with($mime, 'image/')) {
                continue;
            }

            return $page['imageinfo'][0]['thumburl']
                ?? $page['imageinfo'][0]['url']
                ?? null;
        }

        return null;
    }

    private function downloadImage(string $url): ?string
    {
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => "User-Agent: PothikCarRental/1.0 (Laravel academic project)\r\n",
                'timeout' => 90,
                'follow_location' => 1,
            ],
            'ssl' => [
                'verify_peer' => true,
                'verify_peer_name' => true,
            ],
        ]);

        $data = @file_get_contents($url, false, $context);

        return $data !== false ? $data : null;
    }
}
