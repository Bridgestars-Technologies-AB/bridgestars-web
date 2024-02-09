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
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();
            $table->string('cards', 100);

            // den som delar ut kort och lägger första budet
            $table->enum('dealer', ['N', 'E', 'S', 'W']);
            $table->enum('vul', ['None', 'NS', 'EW', 'Both'])->default('None');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
