<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->string('username', 25)->unique();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken()->unique();
            $table->nonNullableTimestamps();
            $table->boolean('migrated')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
