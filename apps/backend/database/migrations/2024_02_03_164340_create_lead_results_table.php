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
        Schema::create('lead_results', function (Blueprint $table) {
            $table->publicId();
            $table->nonNullableTimestamps();
            $table->foreignId('lead_problem_id');
            $table->foreignId('user_id');
            $table->string('cards', 100);
            $table->unsignedInteger('errors');
            $table->foreignId('challenge_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_results');
    }
};
