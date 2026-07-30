<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('brand', 100);
            $table->string('model', 100);
            $table->string('category');
            $table->string('location');
            $table->string('availability')->default('available');
            $table->string('fuel_type');
            $table->string('transmission');
            $table->unsignedTinyInteger('seats');
            $table->unsignedInteger('price_per_day');
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('image', 500)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique(['brand', 'model', 'location']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
