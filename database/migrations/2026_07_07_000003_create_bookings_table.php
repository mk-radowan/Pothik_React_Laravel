<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->string('pickup_date');
            $table->string('return_date');
            $table->unsignedInteger('rental_days')->default(1);
            $table->string('total_amount');
            $table->string('status')->default('pending');
            $table->string('customer_name');
            $table->string('car_name');
            $table->timestamps();

            $table->index(['car_id', 'status']);
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
