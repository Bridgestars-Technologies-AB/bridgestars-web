<?php

use App\Enums\Bid;
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
        Schema::create('biddings', function (Blueprint $table) {
            $table->id();
            $table->publicId();
            $table->nonNullableTimestamps();

            $table->foreignId('deal_id');
            $table->unsignedTinyInteger('bidding_nbr');
            $table->enum('bid', Bid::all());
            $table->string('explanation', 255)->nullable();
            $table->boolean('suboptimal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biddings');
    }
};
