<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
use App\Support\CarImageCatalog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@pothik.com'],
            [
                'name' => 'Khandokar Radowan',
                'phone' => '01712345678',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'customer@pothik.com'],
            [
                'name' => 'Farhan Ahmed',
                'phone' => '01812345678',
                'password' => Hash::make('customer123'),
                'role' => 'customer',
            ]
        );

        $cars = $this->getCarsData();
        foreach ($cars as $car) {
            Car::updateOrCreate(
                ['brand' => $car['brand'], 'model' => $car['model'], 'location' => $car['location']],
                $car
            );
        }
    }

    private function getCarsData(): array
    {
        $cities = [
            'Dhaka',
            'Chittagong',
            'Khulna',
            'Rajshahi',
            'Sylhet',
            'Barisal',
            'Rangpur',
            'Mymensingh',
        ];

        $cars = [
            ['Maruti Suzuki', 'Swift', 'Hatchback', 1200, 'Petrol', 'Manual', 5],
            ['Hyundai', 'i20', 'Hatchback', 1400, 'Petrol', 'Automatic', 5],
            ['Tata', 'Altroz', 'Hatchback', 1300, 'Diesel', 'Manual', 5],
            ['Honda', 'City', 'Sedan', 2200, 'Petrol', 'Automatic', 5],
            ['Hyundai', 'Verna', 'Sedan', 2100, 'Petrol', 'Automatic', 5],
            ['Maruti Suzuki', 'Ciaz', 'Sedan', 1800, 'Petrol', 'Manual', 5],
            ['Mahindra', 'Scorpio', 'SUV', 3500, 'Diesel', 'Manual', 7],
            ['Tata', 'Harrier', 'SUV', 4000, 'Diesel', 'Automatic', 5],
            ['Hyundai', 'Creta', 'SUV', 3200, 'Petrol', 'Automatic', 5],
            ['Mahindra', 'XUV700', 'SUV', 4500, 'Diesel', 'Automatic', 7],
            ['BMW', 'X1', 'Luxury', 8000, 'Petrol', 'Automatic', 5],
            ['Mercedes', 'C Class', 'Luxury', 9000, 'Petrol', 'Automatic', 5],
            ['Audi', 'A4', 'Luxury', 8500, 'Petrol', 'Automatic', 5],
            ['BMW', 'Z4', 'Sports', 12000, 'Petrol', 'Automatic', 2],
            ['Mini', 'Cooper', 'Sports', 7500, 'Petrol', 'Automatic', 4],
            ['Tata', 'Nexon EV', 'Electric', 2500, 'Electric', 'Automatic', 5],
            ['MG', 'ZS EV', 'Electric', 2800, 'Electric', 'Automatic', 5],
        ];

        $data = [];
        $i = 0;
        foreach ($cars as $car) {
            $data[] = [
                'brand' => $car[0],
                'model' => $car[1],
                'category' => $car[2],
                'location' => $cities[$i % count($cities)],
                'availability' => 'available',
                'fuel_type' => $car[4],
                'transmission' => $car[5],
                'seats' => $car[6],
                'price_per_day' => $car[3],
                'rating' => round(3.8 + (mt_rand(0, 12) / 10), 1),
                'image' => CarImageCatalog::pathFor($car[0], $car[1], 'jpg'),
                'description' => "Premium {$car[2]} available for rent across Bangladesh. Well maintained, insured, and ready for your journey.",
            ];
            $i++;
        }

        return $data;
    }
}
