<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bd_location_master', function (Blueprint $table) {
            $table->id();
            $table->string('division', 100);
            $table->string('district', 100)->nullable();
            $table->string('upazila', 100)->nullable();
            $table->string('pourosova', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('ward', 50)->nullable();
            $table->timestamps();

            $table->index(['division', 'district', 'upazila']);
        });

        $fallbackDivisions = [
            'Dhaka',
            'Barisal',
            'Chattogram',
            'Khulna',
            'Mymensingh',
            'Rajshahi',
            'Rangpur',
            'Sylhet',
        ];

        try {
            $response = Http::timeout(20)->get('https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json');

            if ($response->successful()) {
                $rows = [];
                foreach ($response->json() as $divisionData) {
                    $divisionName = $divisionData['name'] ?? null;
                    if (!$divisionName) {
                        continue;
                    }

                    $districts = $divisionData['districts'] ?? [];
                    if (empty($districts)) {
                        $rows[] = [
                            'division' => $divisionName,
                            'district' => null,
                            'upazila' => null,
                            'pourosova' => null,
                            'city' => null,
                            'ward' => null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                        continue;
                    }

                    foreach ($districts as $districtData) {
                        $districtName = $districtData['name'] ?? null;
                        $upazilas = $districtData['upazilas'] ?? [];

                        if (empty($upazilas)) {
                            $rows[] = [
                                'division' => $divisionName,
                                'district' => $districtName,
                                'upazila' => null,
                                'pourosova' => null,
                                'city' => null,
                                'ward' => null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                            continue;
                        }

                        foreach ($upazilas as $upazilaData) {
                            $rows[] = [
                                'division' => $divisionName,
                                'district' => $districtName,
                                'upazila' => $upazilaData['name'] ?? null,
                                'pourosova' => null,
                                'city' => null,
                                'ward' => null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                }

                if (!empty($rows)) {
                    DB::table('bd_location_master')->insert($rows);
                    return;
                }
            }
        } catch (\Throwable $e) {
            // Fallback data insert below
        }

        $fallbackRows = array_map(function ($division) {
            return [
                'division' => $division,
                'district' => null,
                'upazila' => null,
                'pourosova' => null,
                'city' => null,
                'ward' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $fallbackDivisions);

        DB::table('bd_location_master')->insert($fallbackRows);
    }

    public function down(): void
    {
        Schema::dropIfExists('bd_location_master');
    }
};
