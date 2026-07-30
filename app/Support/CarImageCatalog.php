<?php

namespace App\Support;

class CarImageCatalog
{
    /** @return array<string, array{0: string, 1: string, 2: string, 3: string}> */
    public static function models(): array
    {
        return [
            'maruti-suzuki-swift' => ['Maruti Suzuki', 'Swift', 'Hatchback', 'Hatchback'],
            'hyundai-i20' => ['Hyundai', 'i20', 'Hatchback', 'Hatchback'],
            'tata-altroz' => ['Tata', 'Altroz', 'Hatchback', 'Hatchback'],
            'honda-city' => ['Honda', 'City', 'Sedan', 'Sedan'],
            'hyundai-verna' => ['Hyundai', 'Verna', 'Sedan', 'Sedan'],
            'maruti-suzuki-ciaz' => ['Maruti Suzuki', 'Ciaz', 'Sedan', 'Sedan'],
            'mahindra-scorpio' => ['Mahindra', 'Scorpio', 'SUV', 'SUV'],
            'tata-harrier' => ['Tata', 'Harrier', 'SUV', 'SUV'],
            'hyundai-creta' => ['Hyundai', 'Creta', 'SUV', 'SUV'],
            'mahindra-xuv700' => ['Mahindra', 'XUV700', 'SUV', 'SUV'],
            'bmw-x1' => ['BMW', 'X1', 'Luxury', 'Luxury'],
            'mercedes-c-class' => ['Mercedes', 'C Class', 'Luxury', 'Luxury'],
            'audi-a4' => ['Audi', 'A4', 'Luxury', 'Luxury'],
            'bmw-z4' => ['BMW', 'Z4', 'Sports', 'Sports'],
            'mini-cooper' => ['Mini', 'Cooper', 'Sports', 'Sports'],
            'tata-nexon-ev' => ['Tata', 'Nexon EV', 'Electric', 'Electric'],
            'mg-zs-ev' => ['MG', 'ZS EV', 'Electric', 'Electric'],
        ];
    }

    /**
     * Wikimedia Commons filenames (real car photos, CC-licensed).
     *
     * @return array<string, string>
     */
    public static function wikimediaFiles(): array
    {
        return [
            'maruti-suzuki-swift' => "Suzuki Swift '24 (5).jpg",
            'hyundai-i20' => '2021 Hyundai i20 N Line (BI3; India) front view.png',
            'tata-altroz' => 'Tata Altroz Cinematic Photos (1).jpg',
            'honda-city' => '2022 Honda City ZX i-VTEC (India) front view.jpg',
            'hyundai-verna' => '2020 Hyundai Verna SX(O) 1.5 Diesel front view (India).png',
            'maruti-suzuki-ciaz' => '2021 Maruti Suzuki Ciaz Alpha Smart Hybrid.jpg',
            'mahindra-scorpio' => '2022 Mahindra Scorpio N Z4 (India) front view.png',
            'tata-harrier' => '2019 Tata Harrier XZ (India) front view.jpg',
            'hyundai-creta' => 'Hyundai Creta India.jpg',
            'mahindra-xuv700' => '2021 Mahindra XUV700 2.2 AX7 (India) front view.png',
            'bmw-x1' => '2018 BMW X1 sDrive18i xLine 1.5 Front.jpg',
            'mercedes-c-class' => 'Mercedes-Benz W206 220d (C220d) AMG Line front.jpg',
            'audi-a4' => '2016 Audi A4 B9 2.0 TDI quattro S line front.jpg',
            'bmw-z4' => 'BMW G29 Z4 M40i (Facelift) 1X7A6946.jpg',
            'mini-cooper' => 'BMW MINI COOPER S 3DOOR (F56) front.jpg',
            'tata-nexon-ev' => '2020 Tata Nexon EV (India) front view.png',
            'mg-zs-ev' => '2022 MG ZS EV (India) front view.png',
        ];
    }

    /** @return array<string, string> */
    public static function searchQueries(): array
    {
        return [
            'mahindra-scorpio' => 'Mahindra Scorpio N 2022 India front car',
            'tata-harrier' => 'Tata Harrier 2019 India front car',
            'mercedes-c-class' => 'Mercedes-Benz C-Class W206 front car',
            'audi-a4' => 'Audi A4 B9 sedan front car',
            'mg-zs-ev' => 'MG ZS EV India front car',
        ];
    }

    public static function slug(string $brand, string $model): string
    {
        return strtolower(preg_replace('/[^a-z0-9]+/', '-', trim($brand.'-'.$model)));
    }

    public static function pathFor(string $brand, string $model, string $ext = 'jpg'): string
    {
        return '/images/cars/models/'.self::slug($brand, $model).'.'.$ext;
    }

    public static function localPath(string $slug, string $ext = 'jpg'): string
    {
        return public_path("images/cars/models/{$slug}.{$ext}");
    }
}
