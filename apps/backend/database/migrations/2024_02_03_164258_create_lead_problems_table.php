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
        Schema::create('lead_problems', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->foreignId('chapter_id');
            $table->foreignId('deal_id');

            $table->unsignedInteger('hands_visible');
            $table->string('presentation', 255);
            $table->string('solution', 500);

            $table->string('correct_lead', 10);


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_problems');
    }
};
