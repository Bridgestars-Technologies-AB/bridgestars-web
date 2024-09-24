<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bidding_problems', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->foreignId('chapter_id')->index()->constrained();
            $table->foreignId('deal_id')->index();

            $table->enum('player', ['N', 'E', 'S', 'W']);
            $table->unsignedInteger('hands_visible');
            $table->string('presentation', 255);
            $table->string('solution', 500);
            $table->boolean('published')->default(false);
            $table->integer('bridgetobridge_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bidding_problems');
    }
};
