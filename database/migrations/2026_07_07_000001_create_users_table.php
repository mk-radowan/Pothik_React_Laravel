<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('phone', 15)->nullable();
                $table->string('password');
                $table->string('role')->default('customer');
                $table->rememberToken();
                $table->timestamps();
            });

            return;
        }

        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 15)->nullable()->after('email');
            }

            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('customer')->after('password');
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
