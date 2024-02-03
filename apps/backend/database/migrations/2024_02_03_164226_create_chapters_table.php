<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->string('name', 100);
            $table->unsignedInteger('chapter_nbr');
            $table->boolean('paid');

            $table->foreignId('course_id');
            $table->boolean('published')->default(false);
            $table->boolean('randomize')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
