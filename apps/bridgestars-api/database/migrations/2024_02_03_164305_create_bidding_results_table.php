<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bidding_results', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->foreignId('bidding_problem_id')->index()->constrained();
            $table->foreignId('user_id')->index()->constrained();
            $table->foreignId('challenge_id')->nullable();
            // $table->string('bidding', 200);
            $table->unsignedInteger('errors')->default(0);
            $table->unsignedInteger('progress')->default(0);
            $table->boolean('completed')->default(false);
            $table->boolean('surrendered')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bidding_results');
    }
};
