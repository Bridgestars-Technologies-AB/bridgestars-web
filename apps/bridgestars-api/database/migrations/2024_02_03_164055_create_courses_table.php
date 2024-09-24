<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->string('name', 100);
            $table->string('description', 200);
            $table->unsignedInteger('course_nbr');
            $table->string('color', 11); //255,255,255
            $table->boolean('published');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
