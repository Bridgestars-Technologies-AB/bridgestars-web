<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();
            $table->foreignId('chapter_id')->index()->constrained();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
