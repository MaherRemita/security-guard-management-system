<?php

use App\Models\GuardGroup;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('time_slots', function (Blueprint $table) {
            // here assuming that the time slots is always everyday between start and end date

            $table->id();
            $table->foreignIdFor(GuardGroup::class)->constrained()->onDelete('cascade');
            // start & end date 
            $table->date('start_date');
            $table->date('end_date');
            // start & end time
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_slots');
    }
};
